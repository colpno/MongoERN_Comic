import { table } from './index.js';
import jwt from 'jsonwebtoken';
import { db } from '../../database/connect.js';
import { cloudinary } from '../../libs/cloudinary/index.js';

export default function deleteChapter(req, res) {
  const { params, cookies, body } = req;
  const { guid } = params;
  const { titleId } = body.data;

  const token = cookies.accessToken;

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, async (error, userInfo) => {
      if (error) return res.json('Invalid token');

      console.log('------------------------------------------------------');
      await cloudinary.api
        .delete_resources_by_prefix(`comic/titles/${titleId}/chapters/${guid}`)
        .then(async () => {
          await cloudinary.api
            .delete_folder(`comic/titles/${titleId}/chapters/${guid}/`)
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
            console.log("Chapters's info has been deleted from database");
            console.log('------------------------------------------------------');
            return res.json(data);
          }
          return res.json('Something went wrong');
        });
      } else {
        const sql = `DELETE FROM ${table} WHERE guid = ?`;

        db.query(sql, [guid], (err, data) => {
          if (err) return res.json(err);
          if (data.affectedRows > 0) {
            console.log("Chapters's info has been deleted from database");
            console.log('------------------------------------------------------');
            return res.json(data);
          }
          return res.json('Something went wrong');
        });
      }
    });
  } catch (error) {
    return res.json(error);
  }
}
