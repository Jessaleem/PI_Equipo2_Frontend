import React from "react";
import { categoriaData } from "../utils/categoriaData";
import CategoriaCard from "./CategoriaCard";
import { Link } from "react-router-dom";

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
              <Link
                className="text-black categoriaLink"
                key={categoria.id}
                to={`/categoria/${categoria.categoria}`}
              >
                <CategoriaCard
                  imagen={categoria.imagen}
                  categoria={categoria.categoria}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Categorias;
