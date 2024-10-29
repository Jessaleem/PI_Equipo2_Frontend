import Lema from "./LemaTextContainer";
import bannerImg from "@assets/banner.png";

const Banner = () => {
	return (
		<div className="max-width-100vw position-relative overflow-hidden d-flex flex-column justify-content-center">
			<img src={bannerImg} className="w-100" />
			<Lema />
			<div className="position-absolute end-0 top-0 d-flex align-items-stretch m-5 gap-4">
				<input
					className="shadow form-control py-2"
					type="text"
					placeholder="Filtrar por categoria"
				/>
				<input
					className="shadow form-control py-2"
					type="text"
					placeholder="Buscar"
				/>
				<button className="btn custom-pink search p-4" />
			</div>
		</div>
	);
};

export default Banner;
