import { db } from '../../config/database.js';
import { table } from './index.js';
import jwt from 'jsonwebtoken';
import { getCurrentDateTime } from '../common/index.js';
import { v4 as uuidv4 } from 'uuid';
import { cloudinary } from '../../libs/cloudinary/index.js';
import { config } from 'dotenv';

config();

export default function addTitle(req, res) {
  const { body } = req;
  const { genreId, cover, ...values } = body;
  const sql = `SELECT * FROM ${table} WHERE name = ?`;

  db.query(sql, [values.name], (error, data) => {
    if (error) return res.status(500).json(error);
    if (data.length) return res.status(409).json({ error: 'Tên truyện đã tồn tại' });

    const bodyKeys = Object.keys(values);
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json({ error: 'Cần đăng nhập để sử dụng chức năng này' });

    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, async (error, userInfo) => {
      if (error) return res.status(403).json({ error: 'Token không hợp lệ' });

      console.log('------------------------------------------------------');
      const titleGuid = uuidv4();

      const response = await cloudinary.uploader.upload(
        cover,
        {
          upload_preset: process.env.CLOUDINARY_TITLE_UPLOAD_PRESET,
          folder: `comic/titles/${titleGuid}/cover`,
        },
        (error) => {
          if (error) return res.status(500).json(error);
          console.log('Cover has been uploaded to cloud');
        }
      );

      // Insert into table 'title'
      const sql = `
        INSERT INTO \`${table}\`
        (${bodyKeys.map(
          (key) => `\`${key}\``
        )},\`cover\`,\`guid\`,\`userId\`,\`createdAt\`,\`updatedAt\`,\`publicId\`)
        VALUES (?)
      `;

      const now = getCurrentDateTime();
      const titleValues = [
        ...bodyKeys.map((dataKey) => values[dataKey]),
        response.secure_url,
        titleGuid,
        userInfo.guid,
        now,
        now,
        response.public_id,
      ];

      db.query(sql, [titleValues], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) {
          console.log("Title's info has been insert into database");

          // Insert into table 'title_genre'
          const sqla = `
            INSERT INTO \`${table}_genre\`
            (\`titleId\`,\`genreId\`,\`guid\`,\`createdAt\`,\`updatedAt\`)
            VALUES ?;
          `;
          const titleGenreValues = genreId.map((id) => [titleGuid, id, uuidv4(), now, now]);
          db.query(sqla, [titleGenreValues], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) {
              console.log("Title's genres has been insert into database");
              console.log('------------------------------------------------------');
              return res.status(200).json(data);
            }
            return res.status(400).json({ error: data });
          });
        }
      });
    });
  });
}
