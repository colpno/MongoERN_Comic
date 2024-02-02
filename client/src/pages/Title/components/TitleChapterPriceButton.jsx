import { CircleC, CircleP } from "assets/images";
import classNames from "classnames/bind";
import { Button } from "components/index.jsx";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import styles from "../styles/ComicChapters.module.scss";

const cx = classNames.bind(styles);

function TitleChapterPriceButton({ isOwned, isFree }) {
  const title = useSelector((state) => state.title.title);
  const isUsePoint = title?.point > 0;
  // const isUseCharge = title.chargeTime > 0;

  if (!title) return <div />;

  if (isOwned) {
    return (
      <Button
        outline
        success
        className={cx("chapters__content__chapter__price__free")}
        element="div"
      >
        Đã sở hữu
      </Button>
    );
  }

  if (isFree) {
    return (
      <Button
        outline
        success
        className={cx("chapters__content__chapter__price__free")}
        element="div"
      >
        Miễn phí
      </Button>
    );
  }

  return (
    <>
      {/* {isUseCharge && (
        <>
          <Button outline success className={cx("chapters__content__chapter__price__charge")}>
            <div className={cx("charge__icon")}>
              <ChargeIcon className={cx("charge-icon")} />
              <span className={cx("charge__icon__label")}>{title.chargeTime}</span>
            </div>
            Mien phi
          </Button>
          <div className={cx("divider")} />
        </>
      )} */}
      {isUsePoint && (
        <>
          <div className={cx("chapters__content__chapter__price__point")}>
            <span>{title.point}</span>
            <CircleP />
          </div>
          <div className={cx("divider")} />
        </>
      )}
      <div className={cx("chapters__content__chapter__price__coin")}>
        <span>{title.coin}</span>
        <CircleC />
      </div>
    </>
  );
}

TitleChapterPriceButton.propTypes = {
  isOwned: PropTypes.bool.isRequired,
  isFree: PropTypes.bool.isRequired,
};

export default TitleChapterPriceButton;
