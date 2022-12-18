import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../../config/mysql.config.js';
import { getCurrentTime } from '../../helpers/time/index.js';

export default function register(req, res) {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ error: 'Bạn không thể sử dụng chức năng này' }).redirect('/');
  }

  jwt.verify(token, process.env.REGISTER_TOKEN_KEY, (error, userInfo) => {
    if (error) return res.status(403).json({ error: 'Token không hợp lệ' });

    const { username, password, email, guid } = userInfo;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const now = getCurrentTime();

    const sql = `
      INSERT INTO user
      (\`username\`,\`password\`,\`role\`,\`email\`,\`guid\`,\`createdAt\`,\`updatedAt\`)
      VALUES(?)
    `;
    const values = [username, hashedPassword, 'member', email, guid, now, now];

    db.query(sql, [values], (error2, data2) => {
      // if (error2) return res.status(500).json(error2);
      if (data2.affectedRows > 0) return res.status(200).json(data2);
      return res.status(400).json({ error: error2, data: data2 });
    });
  });
}
