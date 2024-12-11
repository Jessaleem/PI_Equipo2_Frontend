import PropTypes from "prop-types";

const CategoriaCard = ({ imagen, categoria }) => {
  return (
    <div className="py-5" style={{ minHeight: "15rem", maxHeight: "25rem" }}>
      <img
        src={imagen}
        className="rounded-circle shadow-card-categoria"
        style={{
          height: "12rem",
          width: "12rem",
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
