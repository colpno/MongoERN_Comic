import { useEffect, useState } from "react";

function useReviewImage(initialState, field = {}) {
  const [imagePreview, setImagePreview] = useState(initialState);

  useEffect(() => {
    return () => {
      imagePreview && URL.revokeObjectURL(imagePreview.preview);
    };
  }, [imagePreview]);

  const handleImageChange = (e) => {
    const file = e.target.files[0] || null;
    if (file) {
      file.preview = URL.createObjectURL(file);
      setImagePreview(file);
    }
    field.onChange(e);
  };

  return { imagePreview, handleImageChange };
}

export default useReviewImage;
