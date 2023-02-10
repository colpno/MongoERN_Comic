import classNames from "classnames/bind";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { TITLE_PAGE_CHAPTERS_PER_PAGE } from "constants/paginate.constant";
import { socket } from "context/socketContext";
import { Comment, Loading, NoData, Pagination, Popup, Recommend } from "features";
import { usePagination, useToast } from "hooks";
import { setCommentPlace } from "libs/redux/slices/comment.slice";
import { setGenresOfTitle, setTitle as setStoreTitle } from "libs/redux/slices/title.slice";
import { setUser } from "libs/redux/slices/user.slice";
import { chapterService, chapterTransactionService, followService, titleService } from "services";
import { handlePromiseAllSettled } from "utils";
import { circleC, circleP } from "../../assets/images";
import { ComicChapters, Introduction, PurchaseBox, TitleAbout } from "./components";
import styles from "./styles/Title.module.scss";

const cx = classNames.bind(styles);

function Title() {
  const dispatch = useDispatch();
  const { titleId } = useParams();
  const user = useSelector((state) => state.user.user);
  const [title, setTitle] = useState({});
  const [chapters, setChapters] = useState([]);
  const { pagination, setPagination, setPaginationTotal } = usePagination(
    TITLE_PAGE_CHAPTERS_PER_PAGE
  );
  const { Toast, options, toastEmitter } = useToast();
  const [isDESCSorting, setIsDESCSorting] = useState(false);
  const [purchasedHistories, setPurchasedHistories] = useState([]);
  const [purchaseBoxInfo, setPurchaseBoxInfo] = useState({ isToggle: false, chapter: {} });
  const [loading, setLoading] = useState(false);
  const hasTitle = Object.keys(title).length > 0;
  const haveChapters = chapters.length > 0;
  const [popup, setPopup] = useState({
    trigger: false,
    title: "",
    content: "",
  });
  const backgroundImageCSS = hasTitle && {
    backgroundImage: `url(${title.cover.source})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 360px",
    filter: "blur(4px)",
    height: "360px",
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
  };
  const paymentChoices = useMemo(
    () => [
      { amount: title.coin, icon: circleC, method: "coin" },
      { amount: title.point, icon: circleP, method: "point" },
    ],
    [title]
  );

  const checkCanPurchase = (method, amount) => {
    switch (method.toLowerCase()) {
      case "coin":
        return user.coin > amount;
      case "point":
        return user.point > amount;
      case "rent ticket":
        return user.ticket_for_renting > amount;
      case "purchase ticket":
        return user.ticket_for_buying > amount;
      default:
        return false;
    }
  };

  const handlePurchase = ({ icon, ...others }, chapter) => {
    const { amount, method } = others;
    const { _id: chapterId } = chapter;

    if (!!amount && !!method && !!chapterId && checkCanPurchase(method, amount)) {
      setLoading(true);

      const rentList = ["rent ticket"];
      const expiredAt = rentList.includes(method)
        ? moment().add(5, "days").toISOString()
        : undefined;

      chapterTransactionService
        .add(titleId, chapterId, method, amount, expiredAt)
        .then((response) => {
          dispatch(setUser(response.data.user));
          setPurchasedHistories((prev) => [...prev, response.data.transaction]);
          toastEmitter(response.message, "success");
          setLoading(false);
        })
        .catch((error) => {
          toastEmitter(error, "error");
          setLoading(false);
        });
    }
  };

  const handleClosePurchaseBox = () => {
    setPurchaseBoxInfo((prev) => ({ ...prev, isToggle: false }));
  };

  const handleOpenPurchaseBox = (chapter) => {
    setPurchaseBoxInfo({
      isToggle: true,
      chapter,
    });
  };

  const fetchChapters = () => {
    setLoading(true);
    const chapterApiParams = {
      title_id: titleId,
      _sort: "order",
      _order: isDESCSorting ? "asc" : "desc",
      _page: pagination.page,
      _limit: pagination.limit,
    };

    chapterService
      .getAll(chapterApiParams, false)
      .then((response) => {
        setChapters(response.data);
        setPaginationTotal(response.paginate.total);
        setLoading(false);
      })
      .catch((error) => {
        toastEmitter(error, "error");
        setLoading(false);
      });
  };

  const handleSorting = () => {
    setIsDESCSorting((prev) => !prev);
    fetchChapters();
  };

  const handleFollow = (titleID) => {
    followService
      .add(titleID)
      .then(() => {
        toastEmitter(`Bạn đã theo dõi truyện ${title.title}`, "success");
      })
      .catch((error) => {
        toastEmitter(error, "error");
      });
  };

  useEffect(() => {
    if (socket) {
      socket.emit("join-title", titleId);
    }
  }, [socket]);

  useEffect(() => {
    dispatch(setCommentPlace(`title_${titleId}`));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const chapterApiParams = {
        title_id: titleId,
        _sort: "order",
        _order: "asc",
        _page: pagination.page,
        _limit: pagination.limit,
      };
      const chapterTranParams = {
        title_id: titleId,
        _embed: JSON.stringify([{ collection: "chapter_id", fields: "_id" }]),
      };

      const titlePromise = titleService.getOne(titleId, false);
      const chaptersPromise = chapterService.getAll(chapterApiParams, false);
      const chapterTransactionPromise = chapterTransactionService.getAll(chapterTranParams);
      const promises = [titlePromise, chaptersPromise, chapterTransactionPromise];

      const results = await Promise.allSettled(promises);
      const { fulfilledResults } = handlePromiseAllSettled(results, toastEmitter);
      const [titleResult, chaptersResult, chapterTransactionResult] = fulfilledResults;

      if (titleResult) {
        setTitle(titleResult.data);
        dispatch(setGenresOfTitle(titleResult.data.genres));
        dispatch(setStoreTitle(titleResult.data));
      }
      if (chaptersResult) {
        setChapters(chaptersResult.data);
        setPaginationTotal(chaptersResult.paginate.total);
      }
      if (chapterTransactionResult) {
        setPurchasedHistories(chapterTransactionResult.data);
      }
      setLoading(false);
    };
    fetchData();
  }, [titleId, user]);

  return (
    <>
      <main className={cx("title-page")}>
        {hasTitle && <div style={backgroundImageCSS} className={cx("background-image")} />}
        <div className={cx("title-page__wrapper")}>
          {hasTitle && (
            <Introduction
              title={title}
              firstChapter={chapters.length > 0 ? chapters[0]._id : "#"}
              setPopup={setPopup}
              handleFollow={handleFollow}
            />
          )}
          <Container fluid="md" className={cx("title-page__wrapper__content")}>
            {hasTitle && <TitleAbout title={title} user={user} setPopup={setPopup} />}
            <section className={cx("chapters")}>
              {hasTitle && haveChapters ? (
                <ComicChapters
                  title={title}
                  chapters={chapters}
                  user={user}
                  isDESCSorting={isDESCSorting}
                  handleSorting={handleSorting}
                  handleOpenPurchaseBox={handleOpenPurchaseBox}
                  purchasedHistories={purchasedHistories}
                />
              ) : (
                <NoData>
                  <h6>Không có chương nào để hiển thị!</h6>
                </NoData>
              )}
              {haveChapters && <Pagination pagination={pagination} setPagination={setPagination} />}
            </section>
          </Container>
          <Container fluid="md">
            <Comment />
          </Container>
          <Recommend />
        </div>
      </main>
      {purchaseBoxInfo.isToggle && (
        <PurchaseBox
          chapter={purchaseBoxInfo.chapter}
          payments={paymentChoices}
          handleSubmit={handlePurchase}
          handleClose={handleClosePurchaseBox}
        />
      )}
      <Popup popup={popup} setPopup={setPopup} />
      {loading && <Loading />}
      <Toast {...options} />
    </>
  );
}

export default Title;
