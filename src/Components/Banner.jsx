import Lema from "./LemaTextContainer";
import bannerImg from "@assets/banner.png";

const Banner = () => {
  return (
    <div className="max-width-100vw position-relative overflow-hidden d-flex flex-column justify-content-center align-items-center align-items-md-end">
      <img src={bannerImg} className="w-100" />
      <Lema />
      {/* <div className="position-absolute m-auto end-sm-0 top-sm-0 d-flex align-items-stretch-asdas m-lg-5 gap-4 flex-colum align-content-center"> */}
      <div className="d-flex flex-column flex-lg-row position-absolute gap-4 me-md-5 filtro-busqueda me-lg-5">
        <input
          className="shadow form-control py-2 pe-5 pe-md-0"
          type="text"
          placeholder="Filtrar por categoria"
        />
        <input
          className="shadow form-control py-2 pe-4 pe-md-0"
          type="text"
          placeholder="Buscar"
        />
        <button className="btn custom-pink search p-4 d-none d-md-block" />
      </div>
    </div>
  );
};

export default Banner;