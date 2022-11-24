import { db } from '../../config/database.js';

export default function getFollow(req, res) {
  const { userId, titleId } = req.query;

  const checkExistSQL = `
		SELECT *
		FROM \`follow\`
		WHERE \`userId\` = ? AND \`titleId\` = ?
	`;

  db.query(checkExistSQL, [userId, titleId], (error, data) => {
    if (error) return res.status(500).json({ error: 'Lỗi do server', detail: error });
    if (data.length === 0) {
      return res.status(200).json({ message: 'Bạn chưa theo dõi truyện' });
    }
    if (data.length > 0) {
      return res.status(200).json(data);
    }
    return res.status(400).json({ error });
  });
}
