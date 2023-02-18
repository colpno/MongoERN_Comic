import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";
import { Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import { Popup, ProgressCircle } from "features";
import { useDelete, useToast, useUpdate } from "hooks";
import { titleService } from "services";
import TitleManagementCards from "./components/TitleManagementCards";
import TitlesTable from "./components/TitlesTable";
import styles from "./styles/Titles.module.scss";

const cx = classNames.bind(styles);

function Titles() {
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const [progress, setProgress] = useState(0);
  const [titles, setTitles] = useState([]);
  const hasData = titles?.length > 0;

  const handleDelete = (titleId) => {
    titleService
      .delete(titleId, setProgress)
      .then(() => {
        const newTitles = titles.filter((title) => title._id !== titleId);
        setTitles(newTitles);
        setProgress(0);
      })
      .catch((error) => {
        toastEmitter(error, "error");
        setProgress(0);
      });
  };

  const handleUpdate = (titleId, data) => {
    titleService
      .update(
        titleId,
        {
          newValues: data.updated,
        },
        setProgress
      )
      .then((response) => {
        const newTitles = titles.map((title) => (title._id === titleId ? response.data : title));
        setTitles(newTitles);
        setProgress(0);
      })
      .catch((error) => {
        toastEmitter(error, "error");
        setProgress(0);
      });
  };

  useEffect(() => {
    titleService
      .getAll({}, true)
      .then((response) => setTitles(response.data))
      .catch((error) => toastEmitter(error, "error"));
  }, []);

  const {
    deletedItem,
    setDeletedItem,
    popup: deletePopup,
    setPopup: setDeletePopup,
  } = useDelete(() => handleDelete(deletedItem.titleId));

  const {
    updateInfo,
    popup: updatePopup,
    setUpdateInfo,
    setShowForm,
    setPopup: setUpdatePopup,
  } = useUpdate(() => handleUpdate(updateInfo.selected.guid, updateInfo.updated));

  const titleStatuses = useMemo(() => {
    return titles.reduce(
      (obj, title) => {
        switch (title.releaseDay) {
          case "paused":
            return { ...obj, paused: obj.paused + 1 };
          case "finished":
            return { ...obj, finished: obj.finished + 1 };
          default:
            return { ...obj, continuing: obj.continuing + 1 };
        }
      },
      { continuing: 0, paused: 0, finished: 0, total: titles.length }
    );
  }, [titles]);

  return (
    <>
      <Container>
        {hasData && (
          <>
            <Row>
              <TitleManagementCards
                totalTitles={titles.length}
                continuing={titleStatuses.continuing}
                paused={titleStatuses.paused}
                finished={titleStatuses.finished}
              />
            </Row>
            <Row>
              <h4 className={cx("label")}>All Titles</h4>
            </Row>
            <FloatingContainer className={cx("table-wrapper")}>
              <TitlesTable
                titles={titles}
                setPopup={setDeletePopup}
                setDeletedItem={setDeletedItem}
                setUpdate={setUpdateInfo}
                setShowForm={setShowForm}
              />
            </FloatingContainer>
          </>
        )}
      </Container>
      <Popup yesno popup={deletePopup} setPopup={setDeletePopup} />
      <Popup yesno popup={updatePopup} setPopup={setUpdatePopup} />
      <Toast {...toastOptions} />
      <ProgressCircle percentage={progress} />
    </>
  );
}

export default Titles;
