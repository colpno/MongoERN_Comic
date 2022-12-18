import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../config/mysql.config.js';
import { cloudinary } from '../../config/cloudinary.config.js';
import { getCurrentTime } from '../../helpers/time/index.js';
import { table } from './index.js';

config();

const first = async (res, image, titleId, chapterId, index) => {
  if (image?.publicId) {
    return [
      chapterId,
      image.secure_url,
      `${index + 1}`,
      getCurrentTime(),
      getCurrentTime(),
      uuidv4(),
      image.publicId,
    ];
  }
  const response = await cloudinary.uploader.upload(
    image,
    {
      upload_preset: process.env.CLOUDINARY_CHAPTER_UPLOAD_PRESET,
      folder: `comic/titles/${titleId}/chapters/${chapterId}/images`,
    },
    (error) => {
      if (error) return res.status(500).json(error);
      console.log('Image has been uploaded to cloud');
    }
  );
  return [
    chapterId,
    response.secure_url,
    `${index + 1}`,
    getCurrentTime(),
    getCurrentTime(),
    uuidv4(),
    response.public_id,
  ];
};

export default function updateChapter(req, res) {
  const { params, body, cookies } = req;
  const { guid: chapterGuid } = params;
  const { titleId, newValues } = body;
  const { cover, images, ...others } = newValues;
  const token = cookies.accessToken;
  const otherKeys = Object.keys(others);

  if (!token) {
    return res.status(401).json({ error: 'Cần đăng nhập để sử dụng chức năng này' });
  }

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, async (error, userInfo) => {
      if (error) return res.status(403).json({ error: 'Token không hợp lệ' });

      const sql = `SELECT t.userId FROM \`${table}\` as c JOIN title as t ON (t.guid = c.titleId) WHERE c.guid = ?`;

      db.query(sql, [chapterGuid], async (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length) {
          if (userInfo.role === 'admin' || data[0].userId === userInfo.guid) {
            console.log('------------------------------------------------------');

            let uploadCoverResponse = null;

            if (cover) {
              await cloudinary.api
                .delete_resources_by_prefix(`comic/titles/${titleId}/chapters/${chapterGuid}/cover`)
                .then(async () => {
                  await cloudinary.api
                    .delete_folder(`comic/titles/${titleId}/chapters/${chapterGuid}/cover/`)
                    .catch((error2) => {
                      if (error2) console.log(error2);
                    });
                })
                .catch((error1) => {
                  if (error1) console.log(error1);
                });

              // Upload cover to cloudinary
              uploadCoverResponse = await cloudinary.uploader.upload(
                cover,
                {
                  upload_preset: process.env.CLOUDINARY_CHAPTER_UPLOAD_PRESET,
                  folder: `comic/titles/${titleId}/chapters/${chapterGuid}/cover`,
                },
                (error1) => {
                  if (error1) console.log(error1);
                  console.log('Cover has been uploaded to cloud');
                }
              );
            }

            let chapterImagesValues = null;

            if (images?.length > 0) {
              // Upload all images of chapter into cloudinary
              const getRes = async () => {
                const temp = await images.map(async (image, index) => {
                  const temp1 = await first(res, image, titleId, chapterGuid, index);
                  return temp1;
                });
                return temp;
              };
              const promises = await getRes()
                .then((response) => response)
                .catch((error1) => {
                  if (error1) console.log(error1);
                });
              chapterImagesValues =
                promises.length > 0 &&
                (await Promise.all(promises)
                  .then(async (response) => {
                    const oldImages = images.filter((image) => image.includes('comic'));
                    const oldImagePublicId = oldImages.map((image) =>
                      image.slice(image.indexOf('comic'), image.lastIndexOf('.'))
                    );

                    oldImagePublicId.forEach(async (publicId) => {
                      await cloudinary.uploader.destroy(publicId).catch((error1) => {
                        if (error1) console.log(error1);
                        console.log('Deleted all unnecessary images');
                      });
                    });

                    return response;
                  })
                  .catch((error1) => {
                    if (error1) console.log(error1);
                  }));
            }

            const setStatements = [];
            otherKeys.length > 0 && setStatements.push(otherKeys.map((key) => `\`${key}\` = ?`));
            uploadCoverResponse?.public_id && setStatements.push('`cover` = ?,`publicId` = ?');
            setStatements.push('`updatedAt` = ?');

            const updateSql = `
              UPDATE \`${table}\`
              SET ${setStatements.toString()}
              WHERE guid = ?
            `;

            // Values of above SQL
            const now = getCurrentTime();
            const chapterValues = [...otherKeys.map((dataKey) => others[dataKey])];
            uploadCoverResponse?.public_id &&
              chapterValues.push(uploadCoverResponse.secure_url, uploadCoverResponse.public_id);
            chapterValues.push(now, chapterGuid);

            db.query(updateSql, [...chapterValues], (error1, data1) => {
              if (error1) {
                console.log('file: updateChapter.js ~ line 155 ~ error1', error1);
                return res.status(500).json(error1);
              }
              if (data1.affectedRows > 0) {
                console.log("Updated chapter's info in database");

                if (images?.length > 0) {
                  const deleteSql = `DELETE FROM ${table}_image WHERE chapterId = ?`;

                  db.query(deleteSql, [chapterGuid], (error2, data2) => {
                    if (error2) return res.status(500).json(error2);
                    if (data2.affectedRows > 0) {
                      console.log('Deleted all images');

                      const sqla = `
                      INSERT INTO \`${table}_image\`
                      (\`chapterId\`,\`image\`,\`order\`,\`createdAt\`,\`updatedAt\`, \`guid\`,\`publicId\`)
                      VALUES ?;
                    `;

                      // Execute query
                      db.query(sqla, [chapterImagesValues], (error3, data3) => {
                        if (error3) return res.status(500).json(error3);
                        if (data3.affectedRows > 0) {
                          console.log("Chapter's images has been insert into database");
                          console.log('******************************************************');
                          return res.status(200).json(data3);
                        }
                        return res.status(400).json({ error: data3 });
                      });
                    }
                  });
                } else {
                  return res.status(200).json(data1);
                }
              }
              // return res.status(400).json({ error: error1, data: data1 });
            });
          } else {
            return res.status(403).json({ error: 'Token không hợp lệ' });
          }
        } else {
          return res.status(400).json({ error: data });
        }
      });
    });
  }
}
