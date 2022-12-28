import classNames from "classnames/bind";
import { useMemo } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import { BannerSlider } from "features";
import styles from "./styles/Home.module.scss";
import { ComicSection, Notification } from "./components";

const cx = classNames.bind(styles);

function Home() {
  const top5Titles = useSelector((state) => state.title.top5);

  const banners = useMemo(
    () =>
      top5Titles.map((title) => ({
        image: title.cover.source,
        link: `/comic/title/${title._id}`,
      })),
    [top5Titles]
  );

  return (
    <main className={cx("home")}>
      <BannerSlider images={banners} />
      <ComicSection />
      <Notification />
      <Container>
        <h1 className={cx("title")}>Novels</h1>
        <section className={cx("novel-action")} />
        <section className={cx("novel-horror")} />
        <section className={cx("novel-ranking")} />
      </Container>
      <Container>
        <h1 className={cx("title")}>Anime</h1>
        <section className={cx("anime-action")} />
        <section className={cx("anime-horror")} />
        <section className={cx("anime-ranking")} />
      </Container>
    </main>
  );
}

export default Home;
