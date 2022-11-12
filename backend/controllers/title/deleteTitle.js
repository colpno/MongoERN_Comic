import { table } from './index.js';
import jwt from 'jsonwebtoken';
import { db } from '../../database/connect.js';
import { cloudinary } from '../../libs/cloudinary/index.js';
import { deleteChapter } from '../chapter/index.js';

export default function deleteTitle(req, res) {
  const { body, params, cookies } = req;
  const { guid } = params;
  const { publicId } = body.data;

  const token = cookies.accessToken;

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, async (error, userInfo) => {
    if (error) return res.json('Invalid token');

    console.log('------------------------------------------------------');
    await cloudinary.api
      .delete_resources_by_prefix(`comic/titles/${guid}`)
      .then(async () => {
        console.log('Cover has been deleted from cloud');
        await cloudinary.api
          .delete_folder(`comic/titles/${guid}/`)
          .then(() => {
            console.log('Images has been deleted from cloud');
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    if (userInfo.role === 'admin') {
      const sql = `DELETE FROM ${table} WHERE guid = ?`;

      db.query(sql, [guid], (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows > 0) {
          console.log('Title has been deleted from database');
          console.log('------------------------------------------------------');
          return res.json(data);
        }
        return res.json('Something went wrong');
      });
    } else {
      const sql = `DELETE FROM ${table} WHERE guid = ? AND userId = ?`;

      db.query(sql, [guid, userInfo.guid], (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows > 0) {
          console.log('Title has been deleted from database');
          console.log('------------------------------------------------------');
          return res.json(data);
        }
        return res.json('Something went wrong');
      });
    }
  });
}
