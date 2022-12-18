import { db } from '../../config/mysql.config.js';
import { table } from './index.js';

export default function updateChapter(req, res) {
  const { params } = req;
  const { guid: chapterGuid } = params;

  const updateSql = `
    UPDATE \`${table}\`
    SET \`view\` = cast(\`view\` as int) + 1
    WHERE guid = ?
  `;

  db.query(updateSql, [chapterGuid], (error, data) => {
    if (error) {
      return res.status(500).json({ error: 'Lỗi do server', detail: error });
    }
    if (data.affectedRows > 0) {
      return res.status(200);
    }
    return res.status(400).json({ error, data });
  });
}
