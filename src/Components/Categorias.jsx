import React from "react";
import { categoriaData } from "../utils/categoriaData";
import CategoriaCard from "./CategoriaCard";

const Categorias = () => {
  return (
    <>
      <h2 className="py-4 m-0 fw-bold" style={{ backgroundColor: "#A7F2CF75" }}>
        Categorías
      </h2>
      <div className="bg-categorias px-5">
        <div className="d-flex justify-content-around flex-wrap w-max-1280 overflow-hidden gap-4">
          {categoriaData.map((categoria) => {
            return (
              <CategoriaCard
                key={categoria.id}
                imagen={categoria.imagen}
                categoria={categoria.categoria}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Categorias;
