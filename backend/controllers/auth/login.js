import { db } from '../../database/connect.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default function login(req, res) {
  const { username, password: inputPassword } = req.body;
  const sql = 'SELECT * FROM user WHERE username = ?';

  db.query(sql, [username], (err, data) => {
    if (err) return res.status(500).json('Error');
    if (data.length === 0) return res.status(404).json('Username not found');

    const { password, ...others } = data[0];

    const samePassword = bcrypt.compareSync(inputPassword, password);
    if (!samePassword) return res.status(403).json('Wrong password');

    const token = jwt.sign(
      { guid: data[0].guid, role: data[0].role },
      process.env.ACCESS_TOKEN_KEY
    );
    return res
      .cookie('accessToken', token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
}
