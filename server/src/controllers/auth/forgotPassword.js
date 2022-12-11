import jwt from 'jsonwebtoken';
import { db } from '../../config/database.js';
import sendMail from '../../libs/nodemailer/sendMail.js';

export default function forgotPassword(req, res) {
  const { username, email } = req.body;

  const sql = `
		SELECT guid, email
		FROM user
		WHERE username = ?
	`;

  db.query(sql, [username], (error, data) => {
    if (error) return res.status(500).json({ error: 'Lỗi do server' });
    if (data.length === 0) return res.status(404).json({ error: 'Tên đăng nhập không tồn tại' });

    const { guid, email: userEmail } = data[0];

    if (userEmail !== email) {
      return res.status(404).json({ error: 'Email không trùng khớp, vui lòng nhập lại' });
    }

    console.log('------------------------------------------------------');
    const payload = {
      guid,
    };
    const token = jwt.sign(payload, process.env.FORGOT_PASSWORD_TOKEN_KEY, { expiresIn: '1m' });
    const link = `${process.env.CLIENT_URL}/reset-password/${token}`;
    console.log(link);

    const subject = 'Link thay đổi mật khẩu';
    const html = `
      <div>
        <p>
          ${link}
        </p>
      </div>
      <div>
        <p>Hạn sử dụng link là <strong>15 phút</strong>.</p>
      </div>
    `;

    const response = sendMail(email, subject, html);
    if (response.status) {
      const message = `Link thay đổi mật khẩu đã được gửi đến ${email}`;

      return res
        .cookie('forgotPasswordToken', token, {
          httpOnly: true,
          maxAge: 15 * 60 * 1000,
        })
        .status(200)
        .json(message);
    }
    if (!response.status) {
      return res.status(400).json(response.error);
    }

    console.log('******************************************************');
  });
}
