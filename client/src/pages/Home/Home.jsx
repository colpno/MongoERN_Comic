import classNames from "classnames/bind";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import { BannerSlider } from "features";
import { useToast } from "hooks";
import { ComicSection, Notification } from "./components";
import styles from "./styles/Home.module.scss";

const cx = classNames.bind(styles);

function Home() {
  const top5Titles = useSelector((state) => state.title.top5);
  const { Toast, options } = useToast();

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
      <div className={cx("separator")} />
      <Notification />
      <ComicSection />
      <Toast {...options} />
    </main>
  );
}

export default Home;
