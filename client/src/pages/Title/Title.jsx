/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { TITLE_PAGE_CHAPTERS_PER_PAGE } from "constants/paginate.constant";
import { socket } from "context/socketContext";
import { Comment, NoData, Pagination, Popup, Recommend } from "features";
import { emitToast } from "features/Toast.jsx";
import {
  useAddChapterTransaction,
  useAddFollow,
  useCheckUseService,
  useLazyGetChapterTransactions,
  useLazyGetChapters,
  useLazyGetGenres,
  useLazyGetTitle,
  usePagination,
  usePopup,
} from "hooks";
import { setCommentPlace } from "libs/redux/slices/comment.slice";
import { setGenresOfTitle, setTitle as setStoreTitle } from "libs/redux/slices/title.slice";
import { setUser } from "libs/redux/slices/user.slice";
import moment from "moment";
import { useEffect, useMemo, useReducer } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { circleC, circleP } from "../../assets/images";
import { ComicChapters, Introduction, PurchaseBox, TitleAbout } from "./components";
import styles from "./styles/Title.module.scss";

const cx = classNames.bind(styles);

function Title() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { titleId } = useParams();
  const { user, isLoggingIn } = useSelector((state) => state.user);
  const { addFollow } = useAddFollow();
  const { get: getChapters } = useLazyGetChapters();
  const { get: getGenres } = useLazyGetGenres();
  const { get: getTitle } = useLazyGetTitle();
  const { get: getChapterTransactions } = useLazyGetChapterTransactions();
  const { add: addChapterTransaction } = useAddChapterTransaction();
  const { pagination, setPagination, setPaginationTotal } = usePagination(
    TITLE_PAGE_CHAPTERS_PER_PAGE
  );
  const [state, updateState] = useReducer((prev, next) => ({ ...prev, ...next }), {
    title: {},
    chapters: [],
    genres: [],
    purchasedHistories: [],
    purchaseBoxInfo: { isToggle: false, chapter: {} },
    isDESCSort: false,
  });
  const hasTitle = Object.keys(state.title).length > 0;
  const haveChapters = state.chapters.length > 0;
  const { popup, setPopup, triggerPopup } = usePopup();
  const backgroundImageCSS = hasTitle && {
    backgroundImage: `url(${state.title.cover?.source})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 360px",
    filter: "blur(4px)",
    height: "360px",
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
  };
  const paymentChoices = useMemo(() => {
    const choices = [{ amount: state.title.coin, icon: circleC, method: "coin" }];
    if (state.title.point !== 0) {
      choices.push({ amount: state.title.point, icon: circleP, method: "point" });
    }
    return choices;
  }, [state.title]);
  const { handleLazyCheck } = useCheckUseService();

  const checkCanPurchase = (method, amount) => {
    let isOK = false;
    switch (method.toLowerCase()) {
      case "coin":
        isOK = user.coin >= amount;
        break;
      case "point":
        isOK = user.point >= amount;
        break;
      case "rent ticket":
        isOK = user.ticket_for_renting >= amount;
        break;
      case "purchase ticket":
        isOK = user.ticket_for_buying >= amount;
        break;
      default:
        isOK = false;
        break;
    }
    !isOK && emitToast("Không đủ để thực hiện chức năng", "error");
    return isOK;
  };

  const handlePurchase = async (payment, chapter) => {
    const { amount, method } = payment;
    const { _id: chapterId } = chapter;

    if (!isLoggingIn) {
      emitToast("Bạn cần phải đăng nhập để thực thiện chức năng", "error");
      return;
    }

    const isPassed = await handleLazyCheck();

    if (checkCanPurchase(method, amount) && isPassed) {
      const rentList = ["rent ticket"];
      const expiredAt = rentList.includes(method) ? moment().add(5, "days").toISOString() : null;

      const response = await addChapterTransaction({
        titleId,
        chapterId,
        method,
        cost: amount,
        expiredAt,
      }).unwrap();

      dispatch(setUser(response.user));
      updateState({
        purchasedHistories: [...state.purchasedHistories, response.transaction],
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

  const fetchChapters = async () => {
    const chapterApiParams = {
      title_id: titleId,
      _sort: {
        order: state.isDESCSort ? 1 : -1,
      },
      _page: pagination.page,
      _limit: pagination.limit,
    };

    const response = await getChapters({ params: chapterApiParams, isPrivate: false }).unwrap();
    setPaginationTotal(response.pagination.total);
    updateState({ chapters: response.data });
  };

  const handleSorting = () => {
    updateState({
      IsDESCSort: !state.IsDESCSort,
    });
    fetchChapters();
  };

  const handleFollow = (titleID) => {
    addFollow(titleID);
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
    (async () => {
      const chapterApiParams = {
        title_id: titleId,
        _sort: {
          order: 1,
        },
        _page: pagination.page,
        _limit: pagination.limit,
      };
      const chapterTranParams = {
        title_id: titleId,
      };
      const titleParams = {
        _id: titleId,
        _embed: JSON.stringify([
          { collection: "approved_status_id", fields: "-_id code", match: { code: "apd" } },
          { collection: "status_id", fields: "-_id code", match: { code: "vis" } },
        ]),
      };
      const result = {};

      try {
        const getTitleResponse = await getTitle({ params: titleParams, isPrivate: false }).unwrap();

        const genreParams = {
          name_in: getTitleResponse.genres,
          _fields: "name",
        };

        result.title = getTitleResponse;
        result.genres = (await getGenres(genreParams).unwrap()) || [];

        dispatch(setGenresOfTitle(getTitleResponse.genres));
        dispatch(setStoreTitle(getTitleResponse));
      } catch (error) {
        navigate("/not-found");
      }

      const getChaptersResponse = await getChapters({
        params: chapterApiParams,
        isPrivate: false,
      }).unwrap();

      if (user._id) {
        chapterTranParams.user_id = user._id;
        const getChapterTransactionResponse = await getChapterTransactions({
          params: chapterTranParams,
          isPrivate: !!user._id,
        }).unwrap();
        result.purchasedHistories = getChapterTransactionResponse;
      }

      setPaginationTotal(getChaptersResponse.pagination.total);
      updateState({
        ...result,
        chapters: getChaptersResponse.data,
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
              firstChapter="1"
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
      <Popup data={popup} trigger={triggerPopup} />
    </>
  );
}

export default Title;
