import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";

import Button from "components/Button";
import { NoData, Popup } from "features";
import ChapterTable from "pages/ChapterManagement/components/ChapterTable";
import { sortChapters } from "services/chapter";
import { getTitleByID } from "services/title";
import styles from "./assets/styles/Chapters.module.scss";
import TitlePart from "./components/TitlePart";

const cx = classNames.bind(styles);

function BtnCreate() {
  return (
    <Button primary to="create" className={cx("chapters__button")}>
      <AiOutlinePlus />
      Thêm chương
    </Button>
  );
}

function Chapters() {
  const { titleId } = useParams();
  const { title } = getTitleByID(titleId);
  const { chapters, pagination, setPagination, sorting } =
    sortChapters(titleId);
  // const [isConfirm, setIsConfirm] = useState(false);
  const [popup, setPopup] = useState({
    trigger: false,
    isConfirm: false,
    title: "",
    content: "",
  });
  const hasData = chapters.length > 0;

  useEffect(() => {
    // console.log(popup.isConfirm);
  }, [popup.isConfirm]);

  return (
    <>
      <Container className={cx("chapters")}>
        <Row className={cx("chapters__header")}>
          <h3>Danh sách chương</h3>
        </Row>
        {Object.keys(title).length !== 0 && (
          <TitlePart title={title} popup={popup} setPopup={setPopup} />
        )}
        <Row className={cx("chapters__general")}>
          <Col md={8} className={cx("chapters__general__box")}>
            <span className={cx("chapters__general__total")}>
              Tổng số chương:{" "}
              <span className={cx("chapters__general__total__number")}>
                {pagination.total}
              </span>
            </span>
          </Col>
          <Col md={4} className={cx("chapters__general__box")}>
            {hasData && <BtnCreate />}
          </Col>
        </Row>
        {hasData ? (
          <ChapterTable
            chapters={chapters}
            popup={popup}
            setPopup={setPopup}
            pagination={pagination}
            setPagination={setPagination}
            sorting={sorting}
          />
        ) : (
          <NoData>
            <h5>Hiện tại truyện chưa có chương nào!</h5>
            <BtnCreate />
          </NoData>
        )}
      </Container>
      <Popup yesno popup={popup} setPopup={setPopup} />
    </>
  );
}

export default Chapters;
