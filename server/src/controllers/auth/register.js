/* eslint-disable no-unreachable */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../config/mysql.config.js';
import { sendMail } from '../../helpers/nodemailer/index.js';
import { getCurrentTime } from '../../helpers/time/index.js';

export default function register(req, res) {
  const { username, password, role, email } = req.body;

  const checkExistSQL = `
		SELECT *
		FROM user
		WHERE username = ?
	`;

  db.query(checkExistSQL, [username], (error, data) => {
    if (error) return res.status(500).json(error);
    if (data.length) return res.status(409).json({ error: 'Tên đăng nhập đã tồn tại' });

    if (role !== 'admin') {
      const payload = { username, password, email, guid: uuidv4() };

      const token = jwt.sign(payload, process.env.REGISTER_TOKEN_KEY, { expiresIn: '15m' });
      const link = `${process.env.CLIENT_URL}/register/verify?token=${token}`;

      const subject = 'Xác thực email của bạn';
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
        const mailResponse = `Link xác thực tài khoản đã được gửi đến ${email}. Sau khi xác thực bạn có thể đăng nhập`;
        return res.status(200).json({ message: mailResponse });
      }
    }
    if (role === 'admin') {
      const guid = uuidv4();
      const now = getCurrentTime();
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const sql = `
        INSERT INTO user
        (\`username\`,\`password\`,\`role\`,\`email\`,\`guid\`,\`createdAt\`,\`updatedAt\`)
        VALUES(?)
      `;
      const values = [username, hashedPassword, role, email, guid, now, now];

      db.query(sql, [values], (error2, data2) => {
        if (error2) return res.status(500).json(error2);
        if (data2.affectedRows > 0) return res.status(200).json(data2);
        return res.status(400).json({ error: error2, data: data2 });
      });
    }
  });
}
