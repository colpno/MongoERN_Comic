import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../database/connect.js';
import { getCurrentDateTime } from '../common/index.js';

export default function register(req, res) {
  const { username, password, role, email } = req.body;

  const sql = `
		SELECT *
		FROM user
		WHERE username = ?
	`;

  db.query(sql, [username], (error, data) => {
    if (error) return res.status(500).json(error);
    if (data.length) return res.status(409).json({ error: 'Tên đăng nhập đã tồn tại' });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const guid = uuidv4();
    const now = getCurrentDateTime();

    const sql = `
      INSERT INTO user
      (\`username\`,\`password\`,\`role\`,\`email\`,\`guid\`,\`createdAt\`,\`updatedAt\`)
      VALUES(?)
    `;
    const values = [username, hashedPassword, role, email, guid, now, now];

    db.query(sql, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json(data);
    });
  });
}
