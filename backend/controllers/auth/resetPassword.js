import { db } from '../../database/connect.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default function resetPassword(req, res) {
  const { params, body } = req;
  const { token } = params;
  const { password } = body;

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

      return res.status(200).json(data);
    });
  });
}
