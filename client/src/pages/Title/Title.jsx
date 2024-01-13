import classNames from "classnames/bind";
import moment from "moment";
import { useEffect, useMemo, useReducer } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { TITLE_PAGE_CHAPTERS_PER_PAGE } from "constants/paginate.constant";
import { socket } from "context/socketContext";
import { Comment, Loading, NoData, Pagination, Popup, Recommend } from "features";
import { usePagination, usePopup, useToast } from "hooks";
import { setCommentPlace } from "libs/redux/slices/comment.slice";
import { setGenresOfTitle, setTitle as setStoreTitle } from "libs/redux/slices/title.slice";
import { setUser } from "libs/redux/slices/user.slice";
import {
  chapterService,
  chapterTransactionService,
  followService,
  genreService,
  titleService,
} from "services";
import { handlePromiseAllSettled } from "utils";
import { circleC, circleP } from "../../assets/images";
import { ComicChapters, Introduction, PurchaseBox, TitleAbout } from "./components";
import styles from "./styles/Title.module.scss";

const cx = classNames.bind(styles);

function Title() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { titleId } = useParams();
  const user = useSelector((state) => state.user.user);
  const { pagination, setPagination, setPaginationTotal } = usePagination(
    TITLE_PAGE_CHAPTERS_PER_PAGE
  );
  const { Toast, options, toastEmitter } = useToast();
  const [state, updateState] = useReducer((prev, next) => ({ ...prev, ...next }), {
    title: {},
    chapters: [],
    genres: [],
    purchasedHistories: [],
    purchaseBoxInfo: { isToggle: false, chapter: {} },
    isDESCSort: false,
    loading: false,
  });
  const hasTitle = Object.keys(state.title).length > 0;
  const haveChapters = state.chapters.length > 0;
  const { popup, setPopup, triggerPopup } = usePopup();
  const backgroundImageCSS = hasTitle && {
    backgroundImage: `url(${state.title.cover.source})`,
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
      { amount: state.title.coin, icon: circleC, method: "coin" },
      { amount: state.title.point, icon: circleP, method: "point" },
    ],
    [state.title]
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
      updateState({ loading: true });

      const rentList = ["rent ticket"];
      const expiredAt = rentList.includes(method)
        ? moment().add(5, "days").toISOString()
        : undefined;

      chapterTransactionService
        .add(titleId, chapterId, method, amount, expiredAt)
        .then((response) => {
          dispatch(setUser(response.data.user));
          toastEmitter(response.message, "success");
          updateState({
            purchasedHistories: [...state.purchasedHistories, response.data.transaction],
            loading: false,
          });
        })
        .catch((error) => {
          toastEmitter(error, "error");
          updateState({ loading: false });
        });
    }
  };

  const handleClosePurchaseBox = () => {
    updateState({
      purchaseBoxInfo: { ...state.purchaseBoxInfo, isToggle: false },
    });
  };

  const handleOpenPurchaseBox = (chapter) => {
    updateState({
      purchaseBoxInfo: { isToggle: true, chapter },
    });
  };

  const fetchChapters = () => {
    updateState({
      loading: true,
    });
    const chapterApiParams = {
      title_id: titleId,
      _sort: "order",
      _order: state.isDESCSort ? "asc" : "desc",
      _page: pagination.page,
      _limit: pagination.limit,
    };

    chapterService
      .getAll(chapterApiParams, false)
      .then((response) => {
        setPaginationTotal(response.paginate.total);
        updateState({
          chapters: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        toastEmitter(error, "error");
        updateState({
          loading: false,
        });
      });
  };

  const handleSorting = () => {
    updateState({
      IsDESCSort: !state.IsDESCSort,
    });
    fetchChapters();
  };

  const handleFollow = (titleID) => {
    followService
      .add(titleID)
      .then(() => {
        toastEmitter(`Bạn đã theo dõi truyện ${state.title.title}`, "success");
      })
      .catch((error) => {
        toastEmitter(error, "error");
      });
  };

  useEffect(() => {}, [state.title]);

  useEffect(() => {
    if (socket) {
      socket.emit("join-title", titleId);
    }
  }, [socket]);

  useEffect(() => {
    dispatch(setCommentPlace(`title_${titleId}`));
  }, []);

  useEffect(() => {
    (() => {
      updateState({ loading: true });
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
      const titleParams = {
        _id: titleId,
        _embed: JSON.stringify([
          { collection: "approved_status_id", fields: "-_id code", match: { code: "apd" } },
          { collection: "status_id", fields: "-_id code", match: { code: "vis" } },
        ]),
      };

      titleService
        .getOne(titleParams, false)
        .then(async (titleResult) => {
          const genreParams = {
            name_in: titleResult.data.genres,
            _fields: "name",
          };
          const chaptersPromise = chapterService.getAll(chapterApiParams, false);
          const genresPromise = genreService.getAll(genreParams);
          const chapterTransactionPromise = chapterTransactionService.getAll(
            chapterTranParams,
            false
          );
          const promises = [chaptersPromise, genresPromise, chapterTransactionPromise];

          const results = await Promise.allSettled(promises);
          const { fulfilledResults } = handlePromiseAllSettled(results, toastEmitter);
          const [chaptersResult, genresResult, chapterTransactionResult] = fulfilledResults;

          const resultData = {
            title: titleResult.data,
          };
          dispatch(setGenresOfTitle(titleResult.data.genres));
          dispatch(setStoreTitle(titleResult.data));
          if (genresResult) {
            resultData.genres = genresResult.data;
          }
          if (chaptersResult) {
            resultData.chapters = chaptersResult.data;
            setPaginationTotal(chaptersResult.paginate.total);
          }
          if (chapterTransactionResult) {
            resultData.purchasedHistories = chapterTransactionResult.data;
          }
          updateState({
            ...resultData,
            loading: false,
          });
        })
        .catch(() => {
          updateState({ loading: false });
          navigate("/not-found");
        });
    })();
  }, [titleId, user]);

  return (
    <>
      <main className={cx("title-page")}>
        {hasTitle && <div style={backgroundImageCSS} className={cx("background-image")} />}
        <div className={cx("title-page__wrapper")}>
          {hasTitle && (
            <Introduction
              title={state.title}
              genres={state.genres}
              firstChapter={state.chapters.length > 0 ? state.chapters[0]._id : "#"}
              setPopup={setPopup}
              handleFollow={handleFollow}
            />
          )}
          <Container fluid="md" className={cx("title-page__wrapper__content")}>
            {hasTitle && <TitleAbout title={state.title} user={user} setPopup={setPopup} />}
            <section className={cx("chapters")}>
              {hasTitle && haveChapters ? (
                <ComicChapters
                  title={state.title}
                  chapters={state.chapters}
                  user={user}
                  isDESCSorting={state.isDESCSort}
                  handleSorting={handleSorting}
                  handleOpenPurchaseBox={handleOpenPurchaseBox}
                  purchasedHistories={state.purchasedHistories}
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
      {state.purchaseBoxInfo.isToggle && (
        <PurchaseBox
          chapter={state.purchaseBoxInfo.chapter}
          payments={paymentChoices}
          handleSubmit={handlePurchase}
          handleClose={handleClosePurchaseBox}
        />
      )}
      {popup.isShown && <Popup data={popup} setShow={triggerPopup} />}
      {state.loading && <Loading />}
      <Toast {...options} />
    </>
  );
}

export default Title;
