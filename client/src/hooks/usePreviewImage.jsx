import { emitToast } from "features/Toast.jsx";
import { useEffect, useState } from "react";

function usePreviewImage(initialState, fileSize) {
  const [imagePreview, setImagePreview] = useState({ preview: initialState });

  const handleImageChange = (e, callback) => {
    const file = e.currentTarget.files[0];

    if (file) {
      if (file.size / 1024 / 1024 < fileSize) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          callback && callback(reader.result);
        };

        file.preview = URL.createObjectURL(file);
        setImagePreview(file);
      } else {
        emitToast(`Hình ảnh phải từ ${fileSize}MB trở xuống`, "info");
      }
    }
  };

  const removeBlob = () => setImagePreview("");

  useEffect(() => {
    return () => {
      imagePreview && URL.revokeObjectURL(imagePreview.preview);
    };
  }, [imagePreview]);

  return { imagePreview: imagePreview.preview, removeBlob, handleImageChange };
}

export default usePreviewImage;
