import { emitToast } from "features/Toast";
import { useEffect } from "react";

function usePreviewImage(initialState, fileSize, setFieldValue, fieldName) {
  let imagePreview = initialState;

  const setImagePreview = (newState) => {
    imagePreview = newState;
  };

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
        emitToast("Hình ảnh phải từ 2MB trở xuống", "info");
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
