import React from "react";
import { tours } from "../utils/tours";
import TourCard from "./TourCard";

const ToursDestacados = () => {
	return (
		<div className="bg-body-secondary">
			<h2 className="py-5">Tours Destacados</h2>
			<div className="d-flex flex-wrap justify-content-around column-gap-3 row-gap-5 w-max-1280">
				{tours.map((tour) => {
					return <TourCard key={tour.id} nombre={tour.nombre} />;
				})}
			</div>
			<button className="btn ver-mas-btn fw-medium fs-4 px-5 my-5">
				Ver más
			</button>
		</div>
	);
};

export default ToursDestacados;
