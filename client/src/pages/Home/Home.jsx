import classNames from "classnames/bind";
import { Container } from "react-bootstrap";

import { Fullsize } from "assets/images";
import { BannerSlider } from "features";
import styles from "pages/Home/assets/styles/Home.module.scss";
import { ComicSection, Notification } from "./components";

const cx = classNames.bind(styles);

function Home() {
  const bannerImages = [
    { id: 1, src: Fullsize },
    { id: 2, src: Fullsize },
    { id: 3, src: Fullsize },
    { id: 4, src: Fullsize },
    { id: 5, src: Fullsize },
  ];

  return (
    <main className={cx("home")}>
      <BannerSlider images={bannerImages} />
      <section className={cx("section-comic")}>
        <Container>
          <h1 className={cx("title", "line-clamp")}>Comic</h1>
        </Container>
        <ComicSection />
      </section>
      <Notification />
      <section className={cx("section-novel")}>
        <Container>
          <h1 className={cx("title")}>Novels</h1>
        </Container>
        <div className={cx("novel-action")} />
        <div className={cx("novel-horror")} />
        <div className={cx("novel-ranking")} />
      </section>
      <section className={cx("section-anime")}>
        <Container>
          <h1 className={cx("title")}>Anime</h1>
        </Container>
        <div className={cx("anime-action")} />
        <div className={cx("anime-horror")} />
        <div className={cx("anime-ranking")} />
      </section>
    </main>
  );
}

export default Home;
