import React from "react";
import { tours } from "../utils/tours";
import TourCard from "./TourCard";

const ToursDestacados = () => {
	return (
		<div>
			<div>
				<h2>Tours Destacados</h2>
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "space-around",
						gap: "49px 16px",
						maxWidth: "1200px",
						margin: "0 auto",
					}}>
					{tours.map((tour) => {
						return <TourCard key={tour.id} nombre={tour.nombre} />;
					})}
				</div>
				<button
					style={{
						fontSize: "20px",
						backgroundColor: "#ACF2EB",
						borderRadius: "5px",
						marginTop: "54px",
						color: "#0B4040",
						height: "50px",
						width: "155px",
						boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
					}}>
					Ver mas
				</button>
			</div>
		</div>
	);
};

export default ToursDestacados;
