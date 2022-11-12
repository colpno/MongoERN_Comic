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

  if (!token) return res.status(401).json('Not logged in');

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, async (error, userInfo) => {
    if (error) return res.status(403).json('Invalid token');

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
            return res.json(error);
          }
        }
      ));
    console.log('Uploaded new cover to cloud');

    await cloudinary.uploader.destroy(oldCover).catch((error) => {
      console.log(error);
      return res.json(error);
    });
    console.log('Deleted old cover in cloud');

    let sql = `
      UPDATE \`${table}\`
      SET 
      ${valueKeys.map((key, index) => `\`${key}\` = ?${index !== valueKeys.length ? '' : ','}`)}${
      response?.public_id ? ',`cover` = ?,`publicId` = ?,' : ''
    }\`updatedAt\` = ?
      WHERE guid = ?
    `;
    sql.replace(/,,/g, ',');

    const now = getCurrentDateTime();
    const values = [...valueKeys.map((dataKey) => others[dataKey])];
    response?.secure_url && values.push(response.secure_url, response.public_id);
    values.push(now, guid);

    if (userInfo.role === 'admin') {
      db.query(sql, [...values], (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows > 0) {
          console.log('Title has been updated');
          console.log('------------------------------------------------------');
          return res.json(data);
        }
        return res.json('Something went wrong');
      });
    } else {
      sql += ' AND userId = ?';

      values.push(userInfo.guid);

      db.query(sql, [...values], (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows > 0) {
          console.log('Title has been updated');
          console.log('------------------------------------------------------');
          return res.json(data);
        }
        return res.json('You can only update your item');
      });
    }
  });
}
