import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';
import { db } from '../../config/database.js';
import { table } from './index.js';
import { getCurrentDateTime } from '../common/index.js';
import { cloudinary } from '../../libs/cloudinary/index.js';

config();

const first = async (res, image, titleId, chapterId, index) => {
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
    getCurrentDateTime(),
    getCurrentDateTime(),
    uuidv4(),
    response.public_id,
  ];
};

export default async function addChapter(req, res) {
  const { body } = req;
  const { images, cover, ...values } = body;
  const bodyKeys = Object.keys(values);
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ error: 'Cần đăng nhập để sử dụng chức năng này' });

  const chapterGuid = uuidv4();

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, async (jwtError) => {
    if (jwtError) return res.status(403).json({ error: 'Token không hợp lệ' });

    console.log('------------------------------------------------------');

    // Upload cover to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(
      cover,
      {
        upload_preset: process.env.CLOUDINARY_CHAPTER_UPLOAD_PRESET,
        folder: `comic/titles/${values.titleId}/chapters/${chapterGuid}/cover`,
      },
      (error) => {
        if (error) return res.status(500).json(error);
        console.log('Cover has been uploaded to cloud');
      }
    );

    // SQL insert to chapter table
    const sql = `
        INSERT INTO \`${table}\`
        (${bodyKeys.map(
          (key) => `\`${key}\``
        )},\`cover\`,\`guid\`,\`createdAt\`,\`updatedAt\`,\`publicId\`)
        VALUES (?)
      `;

    // Values of above SQL
    const now = getCurrentDateTime();
    const chapterValues = [
      ...bodyKeys.map((dataKey) => values[dataKey]),
      uploadResponse.secure_url,
      chapterGuid,
      now,
      now,
      uploadResponse.public_id,
    ];

    // Execute query
    db.query(sql, [chapterValues], async (err, data) => {
      if (err) {
        console.log('file: addChapter.js ~ line 83 ~ err', err);
        return res.status(500).json(err);
      }
      if (data.affectedRows > 0) {
        console.log("Chapter's info has been insert into database");

        // Upload all images of chapter into cloudinary
        const getRes = async () => {
          const temp = await images.map(async (image, index) => {
            const temp1 = first(res, image, values.titleId, chapterGuid, index);
            return temp1;
          });
          return temp;
        };
        const promises = await getRes()
          .then((response) => response)
          .catch((error1) => {
            if (error1) console.log(error1);
          });

        // SQL insert to chapter table
        const sqla = `
            INSERT INTO \`${table}_image\`
            (\`chapterId\`,\`image\`,\`order\`,\`createdAt\`,\`updatedAt\`, \`guid\`,\`publicId\`)
            VALUES ?;
          `;

        // Values of above SQL
        const chapterImagesValues = await Promise.all(promises).then((response) => response);

        // Execute query
        db.query(sqla, [chapterImagesValues], (error, data2) => {
          if (error) {
            console.log('file: addChapter.js ~ line 116 ~ error', error);
            return res.status(500).json(error);
          }
          if (data2.affectedRows > 0) {
            console.log("Chapter's images has been insert into database");
            console.log('******************************************************');
            return res.status(200).json(data2);
          }
          return res.status(400).json({ error: data2 });
        });
      }
    });
  });
}
