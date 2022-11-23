import bcrypt from 'bcryptjs';
import moment from 'moment';
import { db } from '../../config/database.js';
import sendMail from '../../libs/nodemailer/sendMail.js';

function randomOTP(length) {
  let random = '';
  for (let i = 0; i < length; i++) {
    random += Math.floor(Math.random() * 10).toString();
  }
  return random;
}

export default function login(req, res) {
  const { username, password: inputPassword } = req.body;
  const checkUserSQL = 'SELECT * FROM user WHERE username = ?';

  db.query(checkUserSQL, [username], (error, data) => {
    if (error) return res.status(500).json({ error: 'Lỗi do server' });
    if (data.length === 0) return res.status(404).json({ error: 'Tên đăng nhập không tồn tại' });

    const { password, email, guid: userGuid } = data[0];

    const samePassword = bcrypt.compareSync(inputPassword, password);
    if (!samePassword) return res.status(404).json({ error: 'Sai mật khẩu' });

    const checkOtpSQL = `
      SELECT email
      FROM otp
      WHERE email = ?
    `;

    db.query(checkOtpSQL, [email], (error2, data2) => {
      if (error2) return res.status(500).json({ error: 'Lỗi do server' });
      if (data2.length) {
        const removeOtpSQL = `
              DELETE FROM otp
              WHERE email = ?
            `;

        db.query(removeOtpSQL, [email], (error3, data3) => {
          if (error3) return res.status(500).json({ error: error3 });
          if (data3.affectedRows === 0) return res.status(500).json({ error: error3 });
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

      db.query(sql, [[email, hashedOTP]], (error3, data3) => {
        if (error3) return res.status(500).json({ error: 'Lỗi do server' });
        if (data3.affectedRows > 0) {
          const subject = 'Mã xác thực';
          const html = `
              <div>
                <strong>${otp}</strong>
              </div>
              <div>Hết hạn sau <strong>15</strong> phút</div>
            `;
          const response = sendMail(email, subject, html);

          if (response.status) {
            const expiredAt = moment().add(15, 'm').toISOString();
            const cookieData = JSON.stringify({ email, userGuid, expiredAt });
            return res
              .cookie('loginInfo', cookieData, {
                maxAge: 15 * 60 * 1000,
              })
              .json(`OTP đã được gửi đến ${email}`);
          }

          return res.status(500).json({ error: response.error });
        }
        return res.status(400).json({ error, data: data3 });
      });
    });
  });
}
