import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import LineChart from "features/LineChart/LineChart";
import NoData from "features/NoData";
import SelectorContainer from "./components/SelectorContainer";
import styles from "./styles/Statistic.module.scss";

const cx = classNames.bind(styles);

function Statistic() {
  const titles = useSelector((state) => state.myTitles.titles);
  const hasData = titles.length > 0;

  const monthsLabel = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const handleTitleChange = (value) => {
    console.log(value);
  };

  const handleChapterChange = (value) => {
    console.log(value);
  };

  return (
    <Container className={cx("wrapper")}>
      {hasData ? (
        <Row>
          <Col md={8}>
            <SelectorContainer
              cx={cx}
              titleLabel="Truyện"
              options={[
                { value: "1", label: "Thang 1" },
                { value: "2", label: "Thang 2 asdoias joaisj " },
              ]}
              handleChange={handleTitleChange}
            />
            <Row>
              <LineChart
                labels={monthsLabel}
                datasets={[
                  {
                    label: "Lượt xem",
                    data: [
                      153, 159, 158, 109, 62, 42, 200, 41, 14, 33, 41, 112,
                    ],
                    backgroundColor: "red",
                    borderColor: "lightblue",
                  },
                  {
                    label: "Lượt thích",
                    data: [
                      71, 173, 298, 123, 253, 290, 237, 376, 229, 275, 327, 90,
                    ],
                    backgroundColor: "blue",
                    borderColor: "pink",
                  },
                ]}
              />
            </Row>
          </Col>
          <Col md={4}>
            <SelectorContainer
              cx={cx}
              titleLabel="Chương"
              options={[
                { value: "1", label: "Thang 1" },
                { value: "2", label: "Thang 2 asdoias joaisj " },
              ]}
              handleChange={handleChapterChange}
            />
            <Row>
              <LineChart
                labels={monthsLabel}
                datasets={[
                  {
                    label: "Lượt xem",
                    data: [
                      153, 159, 158, 109, 62, 42, 200, 41, 14, 33, 41, 112,
                    ],
                    backgroundColor: "red",
                    borderColor: "lightblue",
                  },
                ]}
              />
            </Row>
            <Row>
              <LineChart
                labels={monthsLabel}
                datasets={[
                  {
                    label: "Lượt thích",
                    data: [
                      71, 173, 298, 123, 253, 290, 237, 376, 229, 275, 327, 90,
                    ],
                    backgroundColor: "blue",
                    borderColor: "pink",
                  },
                ]}
              />
            </Row>
          </Col>
        </Row>
      ) : (
        <NoData>
          <h5>Hiện tại chưa có dữ liệu để thống kê!</h5>
          <small>Vui lòng quay lại sau nhé!</small>
        </NoData>
      )}
    </Container>
  );
}

export default Statistic;
