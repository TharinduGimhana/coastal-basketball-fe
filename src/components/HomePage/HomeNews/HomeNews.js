import React, { useEffect , useState, useRef } from 'react';
import { Button, Card, Row, Col } from 'antd';

import './HomeNews.css';
import Slider from "@ant-design/react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BottomDescription } from "components/Description/BottomDescription/BottomDescription";

import News1 from "../../../assets/png/news1.jpg";
import News2 from "../../../assets/png/news2.jpg";
import News3 from "../../../assets/png/news3.jpg";
import News4 from "../../../assets/png/news4.jpg";
import News5 from "../../../assets/png/news5.jpg";
import News6 from "../../../assets/png/news6.jpg";
import News7 from "../../../assets/png/news7.jpg";
import News8 from "../../../assets/png/news8.jpg";
import News9 from "../../../assets/png/news9.jpg";

let prevArrowClickHandler = null;

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow next-arrow" onClick={onClick} style={arrowStyle}>
  </div>
);

const PrevArrow = ({ onClick }) => {
  prevArrowClickHandler = onClick;
  return (
    <div className="custom-arrow prev-arrow" onClick={onClick} style={arrowStyle}>
    </div>
  );
};

const arrowStyle = {
  display: 'none',
};

const HomeNews = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
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

  const newsItems = [
    {
      title: 'CHAMPIONSHIP COACH ELEVATES INTO NEW ROLE',
      date: 'Wed - Aug 28 - 2024',
      author: 'Lara',
      imageUrl: News1,
      authorUrl: News1,
    },
    {
      title: 'RECAP NBL1 WEST | MEN\'S GRAND FINAL',
      date: 'Mon - Aug 26 - 2024',
      author: 'Shiburu',
      imageUrl: News2,
      authorUrl: News2,
    },
    {
      title: 'PLAYERS REWARDED WITH CHAMPIONSHIP',
      date: 'Fri - Aug 23 - 2024',
      author: 'Chris Pike',
      imageUrl: News3,
      authorUrl: News3,
    },
    {
      title: 'PROMISE TO BRING CHAMPIONSHIP',
      date: 'Wed - Aug 20 - 2024',
      author: 'Cherry',
      imageUrl: News4,
      authorUrl: News4,
    },
    {
      title: 'PROMISE TO BRING CHAMPIONSHIP',
      date: 'Wed - Aug 20 - 2024',
      author: 'Cherry',
      imageUrl: News5,
      authorUrl: News5,
    },
    {
      title: 'PROMISE TO BRING CHAMPIONSHIP',
      date: 'Wed - Aug 20 - 2024',
      author: 'Cherry',
      imageUrl: News6,
      authorUrl: News6,
    },
    {
      title: 'PROMISE TO BRING CHAMPIONSHIP',
      date: 'Wed - Aug 20 - 2024',
      author: 'Cherry',
      imageUrl: News7,
      authorUrl: News7,
    },
    {
      title: 'PROMISE TO BRING CHAMPIONSHIP',
      date: 'Wed - Aug 20 - 2024',
      author: 'Cherry',
      imageUrl: News8,
      authorUrl: News8,
    },
    {
      title: 'PROMISE TO BRING CHAMPIONSHIP',
      date: 'Wed - Aug 20 - 2024',
      author: 'Cherry',
      imageUrl: News9,
      authorUrl: News9,
    },
    {
      title: 'PROMISE TO BRING CHAMPIONSHIP',
      date: 'Wed - Aug 20 - 2024',
      author: 'Cherry',
      imageUrl: News9,
      authorUrl: News9,
    },
  ];

  const [activeButton, setActiveButton] = useState(null);

  const handleLeftClick = () => {
    setActiveButton('left');
    
    if (prevArrowClickHandler) {
      prevArrowClickHandler();
    }
  };

  const handleRightClick = () => {
    setActiveButton('right');
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  useEffect(() => {
    setActiveButton('right');
    handleRightClick();
  }, []);

  return (
    <>
        <Row className="news-rect" justify="space-between">
            <Col>
            <BottomDescription
                title1="LATEST"
                title2="NEWS"
                content="Read our latest news"
            />
            </Col>
            <Col className="btn-carousel-direction">
              <Button
                className="btn-slide btn-prev"
                onClick={handleLeftClick}
                style={{
                  backgroundColor: activeButton === 'right' ? 'white' : '',
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
        <Slider {...settings} className="news-sliders-content mt-40" ref={sliderRef}>
            {newsItems.map((item, index) => (
            <div key={index} className="slide-card">
                <Card
                hoverable
                style={{ height: '400px', margin: 0, padding: 0 }}
                >
                <div style={{ position: 'relative', height: '100%' }}>
                    <img
                    alt={item.title}
                    src={item.imageUrl}
                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                    />
                    <div className="hover-overlay"></div>
                    <div className="carousel-news-content">
                    <p className="w-full home-little-letter">{item.date}</p>
                    <h3 className="font-24 bold white mt-10 home-little-letter">{item.title}</h3>
                    <Row gutter={[16, 16]} justify="left" className="w-full">
                        <Col>
                        <img
                            alt="Author name"
                            src={item.authorUrl}
                            style={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            }}
                        />
                        </Col>
                        <Col>
                        <p className="text-left home-little-letter">{item.author}</p>
                        <p className="text-left home-little-letter">AUTHOR</p>
                        </Col>
                    </Row>
                    </div>
                </div>
                </Card>
            </div>
            ))}
        </Slider>
        <div className="news-blog-rect">
            <Row justify="space-between" gutter={[16, 16]} className="mt-10">
                {newsItems.slice(0, 6).map((item, index) => (
                <Col className="new-item" key={index}>
                    <div className="d-flex">
                    <div style={{ padding: '5px', border: '1px solid pink' }}>
                        <img alt={item.title} src={item.imageUrl} width="90" height="110" />
                    </div>
                    <div className="news-right-item" style={{ padding: '10px 20px' }}>
                        <p>
                        <span className="red-dot"></span>
                        {item.date}
                        </p>
                        <p
                        className="font-18 bold mt-10"
                        style={{ lineHeight: '1.3' }}
                        >
                        {item.title}
                        </p>
                    </div>
                    </div>
                </Col>
                ))}
            </Row>
        </div>
    </>
  );
};

export default HomeNews;