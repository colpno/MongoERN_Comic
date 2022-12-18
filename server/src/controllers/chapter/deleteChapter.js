import jwt from 'jsonwebtoken';
import { table } from './index.js';
import { db } from '../../config/mysql.config.js';
import { cloudinary } from '../../config/cloudinary.config.js';

export default function deleteChapter(req, res) {
  const { params, cookies, body } = req;
  const { guid } = params;
  const { titleId } = body.data;

  const token = cookies.accessToken;
  if (!token) return res.status(401).json({ error: 'Cần đăng nhập để sử dụng chức năng này' });

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, async (jwtError, userInfo) => {
    if (jwtError) return res.status(403).json({ error: 'Token không hợp lệ' });

    const checkExistSQL = `SELECT t.userId FROM \`${table}\` as c JOIN title as t ON (t.guid = c.titleId) WHERE c.guid = ?`;

    db.query(checkExistSQL, [guid], async (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.length && data[0].userId !== userInfo.guid) {
        return res.status(403).json({ error: 'Token không hợp lệ' });
      }
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

        db.query(sql, [guid], (error2, data2) => {
          if (error2) return res.status(500).json(error2);
          if (data2.affectedRows > 0) {
            console.log("Chapters's info has been deleted from database");
            console.log('******************************************************');
            return res.status(200).json(data2);
          }
          return res.status(400).json({ error: data2 });
        });
      } else {
        const sql = `DELETE FROM ${table} WHERE guid = ?`;

        db.query(sql, [guid], (error2, data2) => {
          if (error2) return res.status(500).json(error2);
          if (data2.affectedRows > 0) {
            console.log("Chapters's info has been deleted from database");
            console.log('******************************************************');
            return res.status(200).json(data2);
          }
          return res.status(400).json({ error: data2 });
        });
      }
    });
  });
}
