import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import CardList from "components/CardList";
import { BannerSlider, NoData } from "features";
import { Container } from "react-bootstrap";
import { searchTitle } from "services/title";
import Calendar from "./assets/images/icons8-new-year-calendar-24.png";
import styles from "./assets/styles/Weekly.module.scss";
import DaysOfWeek from "./components/DaysOfWeek";

const cx = classNames.bind(styles);

function Weekly() {
  const COMIC_PER_PAGE = 15;
  const today = new Date().getDay();
  const [limit, setLimit] = useState(COMIC_PER_PAGE);

  const [dayFilter, setDayFilter] = useState(() => {
    switch (today) {
      case 0:
        return "CN";
      case 1:
        return "T2";
      case 2:
        return "T3";
      case 3:
        return "T4";
      case 4:
        return "T5";
      case 5:
        return "T6";
      case 6:
        return "T7";
      default:
        return "T2";
    }
  });
  const { titles, setReFetch } = searchTitle("status", dayFilter);

  useEffect(() => {
    const handleScroll = () => {
      const cardsContainerHeight =
        document.querySelector(".cards-content")?.offsetHeight;

      window.scrollY >= cardsContainerHeight + 150 &&
        setLimit((prev) => {
          setLimit(prev + COMIC_PER_PAGE);
        });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dayFilter]);

  const handleDayClick = (day) => {
    setDayFilter(day);
    setLimit(COMIC_PER_PAGE);
    setReFetch(true);
  };

  const slider =
    titles.length > 0
      ? titles.slice(0, 10).map((title) => {
          return title.cover;
        })
      : [];

  return (
    <div className={cx("weekly-page")}>
      <div className={cx("slider")}>
        {titles && <BannerSlider images={slider} />}
      </div>
      <div className={cx("notice-wrapper")}>
        <Container>
          <img src={Calendar} alt="Calendar" />
          <span>Chương mới sẽ được cập nhật mỗi tuần theo lịch!</span>
        </Container>
      </div>
      <DaysOfWeek
        cx={cx}
        handleDayClick={handleDayClick}
        date={{
          day: dayFilter,
          today,
        }}
      />
      {titles ? (
        <Container className="cards-content">
          <CardList data={titles.slice(0, limit)} col={{ md: 20 }} />
        </Container>
      ) : (
        <NoData>
          <h5>Không có dữ liệu để hiển thị</h5>
        </NoData>
      )}
    </div>
  );
}

export default Weekly;
