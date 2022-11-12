/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

function usePreviewImage(initialState, fileSize, setFieldValue, fieldName) {
  const [imagePreview, setImagePreview] = useState(initialState);

  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];

    if (file) {
      if (file.size / 1024 / 1024 < fileSize) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setFieldValue(fieldName, reader.result);
        };

        file.preview = URL.createObjectURL(file);
        setImagePreview(file);
      } else {
        console.log("Hình ảnh phải từ 2MB trở xuống");
      }
    }
  };

  useEffect(() => {
    return () => {
      imagePreview && URL.revokeObjectURL(imagePreview.preview);
    };
  }, [imagePreview]);

  return { imagePreview, setImagePreview, handleImageChange };
}

export default usePreviewImage;
