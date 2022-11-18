import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../config/database.js';
import { cloudinary } from '../../libs/cloudinary/index.js';
import { getCurrentDateTime } from '../common/index.js';
import { table } from './index.js';

config();

export default function addTitle(req, res) {
  const { body } = req;
  const { genreId, cover, ...values } = body;

  const checkExistSQL = `SELECT * FROM ${table} WHERE name = ?`;

  db.query(checkExistSQL, [values.name], (error, data) => {
    if (error) {
      console.log('file: addTitle.js ~ line 18 ~ error', error);
      return res.status(500).json(error);
    }
    if (data.length) return res.status(409).json({ error: 'Tên truyện đã tồn tại' });

    const bodyKeys = Object.keys(values);
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json({ error: 'Cần đăng nhập để sử dụng chức năng này' });

    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, async (error2, userInfo) => {
      if (error2) return res.status(403).json({ error: 'Token không hợp lệ' });

      console.log('------------------------------------------------------');
      const titleGuid = uuidv4();

      const response = await cloudinary.uploader.upload(
        cover,
        {
          upload_preset: process.env.CLOUDINARY_TITLE_UPLOAD_PRESET,
          folder: `comic/titles/${titleGuid}/cover`,
        },
        (error3) => {
          if (error3) return res.status(500).json(error3);
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

      db.query(sql, [titleValues], (error3, data2) => {
        if (error3) {
          console.log('file: addTitle.js ~ line 65 ~ error3', error3);
          return res.status(500).json(error3);
        }
        if (data2.affectedRows > 0) {
          console.log("Title's info has been insert into database");

          // Insert into table 'title_genre'
          const sqla = `
            INSERT INTO \`${table}_genre\`
            (\`titleId\`,\`genreId\`,\`guid\`,\`createdAt\`,\`updatedAt\`)
            VALUES ?;
          `;
          const titleGenreValues = genreId.map((id) => [titleGuid, id, uuidv4(), now, now]);
          db.query(sqla, [titleGenreValues], (error4, data3) => {
            if (error4) {
              console.log('file: addTitle.js ~ line 83 ~ error4', error4);
              return res.status(500).json(error4);
            }
            if (data3.affectedRows > 0) {
              console.log("Title's genres has been insert into database");
              console.log('******************************************************');
              return res.status(200).json(data3);
            }
            return res.status(400).json({ error: data3 });
          });
        }
      });
    });
  });
}
