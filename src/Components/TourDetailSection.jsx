import React, { useEffect } from "react";
import Rating from "./Rating";
import Experiencias from "./Experiencias";
import { Link } from "react-router-dom";
import TourDetailCaracteristicas from "./TourDetailCaracteristicas";
import { useQuery } from "@tanstack/react-query";
import { getTourById } from "../provider/tours/toursProvider";
import CalendarContainer from "./detailCalendar";

const TourDetailSection = ({ id }) => {
  const { data } = useQuery({
    queryKey: ["tour", id],
    queryFn: () => getTourById({ tourId: id }),
  });

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex flex-column justify-content-between gap-2">
        <div className="d-flex  justify-content-start m-2">
          <Link to={"/"}>
            <button className="atras-btn">&lt;- Volver atras</button>
          </Link>
        </div>
        <div className="detail-title-section">
          <h2 className="detail-title"> {data?.name}</h2>
        </div>
      </div>
      <div className="detail-body gap-3 d-flex flex-column justify-content-center">
        <div className="">
          <img
            className="detail-img"
            style={{ maxWidth: "100%" }}
            src={data?.image}
            alt="data-photo"
          />
        </div>
        <div className="d-flex justify-content-center">
          <Rating />
        </div>
        <div className="d-flex justify-content-center">
          <p className="detail-description">{data?.description}</p>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button className="reservar-btn">Reservar</button>
      </div>
      <TourDetailCaracteristicas caracteristicas={data?.characteristics} />
      <section>
        <CalendarContainer id={id} />
      </section>
      <section className="extraInfo w-max-1280">
        <h2 className="my-5">Infomacion Adicional</h2>
        <div className="w-100">
          <section className="mx-auto  border-2 border-danger text-start d-flex flex-column row-gap-4 flex-wrap justify-content-between">
            <p className="m-0 fs-5 border-2 border-warning">
              Ciudad: {data?.city}
            </p>
            <p className="m-0 fs-5 border-2 border-warning">
              Pais: {data?.country}
            </p>
            <p className="m-0 fs-5 border-2 border-warning">
              Categoria: {data?.category.name}
            </p>
            <p className="m-0 fs-5 border-2 border-warning">
              Hora de inicio: {data?.startTime}
            </p>
            <p className="m-0 fs-5 border-2 border-warning">
              Hora de fin: {data?.endTime}
            </p>
            <p className="m-0 fs-5 border-2 border-warning">
              Tiempo estimado: {data?.estimatedTime}
            </p>
            <p className="m-0 fs-5 border-2 border-warning">
              Precio: {data?.price}
            </p>
            <p className="m-0 fs-5 border-2 border-warning">
              Cupos: {data?.slots}
            </p>
            <p className="m-0 fs-5 border-2 border-warning">
              Apto para niños: {data?.suitableForChildren ? "SI" : "NO"}
            </p>
            <p className="m-0 fs-5 border-2 border-warning">
              Recomendaciones: {data?.recommendations}
            </p>
          </section>
        </div>
      </section>
      <Experiencias />
    </div>
  );
};

export default TourDetailSection;
