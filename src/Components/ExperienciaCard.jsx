import PropTypes from 'prop-types';

const ExperienciaCard = ({ imagen, review }) => {
  return (
    <div
      className="card-group"
      style={{ maxWidth: "20rem", margin: "0 auto", padding: "30px 30px" }}
    >
      <div className="card pt-4 pt-md-5 pb-md-3 bg-body-secondary border-0 shadow-review">
        <img src={imagen} className="rounded-circle w-50 h-50 m-auto object-fit-cover" />
        <p className="text-start m-4 m-sm-0 px-sm-4 pt-sm-4 pb-sm-2 pt-md-5 pb-md-4 review-text">
          {review}
        </p>
        <span className="text-end text-body-secondary d-sm-inline-block m-auto mb-3 my-sm-2 mt-md-3 me-sm-4">
          5⭐⭐⭐⭐⭐
        </span>
      </div>
    </div>
  );
};

ExperienciaCard.propTypes = {
  imagen: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
};

export default ExperienciaCard;
