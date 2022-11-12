import CardFigure from "components/CardFigure";
import PropTypes from "prop-types";
import "../assets/styles/RankingFigures.scss";

function RankingFigure({ data, rank }) {
  return (
    <figure className="ranking-figure">
      <span className="icon-bookmark">{rank}</span>
      <CardFigure to={`/comic/title/${data.id}`} data={data} horizontal />
    </figure>
  );
}

RankingFigure.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  rank: PropTypes.number.isRequired,
};

export default RankingFigure;
