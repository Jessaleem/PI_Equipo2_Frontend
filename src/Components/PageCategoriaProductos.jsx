import React from "react";
import { useParams } from "react-router-dom";
import { getAllTours } from "../provider/tours/toursProvider";
import { useQuery } from "@tanstack/react-query";
import TourCard from "./TourCard";

const PageCategoriaProductos = () => {
  const { categoria } = useParams();
  console.log("categoria", categoria);

  const { data } = useQuery({
    queryKey: ["tour"],
    queryFn: () => getAllTours(),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  console.log(data);

  let toursFiltradosPorCategoria = data?.filter(
    (tour) => tour.category.name.toLowerCase() == categoria.toLowerCase()
  );
  console.log(toursFiltradosPorCategoria);

  return (
    <div className="py-5 w-max-1280 min-vh-100">
      <h2 className="my-5 fa-4x">{categoria}</h2>
      <div className="d-flex flex-wrap gap-5 align-content-center">
        {toursFiltradosPorCategoria?.map((tour) => {
          return (
            <TourCard
              key={tour.id}
              imagen={tour.image}
              nombre={tour.name}
              id={tour.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PageCategoriaProductos;
