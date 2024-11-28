import React from "react";
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
  console.log(id)

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
      <Experiencias />
      
    </div>
  );
};

export default TourDetailSection;
