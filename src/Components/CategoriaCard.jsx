import PropTypes from 'prop-types';

const CategoriaCard = ({ id, name, description='', image ='' }) => {
  return (
    <a href={`/category/${id}`} className="category-card">
      <img
        src={image}
        alt={name}
        className="category-image"
      />
      <div className="gradient-overlay" />
      <div className="category-content">
        <h3 className="category-title">{name}</h3>
        <p className="category-desc">{description}</p>
      </div>
    </a>

  );
};

CategoriaCard.propTypes = {
  imagen: PropTypes.string.isRequired,
  categoria: PropTypes.string.isRequired,
};

export default CategoriaCard;
