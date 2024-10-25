import React from "react";

const TourCard = ({ nombre }) => {
	return (
		<div
			style={{
				position: "relative",
				borderRadius: "5px",
				overflow: "hidden",
			}}>
			<img
				src="/src/assets/TourImage.png"
				style={{ height: "100%", width: "100%" }}
			/>
			<div
				style={{
					position: "absolute",
					zIndex: 100,
					backgroundColor: "#D9D9D9C2",
					bottom: 0,
					display: "flex",
					flexDirection: "column",
					width: "100%",
					alignItems: "center",
					gap: "10px",
					padding: "20px 0",
					color: "#0B4040",
				}}>
				<h3 style={{ margin: 0 }}>{nombre}</h3>
				<button
					style={{
						backgroundColor: "#F2B6D2",
						width: "50%",
						boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
						color: "#0B4040",
					}}>
					Ver
				</button>
			</div>
		</div>
	);
};

export default TourCard;
