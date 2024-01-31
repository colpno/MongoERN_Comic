import classNames from "classnames/bind";
import { TITLE_PAGE_CHAPTERS_PER_PAGE } from "constants/paginate.constant";
import { socket } from "context/socketContext";
import { Comment, NoData, Pagination, Popup, Recommend } from "features";
import { emitToast } from "features/Toast.jsx";
import {
  useAddChapterTransaction,
  useAddFollow,
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

  const handlePurchase = async (payment, chapter) => {
    const { amount, method } = payment;
    const { _id: chapterId } = chapter;

    if (!isLoggingIn) {
      emitToast("Bạn cần phải đăng nhập để thực thiện chức năng", "error");
      return;
    }

    if (checkCanPurchase(method, amount)) {
      const rentList = ["rent ticket"];
      const expiredAt = rentList.includes(method) ? moment().add(5, "days").toISOString() : null;

      const response = await addChapterTransaction({
        titleId,
        chapterId,
        method,
        amount,
        expiredAt,
      }).unwrap();

      dispatch(setUser(response.data.user));
      updateState({
        purchasedHistories: [...state.purchasedHistories, response.data.transaction],
      });
    } else {
      emitToast("Không đủ để thực hiện chức năng", "error");
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
        _embed: JSON.stringify([{ collection: "chapter_id", fields: "_id" }]),
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

      const getChapterTransactionResponse = await getChapterTransactions({
        params: chapterTranParams,
        isPrivate: !!user._id,
      }).unwrap();

      setPaginationTotal(getChaptersResponse.pagination.total);
      updateState({
        ...result,
        chapters: getChaptersResponse.data,
        purchasedHistories: getChapterTransactionResponse,
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
