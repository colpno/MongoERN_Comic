import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";

import chapterApi from "api/chapterApi";
import Button from "components/Button";
import GridTable from "components/GridTable";
import NoData from "features/NoData";
import Pagination from "features/Pagination";
import Popup from "features/Popup";
import { getTitleByID } from "services/titleServices";
import styles from "./assets/styles/Chapters.module.scss";
import ChaptersTable from "./components/ChapterTable";
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
  const [chapters, setChapters] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isConfirm, setIsConfirm] = useState(false);
  const [popup, setPopup] = useState({
    trigger: false,
    isConfirm: false,
    title: "",
    content: "",
  });
  const hasData = chapters.length > 0;

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
  });

  const onPageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await chapterApi.getAll(titleId, {
          _limit: pagination.limit,
          _page: pagination.page,
        });
        setPagination({ ...pagination, total: response.pagination.total });
        setChapters(response.data);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchChapters();
  }, [pagination.page]);

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
          <>
            <GridTable
              head={[
                { label: "Thứ tự", sm: 1 },
                { label: "Ảnh bìa" },
                { label: "Tên chương" },
                { label: "Ngày tạo" },
                { label: "Ngày cập nhật" },
                { label: "Đặt lịch" },
                { label: "Trạng thái" },
                { label: "" },
              ]}
            >
              <ChaptersTable
                title={title}
                chapters={chapters}
                popup={popup}
                setPopup={setPopup}
              />
            </GridTable>
            <Pagination pagination={pagination} onPageChange={onPageChange} />
          </>
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
