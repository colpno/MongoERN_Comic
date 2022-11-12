import { db } from '../../database/connect.js';
import jwt from 'jsonwebtoken';
import sendMail from '../../libs/nodemailer/sendMail.js';

export default function forgotPassword(req, res) {
  const { username } = req.body;

  const sql = `
		SELECT *
		FROM user
		WHERE username = ?
	`;

  db.query(sql, [username], (error, data) => {
    if (error) return res.status(500).json(error);
    if (data.length === 0) return res.json(`${username} không tồn tại`);

    const { guid, email } = data[0];
    const payload = {
      guid: guid,
    };
    const token = jwt.sign(payload, process.env.FORGOT_PASSWORD_TOKEN_KEY, { expiresIn: '15m' });
    const link = `${process.env.CLIENT_URL}/reset-password/${token}`;
    console.log(link);

    const subject = 'Link thay đổi mật khẩu';
    const html = `
      <div>
        <span>
          <strong>Link:</strong> ${link}
        </span>
      </div>
      <div>
        <p>Hạn sử dụng link là 15 phút.</p>
      </div>
    `;
    const successfulMessage = `Link thay đổi mật khẩu đã được gửi đến ${email}`;
    sendMail(res, successfulMessage, email, subject, html);
  });
}
