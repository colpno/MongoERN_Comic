import { db } from '../../config/mysql.config.js';

export default function getUserLike(req, res) {
  const { userId, chapterId } = req.query;

  const checkExistSQL = `
		SELECT *
		FROM \`like\`
		WHERE \`userId\` = ? AND \`chapterId\` = ?
	`;

  db.query(checkExistSQL, [userId, chapterId], (error, data) => {
    if (error) return res.status(500).json({ error: 'Lỗi do server', detail: error });
    if (data.length === 0) {
      return res.status(200).json({ message: 'Truyện chưa được thích' });
    }
    if (data.length > 0) {
      return res.status(200).json(data);
    }
    return res.status(400).json({ error });
  });
}
