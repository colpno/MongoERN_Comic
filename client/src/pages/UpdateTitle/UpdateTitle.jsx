import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FormWrapper from "components/FormWrapper/FormWrapper";
import TitleForm from "components/TitleForm";
import { Popup, ProgressCircle } from "features";
import { useToast } from "hooks";
import { getTitle, updateTitle } from "services/title";
import { getAllTitleGenres } from "services/titleGenre";
import { updateTitleFormValidation } from "validations/updateTitleForm.validation";

function UpdateTitle() {
  const { titleId } = useParams();
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState({});
  const [titleGenres, setTitleGenres] = useState([]);
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "Thay đổi thành công",
  });
  const hasData = Object.keys(title).length > 0 && titleGenres.length > 0;
  const INITIAL_VALUE = hasData && {
    name: title.name,
    summary: title.summary,
    titleStatusId: `${title.approvedStatusId}`,
    releaseDay: title.releaseDay,
    genreId:
      titleGenres.length > 0
        ? titleGenres.map((genre) => {
            return `${genre.genreId}`;
          })
        : [""],
    author: title.author,
    coin: title.coin,
    cover: title.cover,
    largeCover: title.cover,
  };

  const fetchData = () => {
    const titlePromise = getTitle(titleId);
    const titleGenresPromise = getAllTitleGenres({ titleId });

    Promise.all([titlePromise, titleGenresPromise])
      .then(([titleResponse, titleGenresResponse]) => {
        setTitle(titleResponse);
        setTitleGenres(titleGenresResponse);
      })
      .catch((error) => console.log(error));
  };

  const handleUpdate = (values) => {
    updateTitle(
      titleId,
      {
        oldCover: INITIAL_VALUE.cover.slice(
          INITIAL_VALUE.cover.indexOf("comic"),
          INITIAL_VALUE.cover.lastIndexOf(".")
        ),
        newValues: values,
      },
      setProgress
    )
      .then((response) => {
        if (response.affectedRows > 0) {
          toastEmitter("Truyện đã được thay đổi thành công", "success");
          setProgress(0);
        }
      })
      .catch((error) => {
        toastEmitter(error.data.error || error.data.message, "error");
        setProgress(0);
      });
  };

  const getChangedValues = (values) => {
    const valueKeys = Object.keys(values);

    const changedValues = valueKeys.reduce((obj, key) => {
      if (JSON.stringify(values[key]) !== JSON.stringify(INITIAL_VALUE[key])) {
        return { ...obj, [key]: values[key] };
      }
      return obj;
    }, {});

    return changedValues;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const changedValues = getChangedValues(values);
    Object.keys(changedValues).length > 0 && handleUpdate(changedValues);
    setSubmitting(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <FormWrapper title="Chỉnh sửa truyện">
        {hasData && (
          <TitleForm
            handleSubmit={handleSubmit}
            initialValues={INITIAL_VALUE}
            imageBlob={{
              cover: title.cover,
              largeCover: title.cover,
            }}
            validationSchema={updateTitleFormValidation}
          />
        )}
      </FormWrapper>
      <ProgressCircle percentage={progress} />
      <Popup popup={popup} setPopup={setPopup} />
      <Toast {...toastOptions} />
    </>
  );
}

export default UpdateTitle;
