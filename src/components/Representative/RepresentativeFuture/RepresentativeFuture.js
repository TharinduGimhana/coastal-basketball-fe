import React from 'react';
import AnimatedSection from 'components/AnimatedSection/AnimatedSection';
import { Row, Col, Typography } from 'antd';
import './RepresentativeFuture.css';
import EnrollmentImage from "../../../assets/png/representative_footer.jpg";

const { Title, Paragraph } = Typography;

const RepresentativeFuture = () => {
  return (
    <div>
      <Row justify="center" className="represent-join-content">
        
        <Col className="font-48 typo-red mb-30"><AnimatedSection type="fade">FUTURE</AnimatedSection></Col>
        <Col className="font-48 typo-blue"><AnimatedSection type="fade">{'\u00A0'}GOALS</AnimatedSection></Col>

        <div className="bg-represent-content">
          <div className="bg-represent-letter">
            <Row gutter={[32, 10]} justify="space-between" className="text-national">
              <Col xs={24} md={12}>
                <div className="national">
                  <div>
                    <h2>NATIONAL COMPETITIONS</h2>
                    <p>Continued participation in national tournaments, aiming to build
                      a reputation as a competitive force.
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className="international">
                  <div>
                    <h2>INTERNATIONAL EXPOSURE</h2>
                    <p>Plans for international tours and participation in prestigious
                      tournaments abroad, including AAU competitions in the US.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default RepresentativeFuture;
