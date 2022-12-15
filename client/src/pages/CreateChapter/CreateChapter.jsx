import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ChapterForm from "components/ChapterForm";
import FormWrapper from "components/FormWrapper/FormWrapper";
import { Popup, ProgressCircle } from "features";
import { useToast } from "hooks";
import { addChapter, getAllChapters } from "services/chapter";
import { createChapterFormValidation } from "validations";

function CreateChapter() {
  const { titleId } = useParams();
  const [progress, setProgress] = useState(0);
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const [chapters, setChapters] = useState([]);
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "",
  });

  const INITIAL_VALUE = {
    order: `${Number.parseInt(chapters[0]?.order || 0, 10) + 1}`,
    name: "",
    cost: "false",
    cover: "",
    images: [],
  };

  const fetchData = () => {
    const params = {
      titleId,
      sort: "order",
      order: "desc",
      limit: 1,
    };
    getAllChapters(params)
      .then((response) => setChapters(response.data))
      .catch((error) => console.log(error));
  };

  const handleSubmit = (
    { cover, images, ...values },
    { setSubmitting, resetForm }
  ) => {
    const data = {
      ...values,
      titleId,
      cover,
      images,
    };
    addChapter(data, setProgress)
      .then((response) => {
        if (response.affectedRows > 0) {
          toastEmitter("Truyện đã được thêm thành công", "success");
          setProgress(0);
          resetForm();
          fetchData();
        }
      })
      .catch((error) => {
        toastEmitter(error.data.error || error.data.message, "error");
        setProgress(0);
      });

    setSubmitting(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <FormWrapper title="Thêm chương mới">
        <ChapterForm
          initialValues={INITIAL_VALUE}
          validationSchema={createChapterFormValidation}
          handleSubmit={handleSubmit}
        />
      </FormWrapper>
      <ProgressCircle percentage={progress} />
      <Popup popup={popup} setPopup={setPopup} />
      <Toast {...toastOptions} />
    </>
  );
}

export default CreateChapter;
