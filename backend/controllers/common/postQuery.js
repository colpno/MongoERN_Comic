import { db } from '../../database/connect.js';
import { getCurrentDateTime } from './index.js';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export default function postQuery(req, res, table) {
  const { body } = req;
  const bodyKeys = Object.keys(body);
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json('Not logged in');

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, userInfo) => {
    if (error) return res.status(403).json('Invalid token');

    const sql = `
      INSERT INTO \`${table}\`
      (${bodyKeys.map((key) => `\`${key}\``)},\`guid\`,\`userId\`,\`createdAt\`,\`updatedAt\`)
      VALUES (?)
    `;

    const now = getCurrentDateTime();
    const guid = uuidv4();
    const values = [...bodyKeys.map((dataKey) => body[dataKey]), guid, userInfo.guid, now, now];

    db.query(sql, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.status(200).json(data);
      return res.status(400).json('Something went wrong');
    });
  });
}
