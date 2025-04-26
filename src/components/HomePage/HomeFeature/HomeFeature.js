import { Button, Col, Row } from "antd";
import TypingEffect from '../../AnimatedSection/TypingEffect';
import './HomeFeature.css'

const HomeFeature = (props) => {
    const { style, content, btnTitle, bgBtn } = props;
    return (
        <div style={style}>
          <Row gutter={[16]} align="middle" className="feature-content">
            <Col>
              <div className="font-24 bold white text-center margin-bottom:20px home-little-letter"><TypingEffect text={content} /></div>
            </Col>
            <Col>
              <div
                style={{
                  padding:'9px !important',
                  border:'1px solid white'
                }}
              >
                <Button style={{ backgroundColor: bgBtn }} className="btn-feature home-little-letter">
                {btnTitle}
                </Button>
              </div>
            </Col>
          </Row>
        </div>
    )
}

export default HomeFeature;