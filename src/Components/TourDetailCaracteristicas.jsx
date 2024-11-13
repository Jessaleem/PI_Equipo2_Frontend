import React from "react";

const TourDetailCaracteristicas = ({ caracteristicas }) => {
  return (
    <div className="text-start px-3">
      <div className="w-max-1280">
        <h2 className="text-center my-5">Qué incluye:</h2>
        <section className="d-flex flex-wrap justify-content-center justify-content-md-start mx-auto row-gap-5 column-gap-3 column-gap-md-0">
          {caracteristicas?.map((caracteristica) => (
            <div
              className="col-5 text-center d-flex flex-column col-md-4 col-lg-3"
              key={caracteristica?.id}
            >
              <div className="w-75 mx-auto">
                <span className={caracteristica?.image}></span>
                <p className="m-0 text-break">{caracteristica?.name}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default TourDetailCaracteristicas;
