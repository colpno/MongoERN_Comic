import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";

import { CardList } from "components";
import { DAYS_OF_WEEK } from "constants/time.constant";
import { BannerSlider, NoData } from "features";
import { useInfinitePagination } from "hooks";
import { Container } from "react-bootstrap";
import { titleService } from "services";
import Calendar from "./assets/images/icons8-new-year-calendar-24.png";
import styles from "./assets/styles/Weekly.module.scss";
import DaysOfWeek from "./components/DaysOfWeek";

const cx = classNames.bind(styles);

function Weekly() {
  const TITLES_PER_PAGE = 15;
  const today = new Date().getDay();
  const [titles, setTitles] = useState([]);
  const { pagination, setPaginationTotal, setLastElement } =
    useInfinitePagination(TITLES_PER_PAGE);
  const [limit, setLimit] = useState(TITLES_PER_PAGE);

  const getShortDayLabel = (numberInDay) => {
    return DAYS_OF_WEEK.find((day) => day.number === numberInDay).shortLabel;
  };

  const [dayFilter, setDayFilter] = useState(getShortDayLabel(today));

  const slider = useMemo(
    () =>
      titles?.slice(0, 10).map((title) => {
        return { image: title.cover.source, link: `/comic/title/${title._id}` };
      }),
    [titles]
  );

  const fetchTitles = (selectedDay) => {
    titleService
      .getAll(
        {
          release_day: selectedDay,
          _page: pagination.page,
          _limit: pagination.limit,
        },
        false
      )
      .then((response) => {
        setTitles(response.data);
        setPaginationTotal(response.paginate.total);
      })
      .catch((error) => console.error(error));
  };

  const scrollFetchTitles = (selectedDay) => {
    titleService
      .getAll(
        {
          releaseDay: selectedDay,
          _page: pagination.page,
          _limit: pagination.limit,
        },
        false
      )
      .then((response) => {
        setTitles((prev) => [...prev, ...response.data]);
      })
      .catch((error) => console.error(error));
  };

  const handleDayClick = (day) => {
    setDayFilter(day);
    setLimit(TITLES_PER_PAGE);
    fetchTitles(day);
  };

  useEffect(() => {
    fetchTitles(dayFilter);
  }, []);

  useEffect(() => {
    scrollFetchTitles(dayFilter);
  }, [pagination.page]);

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
      {titles.length > 0 ? (
        <Container className="cards-content">
          <CardList
            wrap
            data={titles.slice(0, limit)}
            col={{ xs: 6, sm: 4, md: 20 }}
          />
          <div ref={setLastElement} />
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
