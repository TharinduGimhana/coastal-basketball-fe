import React, { useEffect, useState, useRef } from 'react';
import AnimatedSection from '../../AnimatedSection/AnimatedSection';
import { Button, Row, Col } from 'antd';
import './HomeEvent.css';
import Slider from "@ant-design/react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { UrlGetEvent } from 'ajax/apiUrls';
import { apiGet } from 'ajax/apiServices';

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow next-arrow" onClick={onClick} style={arrowStyle}></div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev-arrow" onClick={onClick} style={arrowStyle}></div>
);

const arrowStyle = {
  display: 'none',
};

const HomeEvent = () => {
  const sliderRef = useRef(null);
  const [newsItems, setNewsItems] = useState([]); // State to store fetched events
  const [activeButton, setActiveButton] = useState('right');

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
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleLeftClick = () => {
    setActiveButton('left');
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleRightClick = () => {
    setActiveButton('right');
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    apiGet(UrlGetEvent)
      .then((res) => {
        let tmpList = [...res]
        tmpList = tmpList.filter(event => event.active === 'true')
        setNewsItems(tmpList)
      })
      .catch((err) => {

      });

  };

  return (
    <div className="event-rect">
      <Row justify="space-between" className="title-content">
        <Col>
          <AnimatedSection type="fade">
            <h1 className="event-title font-48 bold white home-little-letter">
              EVENTS AND<br />
              ANNOUNCEMENTS
            </h1>
          </AnimatedSection>
          <p className="font-18 bold grey">Learn more about our upcoming events</p>
        </Col>
        <Col className="btn-carousel-direction">
          <Button
            className="btn-prev"
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
      <Slider {...settings} className="event-slides-content mt-40 mb-20" ref={sliderRef}>
        {newsItems.map((item, index) => (
          <div key={index} className="slide-event-card">
            <a href={item.link} target="_blank">
              <div className="p-10 img-slide">
                <img
                  alt={item.title}
                  src={`${process.env.REACT_APP_API_BASE_URL}uploads/media/${item.image_path}`} // Update with the correct path
                  style={{ width: '100%', height: '270px', objectFit: 'cover' }}
                />
              </div>
            </a>
            <Row gutter={[8, 8]} className="mt-40" style={{ display: 'flex', padding: '0 5px' }}>
              <Col>
                <Button className="btn-limited-spots" >
                  LIMITED SPOTS
                </Button>
              </Col>
              <Col>
                <Button className="btn-limited-tour" >
                  TOURNAMENT
                </Button>
              </Col>
            </Row>
            <p className="font-24 bold white mt-20 home-little-letter">{item.title}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeEvent;
