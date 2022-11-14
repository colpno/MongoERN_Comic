import { table } from './index.js';
import { db } from '../../database/connect.js';
import jwt from 'jsonwebtoken';
import { cloudinary } from '../../libs/cloudinary/index.js';
import { config } from 'dotenv';
import getCurrentDateTime from '../common/getCurrentDateTime.js';

config();

export default function updateTitle(req, res) {
  const { params, body } = req;
  const { guid } = params;
  const { oldCover, newValues } = body;
  const { cover, ...others } = newValues;

  const valueKeys = Object.keys(others);
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ error: 'Cần đăng nhập để sử dụng chức năng này' });

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, userInfo) => {
    if (error) return res.status(403).json({ error: 'Token không hợp lệ' });

    const sql = `SELECT userId FROM \`${table}\` WHERE guid = ?`;

    db.query(sql, [guid], async (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.length) {
        if (userInfo.role === 'admin' || data[0].userId === userInfo.guid) {
          console.log('------------------------------------------------------');
          const response =
            cover &&
            (await cloudinary.uploader.upload(
              cover,
              {
                upload_preset: process.env.CLOUDINARY_TITLE_UPLOAD_PRESET,
              },
              (error) => {
                if (error) {
                  console.log(error);
                  return res.status(500).json(error);
                }
              }
            ));
          console.log('Uploaded new cover to cloud');

          oldCover &&
            (await cloudinary.uploader.destroy(oldCover).catch((error) => {
              console.log(error);
              return res.status(500).json(error);
            }));
          console.log('Deleted old cover in cloud');

          const setStatements = [];
          valueKeys.length > 0 && setStatements.push(valueKeys.map((key) => `\`${key}\` = ?`));
          response?.public_id && setStatements.push('`cover` = ?,`publicId` = ?');
          setStatements.push('`updatedAt` = ?');

          let sql = `
      UPDATE \`${table}\`
      SET ${setStatements.toString()}
      WHERE guid = ?
    `;
          sql.replace(/,,/g, ',');

          const now = getCurrentDateTime();
          const values = [...valueKeys.map((dataKey) => others[dataKey])];
          response?.secure_url && values.push(response.secure_url, response.public_id);
          values.push(now, guid);

          if (userInfo.role === 'admin') {
            db.query(sql, [...values], (err, data) => {
              if (err) return res.status(500).json(err);
              if (data.affectedRows > 0) {
                console.log('Title has been updated');
                console.log('------------------------------------------------------');
                return res.status(200).json(data);
              }
              return res.status(400).json({ error: data });
            });
          } else {
            sql += ' AND userId = ?';

            values.push(userInfo.guid);

            db.query(sql, [...values], (err, data) => {
              if (err) return res.status(500).json(err);
              if (data.affectedRows > 0) {
                console.log('Title has been updated');
                console.log('------------------------------------------------------');
                return res.status(200).json(data);
              }
              return res.status(400).json({ error: data });
            });
          }
        } else {
          return res.status(403).json({ error: 'Token không hợp lệ' });
        }
      } else {
        return res.status(400).json({ error: data });
      }
    });
  });
}
