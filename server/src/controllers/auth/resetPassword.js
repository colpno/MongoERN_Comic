import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../../config/mysql.config.js';

export default function resetPassword(req, res) {
  const { params, cookies, body } = req;
  const { token } = params;
  const { forgotPasswordToken } = cookies;
  const { password } = body;

  if (!forgotPasswordToken) {
    return res.status(401).json({ error: 'Không thể thực hiện do thiếu bước điền tên đăng nhập' });
  }

  if (forgotPasswordToken !== token) {
    return res.status(403).json({ error: 'Token không hợp lệ' });
  }

  jwt.verify(token, process.env.FORGOT_PASSWORD_TOKEN_KEY, (error, userInfo) => {
    if (error) return res.status(403).json({ error: 'Token không hợp lệ' });

    const sql = `
      UPDATE user
      SET password = ?
      WHERE guid = ?
    `;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    db.query(sql, [hashedPassword, userInfo.guid], (err, data) => {
      if (err) return res.status(500).json({ error: 'Lỗi do server' });
      if (data.affectedRows > 0) return res.status(200).json(data);
      return res.status(400).json({ error: err, data });
    });
  });
}
