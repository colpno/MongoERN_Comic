import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../config/database.js';
import { cloudinary } from '../../libs/cloudinary/index.js';
import getCurrentDateTime from '../common/getCurrentDateTime.js';
import { table } from './index.js';

config();

export default function updateTitle(req, res) {
  const { params, body } = req;
  const { guid } = params;
  const { oldCover, newValues } = body;
  const { cover, genreId, ...others } = newValues;

  const valueKeys = Object.keys(others);
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ error: 'Cần đăng nhập để sử dụng chức năng này' });

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, userInfo) => {
    if (error) return res.status(403).json({ error: 'Token không hợp lệ' });

    const checkExistSQL = `SELECT userId FROM \`${table}\` WHERE guid = ?`;

    db.query(checkExistSQL, [guid], async (err, data) => {
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
              (error2) => {
                if (error2) {
                  console.log(error2);
                  return res.status(500).json(error2);
                }
                console.log('Uploaded new cover to cloud');
              }
            ));

          if (oldCover) {
            await cloudinary.uploader
              .destroy(oldCover)
              .then(() => {
                console.log('Deleted old cover in cloud');
              })
              .catch((error2) => {
                console.log(error2);
                return res.status(500).json(error2);
              });
          }

          if (genreId) {
            const deleteGenreSQL = `
              DELETE FROM title_genre
              WHERE titleId = ?
            `;

            db.query(deleteGenreSQL, guid, (error2, data2) => {
              if (error2) return res.status(500).json(error2);
              if (data2.affectedRows > 0) {
                const insertGenreSQL = `
                  INSERT INTO title_genre
                  (\`titleId\`, \`genreId\`, \`createdAt\`, \`updatedAt\`, \`guid\`)
                  VALUES ?
                `;

                const now = getCurrentDateTime();
                const values = genreId.map((id) => [guid, id, now, now, uuidv4()]);

                console.log('file: updateTitle.js ~ line 72 ~ insertGenreSQL', insertGenreSQL);
                console.log('file: updateTitle.js ~ line 82 ~ values', values);
                db.query(insertGenreSQL, [values], (error3) => {
                  if (error3) return res.status(500).json(error3);
                });
              }
            });
          }

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
            db.query(sql, [...values], (error3, result) => {
              if (error3) return res.status(500).json(error3);
              if (result.affectedRows > 0) {
                console.log('Title has been updated');
                console.log('******************************************************');
                return res.status(200).json(result);
              }
              return res.status(400).json({ error: result });
            });
          } else {
            sql += ' AND userId = ?';

            values.push(userInfo.guid);

            db.query(sql, [...values], (error3, result) => {
              if (error3) return res.status(500).json(error3);
              if (result.affectedRows > 0) {
                console.log('Title has been updated');
                console.log('******************************************************');
                return res.status(200).json(result);
              }
              return res.status(400).json({ error: result });
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
