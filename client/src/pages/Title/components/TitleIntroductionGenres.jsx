import classNames from "classnames/bind";
import { Button } from "components/index.jsx";
import { useLazyGetGenres } from "hooks/index.jsx";
import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Introduction.module.scss";

const cx = classNames.bind(styles);

function TitleIntroductionGenres() {
  const title = useSelector((state) => state.title.title);
  const { get: getGenres, data: genres = [] } = useLazyGetGenres();

  useEffect(() => {
    if (title) {
      getGenres({ name_in: title.genres, _sort: { name: "asc" } });
    }
  }, [title]);

  return genres.map(({ _id, name }, index) => (
    <Fragment key={index}>
      {index > 0 && ", "}
      <Button to={`/content-list/${_id}`} wrapper className={cx("genre")}>
        {name}
      </Button>
    </Fragment>
  ));
}

export default TitleIntroductionGenres;
