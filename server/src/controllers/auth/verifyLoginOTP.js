import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../../config/database.js';
import { switchCaseConvert } from '../../helpers/convertDataFormat/index.js';

export default function verifyLoginOTP(req, res) {
  const { userGuid, email, otp: userOTP } = req.body;

  const checkExistSQL = `
    SELECT email, otp
    FROM otp
    WHERE email = ?
  `;

  db.query(checkExistSQL, [email], (error, data) => {
    if (error) return res.status(500).json({ error });
    if (data.length === 0) return res.status(404).json({ error: 'Email không tồn tại' });
    if (data.length > 0) {
      const { otp } = data[0];

      const sameOTP = bcrypt.compareSync(userOTP, otp);

      if (sameOTP) {
        const sql = `
          SELECT *
          FROM user
          WHERE guid = ?
        `;

        db.query(sql, [userGuid], (error2, data2) => {
          if (error2) return res.status(500).json({ error: error2 });
          if (data2.length === 0) {
            return res.status(404).json({ error: 'User không tồn tại' });
          }
          if (data2.length) {
            const removeOtpSQL = `
              DELETE FROM otp
              WHERE email = ?
            `;

            db.query(removeOtpSQL, [email], (error3, data3) => {
              if (error3) return res.status(500).json({ error: error3 });
              if (data3.affectedRows === 0) return res.status(500).json({ error: error3 });
            });

            const { role, ...others } = data2[0];

            const token = jwt.sign({ guid: data2[0].guid, role }, process.env.ACCESS_TOKEN_KEY);
            return res
              .clearCookie('loginInfo', {
                secure: true,
                sameSite: 'none',
              })
              .cookie('accessToken', token, {
                httpOnly: true,
              })
              .status(200)
              .json(switchCaseConvert([others], 'user'));
          }
        });
      }
      if (!sameOTP) {
        return res.status(404).json({ error: 'OTP không trùng khớp' });
      }
    }
  });
}
