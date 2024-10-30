export const Button = ({ backgroundColor, value }) => {
  return (
    <button
      className="btn m-2 py-2 rounded"
      style={{
        backgroundColor: backgroundColor,
        color: "#0B4040",
        border: "none",
      }}
      type="button"
    >{value}</button>
  );
};
