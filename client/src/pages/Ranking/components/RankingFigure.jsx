import PropTypes from "prop-types";

import { CardFigure } from "components";
import "../styles/RankingFigures.scss";

function RankingFigure({ data, rank, showSummary }) {
  return (
    <figure className="ranking-figure">
      <span className="icon-bookmark" data-rank={rank}>
        {rank}
      </span>
      <CardFigure
        to={`/comic/title/${data._id}`}
        data={data}
        horizontal
        showSummary={showSummary}
      />
    </figure>
  );
}

RankingFigure.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  rank: PropTypes.number.isRequired,
  showSummary: PropTypes.bool,
};

RankingFigure.defaultProps = {
  showSummary: false,
};

export default RankingFigure;
