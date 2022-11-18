import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import classNames from "classnames/bind";

import Footer from "layouts/components/Footer";
import Header from "layouts/components/Header";
import { topSales, wallet } from "assets/images";
import styles from "./LoginLayout.module.scss";

const cx = classNames.bind(styles);

function LoginLayout({ children }) {
  const conveniences = [
    {
      icon: topSales,
      mainText: "Đăng ký tích điểm và nhân ưu đãi",
      subText:
        "Nhanh chóng, tiện lợi và an toàn. Đăng ký liền tay, rinh ngay quyền lợi.",
    },
    {
      icon: wallet,
      mainText: "Tiện ích thông minh",
      subText:
        "Check-in và kiểm tra hóa đơn thanh toán kể cả khi không có kết nối mạng. Hoàn tiền nhanh gọn. Đổi lịch dễ dàng.",
    },
    {
      icon: wallet,
      mainText: "Thanh toán đơn giản",
      subText: "Phương thức than toán tiện lợi, an toà",
    },
    {
      icon: wallet,
      mainText: "Ưu đãi mỗi ngày",
      subText:
        "Nhận thông báo ưu đãi từ Luxstay khi có kế hoạch du lịch để lựa chọn và đặt ngay cho mình một chỗ ở phù hợp, tiện nghi với giá tốt nhất.",
    },
  ];

  return (
    <>
      <Header />
      <main className={cx("content", "skip-header")}>
        <Container>
          <Row>
            <Col lg={8}>
              <Row className={cx("conveniences")}>
                {conveniences.map((convenience, index) => (
                  <Col xs={6} key={index} className={cx("convenience-wrapper")}>
                    <div className={cx("convenience")}>
                      <div className={cx("icon")}>
                        <img src={convenience.icon} alt="Icon" />
                      </div>
                      <div className={cx("text")}>
                        <strong>{convenience.mainText}</strong>
                        <span>{convenience.subText}</span>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col lg={4}>{children}</Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </>
  );
}

LoginLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.node.isRequired,
  ]).isRequired,
};

export default LoginLayout;
