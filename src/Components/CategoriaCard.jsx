import React from "react";

const CategoriaCard = ({ imagen, categoria }) => {
  return (
    <div className="py-5" style={{ minHeight: "15rem", maxHeight: "15rem" }}>
      <img
        src={imagen}
        className="rounded-circle shadow-card-categoria"
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

export default CategoriaCard;
