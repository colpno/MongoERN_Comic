import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";

import { FloatingContainer, Select } from "components";
import { Loading } from "features";
import { useToast } from "hooks";
import { chapterService, objectStatusService, titleService } from "services";
import { handlePromiseAllSettled, replaceAll } from "utils";
import ChapterTable from "./components/ChapterTable";
import styles from "./styles/Chapters.module.scss";

const cx = classNames.bind(styles);

const getQueryParams = () => {
  const titleParams = {
    _fields: "title",
  };

  const chapterParams = {
    _embed: JSON.stringify([{ collection: "status_id", field: "-_id status" }]),
  };

  const approvedStatusParams = {
    _fields: "code status color",
  };

  const objectStatusParams = {
    _fields: "code status color",
  };

  return {
    titleParams,
    chapterParams,
    approvedStatusParams,
    objectStatusParams,
  };
};

function Chapters() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const [chapters, setChapters] = useState([]);
  const [titles, setTitles] = useState([]);
  const [objectStatuses, setObjectStatuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTitleId, setSelectedTitleId] = useState({ value: "all", label: "Tất cả" });

  const titleSelectOptions = useMemo(() => {
    return [
      { value: "all", label: "Tất cả" },
      ...titles.map((title) => {
        return { value: title._id, label: title.title };
      }),
    ];
  }, [titles]);

  const handleChangeTitle = (selectedValue) => {
    setLoading(true);
    const { value: titleId, label: titleName } = selectedValue;
    navigate({
      search: `?title=${titleId !== "all" ? replaceAll(titleName.toLowerCase(), " ", "-") : "all"}`,
    });

    const { chapterParams: params } = getQueryParams();
    if (titleId !== "all") params.title_id = titleId;

    chapterService
      .getAll(params)
      .then((response) => {
        setChapters(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toastEmitter(error, "error");
      });
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { objectStatusParams, chapterParams, titleParams } = getQueryParams();

      const titlePromise = titleService.getAll(titleParams);
      const objectStatusPromise = objectStatusService.getAll(objectStatusParams);
      const promises = [titlePromise, objectStatusPromise];

      const results = await Promise.allSettled(promises);
      const { fulfilledResults } = handlePromiseAllSettled(results, toastEmitter);
      const [titleResult, objectStatusResult] = fulfilledResults;

      titleResult && setTitles(titleResult.data);
      objectStatusResult && setObjectStatuses(objectStatusResult.data);

      /* 
          Get chapters of title which name from searchParams.
          Change select control to that title if possible.
       */
      const titleQuery = searchParams.get("title");
      if (titleQuery && titleQuery !== "all" && titleResult?.data?.length > 0) {
        const titleName = replaceAll(titleQuery.toLowerCase(), "-", " ");
        const title = titleResult.data.find((item) => item.title.toLowerCase() === titleName);
        if (title) chapterParams.title_id = title._id;
        setSelectedTitleId({ value: title?._id || "all", label: title?.title || "Tất cả" });
      }

      if (titleResult) {
        chapterService
          .getAll(chapterParams)
          .then((chapterResult) => {
            setChapters(chapterResult.data);
          })
          .catch((error) => {
            toastEmitter(error, "error");
          });
      }
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <Container>
        <Row className={cx("label-wrapper")}>
          <h4 className={cx("label")}>All Chapters of</h4>
          <Select
            options={titleSelectOptions}
            defaultValue={titleSelectOptions[0]}
            searchable
            clearable={false}
            value={selectedTitleId}
            setValue={setSelectedTitleId}
            onChange={handleChangeTitle}
          />
        </Row>
        <FloatingContainer className={cx("data-rows")}>
          <ChapterTable chapters={chapters} objectStatuses={objectStatuses} />
        </FloatingContainer>
      </Container>
      <Toast {...toastOptions} />
      {loading && <Loading />}
    </>
  );
}

export default Chapters;
