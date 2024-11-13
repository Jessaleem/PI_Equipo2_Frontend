import { useLocation } from 'react-router-dom';
export const Button = ({ backgroundColor, value }) => {
  const location = useLocation();
  return (
    <button
      className={`btn m-2 py-2 rounded ${
        location.pathname === '/register' && 'd-none'
      }`}
      style={{
        backgroundColor: backgroundColor,
        color: '#0B4040',
        border: 'none',
      }}
      type='button'
    >
      {value}
    </button>
  );
};
