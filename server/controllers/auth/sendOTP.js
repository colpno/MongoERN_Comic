/* eslint-disable no-unreachable */
import bcrypt from 'bcryptjs';
import { db } from '../../config/database.js';
import sendMail from '../../libs/nodemailer/sendMail.js';

function randomOTP(length) {
  let random = '';
  for (let i = 0; i < length; i++) {
    random += Math.floor(Math.random() * 10).toString();
  }
  return random;
}

export default function sendOTP(req, res) {
  const { loginInfo } = req.cookies;
  const { email, userGuid } = JSON.parse(loginInfo);

  const checkOtpSQL = `
      SELECT email
      FROM otp
      WHERE email = ?
    `;

  db.query(checkOtpSQL, [email], (error, data) => {
    if (error) return res.status(500).json({ error: 'Lỗi do server' });
    if (data.length) {
      const removeOtpSQL = `
              DELETE FROM otp
              WHERE email = ?
            `;

      db.query(removeOtpSQL, [email], (error2, data2) => {
        if (error2) return res.status(500).json({ error: error2 });
        if (data2.affectedRows === 0) return res.status(500).json({ error: error2 });
      });
    }

    const otp = randomOTP(4);
    console.log('file: login.js ~ line 39 ~ otp', otp);
    const salt = bcrypt.genSaltSync(10);
    const hashedOTP = bcrypt.hashSync(otp, salt);

    const sql = `
          INSERT INTO otp (email, otp)
          VALUES (?)
        `;

    db.query(sql, [[email, hashedOTP]], (error2, data2) => {
      if (error2) return res.status(500).json({ error: 'Lỗi do server' });
      if (data2.affectedRows > 0) {
        const subject = 'Mã xác thực';
        const html = `
              <div>
                <strong>${otp}</strong>
              </div>
              <div>Hết hạn sau <strong>15</strong> phút</div>
            `;
        const response = sendMail(email, subject, html);

        if (response.status) {
          const cookieData = JSON.stringify({ email, userGuid });
          return res
            .clearCookie('loginInfo', {
              secure: true,
              sameSite: 'none',
            })
            .cookie('loginInfo', cookieData, {
              maxAge: 60 * 1000,
            })
            .json(`OTP đã được gửi đến ${email}`);
        }

        return res.status(500).json({ error: response.error });
      }
      return res.status(400).json({ error, data: data2 });
    });
  });
}
