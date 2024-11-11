import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
export const Button = ({ backgroundColor, value, onClick }) => {
  return (
    <button
      className="btn m-2 py-2 rounded"
      style={{
        backgroundColor: backgroundColor,
        color: "#0B4040",
        border: "none",
      }}
      type="button"
      onClick={onClick}
    >{value}</button>
  );
};

Button.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
