import classNames from "classnames/bind";
import { useGetTitle } from "hooks/index.jsx";
import { setTitle } from "libs/redux/slices/title.slice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "../styles/Title.module.scss";
import TitleContentBody from "./TitleContentBody";
import TitleIntroduction from "./TitleIntroduction.jsx";

const cx = classNames.bind(styles);

function TitleContent() {
  const dispatch = useDispatch();
  const { titleId } = useParams();
  const { data: title } = useGetTitle({
    params: {
      _id: titleId,
      _embed: JSON.stringify([
        { collection: "approved_status_id", fields: "-_id code", match: { code: "apd" } },
        { collection: "status_id", fields: "-_id code", match: { code: "vis" } },
      ]),
    },
    isPrivate: false,
  });
  const backgroundImageCSS = {
    backgroundImage: `url(${title?.cover?.source})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 360px",
    filter: "blur(4px)",
    height: "360px",
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
  };

  useEffect(() => {
    if (title) {
      dispatch(setTitle(title));
    }
  }, [title]);

  return (
    <main className={cx("title-page")}>
      <div style={backgroundImageCSS} className={cx("background-image")} />
      <div className={cx("title-page__wrapper")}>
        <TitleIntroduction />
        <TitleContentBody />
      </div>
    </main>
  );
}

export default TitleContent;
