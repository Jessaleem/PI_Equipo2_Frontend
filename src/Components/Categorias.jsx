import React from "react";
import { categoriaData } from "../utils/categoriaData";
import CategoriaCard from "./CategoriaCard";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../provider/category/categoryProvider";

const Categorias = () => {
  const { data } = useQuery({
		queryKey: ["category"],
		queryFn: () => getCategory(),
		staleTime: Infinity,
		cacheTime: Infinity,
	});

  const categoriasLimpias = data?.map((categ) => ({
    ...categ,
    name: categ.name.trim(),
  }));

  return (
    <section className="categories-section">
      <div className="categories-container">
        <h2 className="section-title">Explorar por Categorías</h2>
        
        <div className="categories-grid">
          {categoriasLimpias?.map(category => (
            <CategoriaCard key={category.id} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categorias;
