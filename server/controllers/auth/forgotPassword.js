import jwt from 'jsonwebtoken';
import { db } from '../../config/database.js';
import sendMail from '../../libs/nodemailer/sendMail.js';

export default function forgotPassword(req, res) {
  const { username } = req.body;

  const sql = `
		SELECT guid, email
		FROM user
		WHERE username = ?
	`;

  db.query(sql, [username], (error, data) => {
    if (error) return res.status(500).json(error);
    if (data.length === 0) return res.status(404).json('Tên đăng nhập không tồn tại');

    console.log('------------------------------------------------------');
    const { guid, email } = data[0];
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
    console.log('******************************************************');

    return res
      .cookie('forgotPasswordToken', token, {
        httpOnly: true,
      })
      .status(200)
      .json(response);
  });
}
