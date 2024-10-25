import React from "react";

const TourCard = ({ nombre }) => {
	return (
		<div className="position-relative rounded-2 overflow-hidden">
			<img src="/src/assets/TourImage.png" className="h-100 w-100" />
			<div className="position-absolute z-1 bottom-0 w-100 py-3 d-flex flex-column align-items-center gap-2 footer-tourCard-colors">
				<h3 className="m-0">{nombre}</h3>
				<button className="w-50 btn py-2 fs-5 fw-bold ver-tourCard-btn-colors">
					Ver
				</button>
			</div>
		</div>
	);
};

export default TourCard;
