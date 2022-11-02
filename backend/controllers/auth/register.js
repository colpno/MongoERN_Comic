import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../database/connect.js';
import { getCurrentDateTime } from '../common/index.js';

export default function register(req, res) {
  const { userName, password } = req.body;

  const sql = `
		SELECT *
		FROM user
		WHERE userName = ?
	`;

  db.query(sql, [userName], (error, data) => {
    if (error) return res.status(500).json(error);
    if (data.length) return res.status(409).json('Username has already existed');

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const guid = uuidv4();
    const now = getCurrentDateTime();

    const sql = 'INSERT INTO user (`userName`,`password`,`guid`,`createdAt`,`updatedAt`) VALUES(?)';
    const values = [userName, hashedPassword, guid, now, now];

    db.query(sql, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json(data);
    });
  });
}
