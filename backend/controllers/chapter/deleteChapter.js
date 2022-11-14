import { table } from './index.js';
import jwt from 'jsonwebtoken';
import { db } from '../../database/connect.js';
import { cloudinary } from '../../libs/cloudinary/index.js';

export default function deleteChapter(req, res) {
  const { params, cookies, body } = req;
  const { guid } = params;
  const { titleId } = body.data;

  const token = cookies.accessToken;
  if (!token) return res.status(401).json({ error: 'Cần đăng nhập để sử dụng chức năng này' });

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, async (error, userInfo) => {
    if (error) return res.status(403).json({ error: 'Token không hợp lệ' });

    const sql = `SELECT t.userId FROM \`${table}\` as c JOIN title as t ON (t.guid = c.titleId) WHERE c.guid = ?`;

    db.query(sql, [guid], async (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.length && data[0].userId !== userInfo.guid) {
        return res.status(403).json({ error: 'Token không hợp lệ' });
      } else {
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
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) {
              console.log("Chapters's info has been deleted from database");
              console.log('------------------------------------------------------');
              return res.status(200).json(data);
            }
            return res.status(400).json({ error: data });
          });
        } else {
          const sql = `DELETE FROM ${table} WHERE guid = ?`;

          db.query(sql, [guid], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) {
              console.log("Chapters's info has been deleted from database");
              console.log('------------------------------------------------------');
              return res.status(200).json(data);
            }
            return res.status(400).json({ error: data });
          });
        }
      }
    });
  });
}
