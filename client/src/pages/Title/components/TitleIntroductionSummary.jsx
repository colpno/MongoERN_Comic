import classNames from "classnames/bind";
import { Button } from "components/index.jsx";
import { Popup } from "features/index.jsx";
import { usePopup } from "hooks/index.jsx";
import PropTypes from "prop-types";
import styles from "../styles/Introduction.module.scss";

const cx = classNames.bind(styles);
const SUMMARY_READ_LESS_LIMIT = 135;

function TitleIntroductionSummary({ summary }) {
  const { popup, triggerPopup } = usePopup({
    isTriggered: false,
    title: "Mô tả",
    content: (
      <div className={cx("popup-summary")}>
        <span>{summary}</span>
      </div>
    ),
  });

  return (
    <>
      {summary.slice(0, summary.slice(0, SUMMARY_READ_LESS_LIMIT).lastIndexOf(" "))}
      {summary.length >= SUMMARY_READ_LESS_LIMIT && (
        <>
          <span>... </span>
          <Button text className={cx("more")} onClick={() => triggerPopup(true)}>
            Xem thêm
          </Button>
        </>
      )}
      <Popup data={popup} trigger={triggerPopup} />
    </>
  );
}

TitleIntroductionSummary.propTypes = {
  summary: PropTypes.string.isRequired,
};

export default TitleIntroductionSummary;
