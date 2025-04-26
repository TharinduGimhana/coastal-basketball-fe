import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Row, Col } from 'antd';

import './ParticipationCarousel.css';
import Slider from "@ant-design/react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BottomDescription } from "components/Description/BottomDescription/BottomDescription";

import TeamLogoImage from "../../../assets/png/Australind Dark0.png";
import TeamLogoImage1 from "../../../assets/png/Bunbury Dark0.png";
import TeamLogoImage2 from "../../../assets/png/Busselton Dark0.png";
import TeamLogoImage3 from "../../../assets/png/Eaton Dark0.png";
import TeamLogoImage4 from "../../../assets/png/Harvey Dark0.png";

import TeamClotheImage from "../../../assets/png/Jersey Mockups/Australind-Transparent.png";
import TeamClotheImage1 from "../../../assets/png/Jersey Mockups/Bunbury-Transparent.png";
import TeamClotheImage2 from "../../../assets/png/Jersey Mockups/Busselton-Transparent.png";
import TeamClotheImage3 from "../../../assets/png/Jersey Mockups/Eaton-Transparent.png";
import TeamClotheImage4 from "../../../assets/png/Jersey Mockups/Harvey-Transparent.png";


const NextArrow = ({ onClick }) => (
  <div className="custom-arrow next-arrow" onClick={onClick} style={arrowStyle}></div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev-arrow" onClick={onClick} style={arrowStyle}></div>
);

const arrowStyle = {
  display: 'none',
};

const ParticipationCarousel = () => {
  const sliderRef = useRef(null);
  const [activeButton, setActiveButton] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const newsItems = [
    { town_name: 'AUSTRALIND', club_name: 'AUSTRALIND ARROWS', teamLogoUrl: TeamLogoImage, teamClothes: TeamClotheImage },
    { town_name: 'BUNBURY', club_name: 'BUNBURY WARRIORS', teamLogoUrl: TeamLogoImage1, teamClothes: TeamClotheImage1 },
    { town_name: 'BUSSELTON', club_name: 'BUSSELTON SHARKS', teamLogoUrl: TeamLogoImage2, teamClothes: TeamClotheImage2 },
    { town_name: 'EATON', club_name: 'EATON HEAT', teamLogoUrl: TeamLogoImage3, teamClothes: TeamClotheImage3 },
    { town_name: 'HARVEY', club_name: 'HARVEY GIANTS', teamLogoUrl: TeamLogoImage4, teamClothes: TeamClotheImage4 },
  ];

  const handleLeftClick = () => {
    setActiveButton('left');
    sliderRef.current?.slickPrev();
  };

  const handleRightClick = () => {
    setActiveButton('right');
    sliderRef.current?.slickNext();
  };

  useEffect(() => {
    setActiveButton('right');
    handleRightClick();
  }, []);

  return (
    <>
      <Row className="news-rect participating-teams-content" justify="space-between">
        <Col className="participating-teams">
          <BottomDescription title1="PARTICIPATING" title2="TEAMS" content="Meet the participating teams from Australind, Bunbury, Eaton, Busselton." />
        </Col>
        <Col className="btn-carousel-direction">
          <Button
            className="btn-slide btn-prev"
            onClick={handleLeftClick}
            style={{
              backgroundColor: activeButton === 'left' ? 'var(--darkPurple)' : '',
              padding: '0px 3px 0px 3px',
              height: '40px',
              width: '60px',
            }}
          >
            <div className="icon-container">
              <div className="left-arrow arrow"
                style={{
                  borderRight: activeButton === 'left' ? '12px solid #fff' : '12px solid #97AFC1',
                  transform: 'rotate(360deg)',
                }}></div>
              <div className="line"
                style={{ border: activeButton === 'left' ? '1px solid #fff' : '1px solid #97AFC1' }}></div>
              <div className="circle"
                style={{ border: activeButton === 'left' ? '2px solid #fff' : '2px solid #97AFC1' }}></div>
            </div>
          </Button>

          <Button
            className="btn-slide btn-next"
            onClick={handleRightClick}
            style={{
              backgroundColor: activeButton === 'right' ? 'var(--darkPurple)' : '',
              padding: '0px 1px 0px 15px',
              height: '40px',
              width: '60px',
            }}
          >
            <div className="icon-container">
              <div className="circle"
                style={{ border: activeButton === 'right' ? '2px solid #fff' : '2px solid #97AFC1' }}></div>
              <div className="line"
                style={{ border: activeButton === 'right' ? '1px solid #fff' : '1px solid #97AFC1' }}></div>
              <div className="arrow"
                style={{ borderRight: activeButton === 'right' ? '12px solid #fff' : '12px solid #97AFC1' }}></div>
            </div>
          </Button>
        </Col>
      </Row>
      <Slider {...settings} className="partici-sliders-content" ref={sliderRef}>
        {newsItems.map((item, index) => (
          <div key={index} className="slide-event-card">
            <Card
              bordered={false}
              style={{
                backgroundRepeat: 'no-repeat',
                padding: '0px',
                border: index % 2 === 0 ? '1px solid var(--redColor)' : '1px solid var(--darkPurple)',
              }}
              cover={<img alt="Player Selection" src={item.teamLogoUrl} />}
            >
              <div style={{
                backgroundColor: index % 2 === 0 ? 'var(--redColor)' : 'var(--darkPurple)', // Alternating slide background color
                padding: '20px 28px',
              }}
              className="partici-carousel-content"
              >
                <div>
                  <img alt="Player clothe" src={item.teamClothes} />
                  <div style={{
                    border: '1px solid white',
                    padding: '4px',
                    background: 'none',
                  }}>
                    <Button
                      className=""
                      style={{
                        backgroundColor: index % 2 === 0 ? 'var(--darkPurple)' : 'var(--redColor)', // Alternating button background color
                        width: '100%',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        height: '40px',
                      }}
                    >
                      VIEW TEAM
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default ParticipationCarousel;