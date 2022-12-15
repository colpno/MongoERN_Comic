import classNames from "classnames/bind";
import { useMemo } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import { BannerSlider } from "features";
import styles from "pages/Home/assets/styles/Home.module.scss";
import { ComicSection, Notification } from "./components";

const cx = classNames.bind(styles);

function Home() {
  const top5Titles = useSelector((state) => state.title.top5);

  const banners = useMemo(
    () =>
      top5Titles.map((title) => ({
        image: title.cover,
        link: `/comic/title/${title.guid}`,
      })),
    [top5Titles]
  );

  return (
    <main className={cx("home")}>
      <BannerSlider images={banners} />
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
