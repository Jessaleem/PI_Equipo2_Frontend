import React from "react";

const Banner = () => {
	return (
		<div style={{ maxWidth: "100vw", position: "relative" }}>
			<img src="/src/assets/banner.png" style={{ width: "100%" }} />
			<div
				style={{
					textAlign: "start",
					fontSize: "20px",
					position: "absolute",
					width: "430px",
					bottom: "40%",
					left: "11%",
					backgroundColor: "rgba(255, 255, 255, 0.47)",
					backdropFilter: "blur(4px)",
					borderRadius: "10px",
					padding: "25px",
					fontWeight: "bold",
				}}>
				<h3
					style={{
						margin: "0",
						color: "#136060",
						fontFamily: "Jomhuria, serif",
						fontSize: "58px",
						marginBottom: "-25px",
					}}>
					Bienvenidos a Vive Vibes,
				</h3>
				<p style={{ margin: "0", fontSize: "25px" }}>
					<i>
						donde cada tour y experiencia unica
						<br />
						te invita a explorar el mundo con
						<br /> todos tus sentidos.
					</i>
				</p>
			</div>
		</div>
	);
};

export default Banner;
