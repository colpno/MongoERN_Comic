import jwt from 'jsonwebtoken';
import { table } from './index.js';
import { db } from '../../config/database.js';
import { cloudinary } from '../../libs/cloudinary/index.js';

export default function deleteTitle(req, res) {
  const { params, cookies } = req;
  const { guid } = params;

  const token = cookies.accessToken;

  if (!token) return res.status(401).json({ error: 'Cần đăng nhập để sử dụng chức năng này' });

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, async (error, userInfo) => {
    if (error) return res.status(403).json({ error: 'Token không hợp lệ' });

    const checkExistSQL = `SELECT userId FROM \`${table}\` WHERE guid = ?`;

    db.query(checkExistSQL, [guid], async (err, data) => {
      if (err) {
        console.log('file: deleteTitle.js ~ line 20 ~ err', err);
        return res.status(500).json(err);
      }

      if (data.length && data[0].userId !== userInfo.guid) {
        return res.status(403).json({ error: 'Token không hợp lệ' });
      }
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
            .catch((error2) => {
              console.log(error2);
            });
        })
        .catch((error2) => {
          console.log(error2);
        });

      if (userInfo.role === 'admin') {
        const sql = `DELETE FROM ${table} WHERE guid = ?`;

        db.query(sql, [guid], (error2, data2) => {
          if (error2) {
            console.log('file: deleteTitle.js ~ line 60 ~ error2', error2);
            return res.status(500).json(error2);
          }
          if (data2.affectedRows > 0) {
            console.log('Title has been deleted from database');
            console.log('******************************************************');
            return res.status(200).json(data2);
          }
          return res.status(400).json({ error: data2 });
        });
      } else {
        const sql = `DELETE FROM ${table} WHERE guid = ? AND userId = ?`;

        db.query(sql, [guid, userInfo.guid], (error2, data2) => {
          if (error2) {
            if (error2.errno === 1451) {
              return res.status(400).json({ error: 'Không thể xóa do các chương vẫn tồn tại' });
            }
            console.log('file: deleteTitle.js ~ line 60 ~ error2', error2);
            return res.status(500).json(error2);
          }
          if (data2.affectedRows > 0) {
            console.log('Title has been deleted from database');
            console.log('******************************************************');
            return res.status(200).json(data2);
          }
          return res.status(400).json({ error: data2 });
        });
      }
    });
  });
}
