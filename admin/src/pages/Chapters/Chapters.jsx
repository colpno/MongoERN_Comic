import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";

import { FloatingContainer, Select } from "components";
import { Loading, Popup } from "features";
import { usePopup, useToast } from "hooks";
import { approvedStatusService, chapterService, titleService } from "services";
import { handlePromiseAllSettled, replaceAll } from "utils";
import ChapterManagementCards from "./components/ChapterManagementCards";
import ChapterTable from "./components/ChapterTable";
import styles from "./styles/Chapters.module.scss";

const cx = classNames.bind(styles);

const getQueryParams = () => {
  const titleParams = {
    _fields: "title",
  };

  const chapterParams = {
    _embed: JSON.stringify([
      { collection: "approved_status_id", fields: "code status color" },
      { collection: "status_id", field: "-_id status" },
    ]),
  };

  const approvedStatusParams = {
    _fields: "code status color",
  };

  return {
    titleParams,
    chapterParams,
    approvedStatusParams,
  };
};

function Chapters() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const [chapters, setChapters] = useState([]);
  const [titles, setTitles] = useState([]);
  const [approvedStatuses, setApprovedStatuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTitleId, setSelectedTitleId] = useState({ value: "all", label: "Tất cả" });
  const { popup, setPopup, triggerPopup } = usePopup({
    type: "confirm",
  });

  const titleSelectOptions = useMemo(() => {
    return [
      { value: "all", label: "Tất cả" },
      ...titles.map((title) => {
        return { value: title._id, label: title.title };
      }),
    ];
  }, [titles]);

  const approvedTitles = useMemo(() => {
    return chapters.reduce(
      (result, chapter) => {
        switch (chapter.approved_status_id.code) {
          case "wai":
            return {
              ...result,
              waiting: result.waiting + 1,
            };
          case "apd":
            return {
              ...result,
              accepted: result.accepted + 1,
            };
          case "rej":
            return {
              ...result,
              rejected: result.rejected + 1,
            };
          default:
            return { ...result };
        }
      },
      {
        waiting: 0,
        accepted: 0,
        rejected: 0,
      }
    );
  }, [chapters]);

  const handleUpdate = (editedInfo) => {
    const { _id, ...fields } = editedInfo[0];

    setPopup({
      title: "Cập nhật tài khoản",
      content: "Bạn có chắc chắn muốn thay đổi không?",
      isShown: true,
      onConfirm: () => {
        chapterService
          .update(_id, fields)
          .then((response) => {
            setChapters((prev) =>
              prev.map((item) => (item._id === _id ? { ...response.data } : item))
            );
            toastEmitter(response.message);
          })
          .catch((error) => toastEmitter(error));
      },
    });
  };

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
      const { approvedStatusParams, chapterParams, titleParams } = getQueryParams();

      const titlePromise = titleService.getAll(titleParams);
      const approvedStatusPromise = approvedStatusService.getAll(approvedStatusParams);
      const promises = [titlePromise, approvedStatusPromise];

      const results = await Promise.allSettled(promises);
      const { fulfilledResults } = handlePromiseAllSettled(results, toastEmitter);
      const [titleResult, approvedStatusResult] = fulfilledResults;

      titleResult && setTitles(titleResult.data);
      approvedStatusResult && setApprovedStatuses(approvedStatusResult.data);

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
        <Row>
          <ChapterManagementCards
            totalChapters={chapters.length}
            waiting={approvedTitles.waiting}
            accepted={approvedTitles.accepted}
            rejected={approvedTitles.rejected}
          />
        </Row>
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
          <ChapterTable
            chapters={chapters}
            approvedStatuses={approvedStatuses}
            onRowEditCommit={handleUpdate}
          />
        </FloatingContainer>
      </Container>
      {popup.isShown && <Popup data={popup} setShow={triggerPopup} />}
      <Toast {...toastOptions} />
      {loading && <Loading />}
    </>
  );
}

export default Chapters;
