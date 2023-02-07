import React, { useRef, useState } from "react";
import style from "./reviews.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import clsx from "clsx";
import elioTrades from "images/elioTrades.jpg";
import altcoinDaily from "images/altcoinDaily.jpg";
import alexBecker from "images/alexBecker.jpg";
import davidPakman from "images/davidPakman.jpg";
import cryptoBanter from "images/cryptoBanter.jpg";

const Reviews = () => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    arrows: false,

    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  const reviewsArray = [
    {
      text: `“Coldstack is actually a missing piece of glue between all of different file storage systems, which allows you to get the best price for your storage - and they're the easiest to use."`,
      name: "Ellio Trades",
      pictures: elioTrades,
    },
    {
      text: `“ColdStack is the true Uber of cloud storages.”`,
      name: "Altcoin Daily",
      pictures: altcoinDaily,
    },
    {
      text: `“Coldstack solves a lot of processing issues and high cost issues.”`,
      name: "Alex Becker",
      pictures: alexBecker,
    },
    {
      text: `“ColdStack lets to migrate from Amazon to decentralized cloud with just 2 clicks. Everything just stays really simple. This lets users save money, time and effort when storing data.”`,
      name: "David Pakman",
      pictures: davidPakman,
    },
    {
      text: `If you want decent class file storage - you go to ColdStack. It's an amazing tool.`,
      name: "Crypto Banter",
      pictures: cryptoBanter,
    },
  ];

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={clsx(className, "nextArrow")} style={{ ...style, display: "flex" }} onClick={onClick}>
        <div className="decorLineWrapper">
          <div className="decorLine" />
        </div>
        <div className="nextArrowText">Next</div>
      </div>
    );
  }

  function SamplePrevArrow() {
    return <div style={{ display: "none" }} />;
  }

  const sliderRef = useRef<Slider>(null);

  const gotoNext = () => {
    if (!sliderRef.current) return false;
    let next = sliderRef.current;
    next.slickNext();
  };

  const [buttonState, setButtonState] = useState(``);
  const onMouseLeave = () => {
    setButtonState(`leave`);
  };
  const onMouseEnter = () => {
    setButtonState(`hover`);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={clsx(style.wrapperSlider, "reviewsSlider")}>
          <Slider {...settings} ref={sliderRef}>
            {reviewsArray.map((item) => (
              <div key={item.name} className={style.wrapperCart}>
                <div className={style.cart}>
                  <div className={style.text}>{item.text}</div>
                  <div className={style.footerCart}>
                    <div className={style.people}>
                      <div className={style.photoPeople}>
                        <img src={item.pictures} alt={item.name} />
                      </div>
                      <div className={style.peopleText}>
                        {item.name && <div className={style.peopleName}>{item.name}</div>}
                      </div>
                    </div>
                    <div
                      onMouseLeave={() => onMouseLeave()}
                      onMouseEnter={() => onMouseEnter()}
                      className={clsx(style.nextArrow)}
                      onClick={() => gotoNext()}
                    >
                      <div className={style.decorLineWrapper}>
                        <div className={style.decorLineBackground} />
                        <div
                          className={clsx(
                            style.decorLine,
                            buttonState === "leave" && style.buttonLeave,
                            buttonState === "hover" && style.buttonHover
                          )}
                        />
                      </div>
                      <div className={style.nextArrowText}>Next</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
