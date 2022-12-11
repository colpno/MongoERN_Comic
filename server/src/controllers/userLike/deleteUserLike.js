import { db } from '../../config/database.js';

export default function deleteUserLike(req, res) {
  const { userId, chapterId } = req.query;

  const checkExistSQL = `
		SELECT userId
		FROM \`like\`
		WHERE \`userId\` = ? AND \`chapterId\` = ?
	`;
  const values = [userId, chapterId];

  db.query(checkExistSQL, values, (error, data) => {
    console.log('file: deleteUserLike.js ~ line 14 ~ error', error);
    if (error) return res.status(500).json({ error: 'Lỗi do server', detail: error });
    if (data.length === 0) {
      return res.status(404).json({ message: 'Truyện chưa được thích' });
    }
    if (data.length > 0) {
      const sql = `
        DELETE FROM \`like\`
        WHERE \`userId\` = ? AND \`chapterId\` = ?
      `;

      db.query(sql, values, (error2, data2) => {
        if (error2) return res.status(500).json({ error: 'Lỗi do server', detail: error2 });
        if (data2.affectedRows > 0) {
          return res.status(200).json({ message: 'Hủy lượt thích thành công' });
        }
        return res.status(400).json({ error: error2 });
      });
    }
    // return res.status(400).json({ error });
  });
}
