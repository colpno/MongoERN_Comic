import { table } from './index.js';
import { db } from '../../database/connect.js';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { cloudinary } from '../../libs/cloudinary/index.js';
import { config } from 'dotenv';
import getCurrentDateTime from '../common/getCurrentDateTime.js';

config();

const first = async (res, image, titleId, chapterId, index) => {
  if (image?.publicId) {
    return [
      chapterId,
      image.secure_url,
      `${index + 1}`,
      getCurrentDateTime(),
      getCurrentDateTime(),
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
      if (error) return res.json(error);
      console.log('Image has been uploaded to cloud');
    }
  );
  return await [
    chapterId,
    response.secure_url,
    `${index + 1}`,
    getCurrentDateTime(),
    getCurrentDateTime(),
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

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, async (error, userInfo) => {
    if (error) return res.status(403).json('Invalid token');

    console.log('------------------------------------------------------');
    let uploadCoverResponse = null;
    if (cover) {
      await cloudinary.api
        .delete_resources_by_prefix(`comic/titles/${titleId}/chapters/${chapterGuid}/cover`)
        .then(async () => {
          await cloudinary.api
            .delete_folder(`comic/titles/${titleId}/chapters/${chapterGuid}/cover/`)
            .catch((error) => {
              if (error) console.log(error);
            });
        })
        .catch((error) => {
          if (error) console.log(error);
        });

      // Upload cover to cloudinary
      uploadCoverResponse = await cloudinary.uploader.upload(
        cover,
        {
          upload_preset: process.env.CLOUDINARY_CHAPTER_UPLOAD_PRESET,
          folder: `comic/titles/${titleId}/chapters/${chapterGuid}/cover`,
        },
        (error) => {
          if (error) console.log(error);
          console.log('Cover has been uploaded to cloud');
        }
      );
    }

    let chapterImagesValues = null;

    if (images?.length > 0) {
      // const imagesInCloud = await cloudinary.search
      //   .expression(`comic/titles/${titleId}/chapters/${chapterGuid}/images`)
      //   .execute()
      //   .catch((error) => {
      //     if (error) console.log(error);
      // });

      // imagesInCloud.forEach(async (image) => {
      //   await cloudinary.uploader.rename(
      //     image.public_id,
      //     `comic/titles/${titleId}/chapters/${chapterGuid}/unnecessary`
      //   );
      // });

      // const imgTemp = images.reduce(
      //   (obj, image) => {
      //     if (image.includes('http')) {
      //       return { ...obj, oldImages: [...obj.oldImages, image] };
      //     }
      //     return { ...obj, newImages: [...obj.newImages, image] };
      //   },
      //   { newImages: [], oldImages: [] }
      // );

      // const temp = imagesInCloud.resources.reduce(
      //   (obj, resource) => {
      //     const found = imgTemp.oldImages.some((image) => {
      //       const publicId = image.slice(image.indexOf('comic'), image.lastIndexOf('.'));
      //       return publicId === resource.public_id;
      //     });
      //     const resourceInfo = {
      //       publicId: resource.public_id,
      //       fileName: resource.filename,
      //       secure_url: resource.secure_url,
      //     };
      //     return found
      //       ? { ...obj, necessary: [...obj.necessary, resourceInfo] }
      //       : {
      //           ...obj,
      //           unnecessary: [...obj.unnecessary, resourceInfo],
      //         };
      //   },
      //   { necessary: [], unnecessary: [] }
      // );

      // if (temp.unnecessary.length > 0) {
      //   temp.unnecessary.forEach(async (image) => {
      //     if (image) {
      //       await cloudinary.uploader.destroy(image.publicId).catch((error) => {
      //         if (error) console.log(error);
      //         console.log('Deleted all unnecessary images');
      //       });
      //     }
      //   });
      // }

      // const imagesCloud = [...imgTemp.newImages, ...temp.necessary];

      // Upload all images of chapter into cloudinary
      const getRes = async () => {
        const chapterImagesValues = await images.map(
          async (image, index) => await first(res, image, titleId, chapterGuid, index)
        );
        return chapterImagesValues;
      };
      const promises = await getRes()
        .then((response) => response)
        .catch((error) => {
          if (error) console.log(error);
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
              await cloudinary.uploader.destroy(publicId).catch((error) => {
                if (error) console.log(error);
                console.log('Deleted all unnecessary images');
              });
            });

            return response;
          })
          .catch((error) => {
            if (error) console.log(error);
          }));

      // await cloudinary.api
      //   .delete_resources_by_prefix(`comic/titles/${titleId}/chapters/${chapterGuid}/images`)
      //   .then(async () => {
      //     await cloudinary.api
      //       .delete_folder(`comic/titles/${titleId}/chapters/${chapterGuid}/images/`)
      //       .catch((error) => {
      //         if (error) console.log(error);
      //       });
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      // const temp = images.reduce(
      //   (obj, image) => {
      //     if (image.includes('cloudinary.com')) {
      //       return { ...obj, oldImages: [...obj.oldImages, image] };
      //     }
      //     return { ...obj, newImages: [...obj.newImages, image] };
      //   },
      //   { oldImages: [], newImages: [] }
      // );
    }

    const setStatements = [];
    otherKeys.length > 0 && setStatements.push(otherKeys.map((key) => `\`${key}\` = ?`));
    uploadCoverResponse?.public_id && setStatements.push('`cover` = ?,`publicId` = ?,');
    setStatements.push('`updatedAt` = ?');

    const updateSql = `
      UPDATE \`${table}\`
      SET ${setStatements.toString()}
      WHERE guid = ?
    `;

    // Values of above SQL
    const now = getCurrentDateTime();
    const chapterValues = [...otherKeys.map((dataKey) => body.newValues[dataKey])];
    uploadCoverResponse?.public_id &&
      chapterValues.push(uploadCoverResponse.secure_url, uploadCoverResponse.public_id);
    chapterValues.push(now, chapterGuid);

    db.query(updateSql, [...chapterValues], (error, data) => {
      if (error) return res.json(error);
      if (data.affectedRows > 0) {
        console.log("Updated chapter's info in database");

        const deleteSql = `DELETE FROM ${table}_image WHERE chapterId = ?`;

        db.query(deleteSql, [chapterGuid], (error, data) => {
          if (error) return res.json(error);
          if (data.affectedRows > 0) {
            console.log('Deleted all images');

            const sqla = `
            INSERT INTO \`${table}_image\`
            (\`chapterId\`,\`image\`,\`order\`,\`createdAt\`,\`updatedAt\`, \`guid\`,\`publicId\`)
            VALUES ?;
          `;

            // Execute query
            db.query(sqla, [chapterImagesValues], (err, data) => {
              if (err) return res.json(err);
              if (data.affectedRows > 0) {
                console.log("Chapter's images has been insert into database");
                console.log('------------------------------------------------------');
                return res.json(data);
              }
              return res.json('something went wrong');
            });
          }
        });
      }
    });
  });
}
