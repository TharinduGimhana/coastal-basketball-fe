import { Col, Row, Button } from "antd"; // Removed Link from here
import { BottomDescription } from "components/Description/BottomDescription/BottomDescription";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./HomeBranch.css";
import { apiGet } from "ajax/apiServices";
import { UrlGetBranch } from "ajax/apiUrls";

const HomeBranch = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const createSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    apiGet(UrlGetBranch)
      .then((res) => {
        let tmpList = [...res]
        tmpList = tmpList.map((x, index) => ({
          image_path: x.image_path,
          content: x.content,
          title: x.title,
          logo_path: x.logo_path,
          image_path_status: x.image_path_status, // Include image path status
          logo_path_status: x.logo_path_status    // Include logo path status
        }))
        setItems(tmpList)
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <div className="customer-rect">
      <Row className="branch-about-content">
        <Col>
          <BottomDescription
            title1="OUR DYNAMIC"
            title2="BRANCHES"
            content="Explore all of our Branches"
          />
        </Col>
        <Col>
          <BottomDescription
            title1="ABOUT"
            title2="US"
            content="Learn more about our association and how you can get involved."
          />
          <div className="w-100 d-flex justify-center">
            <div className="btn-responsive-more">
              <Button className="btn-about-more" >
                LEARN MORE
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <div className="customer-main">
        <Row justify="space-around" className="responsive-row mt-40">
          {loading ? (
            <Col span={24} style={{ textAlign: 'center' }}>Loading...</Col>
          ) : (
            items.map((x, index) => (
              <div key={index}>
                {(x.logo_path_status == "true" && x.logo_path) ? (
                  <Col>
                    <div className="branch-content">
                      <Link to={`/${createSlug(x.title)}`}>
                        <div
                          className="image-wrapper"
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          {
                            x.image_path_status == "false" && <div className="img-container">
                              <img
                                alt="branch"
                                src={`${process.env.REACT_APP_API_BASE_URL}uploads/media/${x.logo_path}`}
                              />
                            </div>
                          }
                          {(x.image_path_status == "true" && x.image_path) ? (
                            <div
                              className="branch-img"
                              alt="Branch"
                              style={{
                                backgroundImage: x.image_path_status ? `url(${process.env.REACT_APP_API_BASE_URL}uploads/media/${x.image_path ? x.image_path : 'none'})` : "none"
                              }}
                            />
                          ) : (
                            <></>
                          )}

                          {(x.image_path_status == "true" && x.logo_path_status == "true" && x.logo_path) ? (
                            <div
                              className={`hover-image ${hoveredIndex === index ? 'visible' : ''}`}
                              style={{
                                backgroundImage: x.logo_path_status ? `url(${process.env.REACT_APP_API_BASE_URL}uploads/media/${x.logo_path ? x.logo_path : 'nba_logo.png'})` : "none"
                              }}
                            />
                          ) : (
                            <></>
                          )}

                        </div>
                        <p className="font-13 bold mt-5 text-center home-little-letter">
                          {x.content !== "undefined" ? x.content : ""}
                        </p>
                      </Link>
                    </div>
                  </Col>
                ) : (<></>)}
              </div>
            ))
          )}
        </Row>
      </div>
    </div>
  );
};

export default HomeBranch;
