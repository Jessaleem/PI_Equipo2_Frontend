import PropTypes from 'prop-types';

const CategoriaCard = ({ imagen, categoria }) => {
  return (
    <div className="py-5" style={{ minHeight: "300px", maxHeight: "400px" }}>
      <img
        src={imagen}
        className="rounded-circle shadow-card-categoria object-fit-cover"
        style={{
          maxHeight: "15rem",
          maxWidth: "15rem",
          height: "100%",
          width: "100%",
        }}
      />
      <h3 className="py-5 text-capitalize">{categoria}</h3>
    </div>
  );
};

CategoriaCard.propTypes = {
  imagen: PropTypes.string.isRequired,
  categoria: PropTypes.string.isRequired,
};

export default CategoriaCard;
