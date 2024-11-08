import React from "react";
import { reviews } from "../utils/reviews";
import ExperienciaCard from "./ExperienciaCard";
import Slider from "react-slick";

const Experiencias = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    arrows: true,
    pauseOnHover: true,
  };
  return (
    <div className="px-5">
      <h2 className="pt-5">Experiencias</h2>
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <Slider {...settings}>
          {reviews.map((review) => (
            <ExperienciaCard
              key={review.id}
              imagen={review.usuarioAvatar}
              review={review.review}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Experiencias;
