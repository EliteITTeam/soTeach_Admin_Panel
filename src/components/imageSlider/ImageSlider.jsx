import React from "react";
import "./ImageSlider.scss";
import Slider from "react-slick";
import { cardImage, babyShower, birthday } from "../../assests";
import Container from "../container/Container";

const ImageSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1600,
  };

  return (
    <>
      <Container className="lg">
        <Container className="main">
          <div className="image-slider-container">
            <Slider {...settings}>
              <div className="slider-images">
                <img src={birthday} alt="slider" />
              </div>
              <div className="slider-images">
                <img src={babyShower} alt="slider" />
              </div>
              <div className="slider-images">
                <img src={cardImage} alt="slider" />
              </div>
            </Slider>
          </div>
        </Container>
      </Container>
    </>
  );
};

export default ImageSlider;
