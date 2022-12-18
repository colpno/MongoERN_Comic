/* eslint-disable no-unreachable */
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../config/mysql.config.js';
import { getCurrentTime } from '../../helpers/time/index.js';

export default function addUserLike(req, res) {
  const { userId, chapterId } = req.body;

  const checkExistSQL = `
		SELECT userId
		FROM \`like\`
		WHERE \`userId\` = ? AND \`chapterId\` = ?
	`;
  const checkExistValues = [userId, chapterId];

  db.query(checkExistSQL, checkExistValues, (error, data) => {
    if (error) return res.status(500).json({ error: 'Lỗi do server', detail: error });
    if (data.length > 0) {
      return res.status(409).json({ message: 'Truyện đã được nhấn thích bởi bạn' });
    }
    if (data.length === 0) {
      const sql = `
        INSERT INTO \`like\` (\`guid\`,\`userId\`,\`chapterId\`,\`createdAt\`,\`updatedAt\`)
        VALUES (?)
      `;

      const now = getCurrentTime();
      const guid = uuidv4();
      const values = [guid, userId, chapterId, now, now];

      db.query(sql, [values], (error2, data2) => {
        if (error2) return res.status(500).json({ error: 'Lỗi do server', detail: error2 });
        if (data2.affectedRows > 0) {
          return res.status(200).json({
            message: 'Cảm ơn bạn đã yêu thích truyện',
            data: {
              guid,
              userId,
              chapterId,
              createdAt: now,
              updatedAt: now,
            },
          });
        }
        return res.status(400).json({ error: error2 });
      });
    }
  });
}
