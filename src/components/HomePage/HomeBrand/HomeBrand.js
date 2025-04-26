import { Col, Row } from 'antd';
import { BottomDescription } from 'components/Description/BottomDescription/BottomDescription';
import React from 'react';
import "./HomeBrand.css"
import Icon1 from 'assets/png/brand1.png';
import Icon2 from 'assets/png/brand2.png';
import Icon3 from 'assets/png/brand3.png';
import Icon4 from 'assets/png/brand4.png';
import Icon5 from 'assets/png/brand5.png';
import Icon6 from 'assets/png/brand6.png';
import Icon7 from 'assets/png/brand7.png';
import Icon8 from 'assets/png/brand8.png';
import Icon9 from 'assets/png/brand9.png';
const brandList = [
    { icon: Icon1 },
    { icon: Icon2 },
    { icon: Icon3 },
    { icon: Icon4 },
    { icon: Icon5 },
    { icon: Icon6 },
    { icon: Icon7 },
    { icon: Icon8 },
    { icon: Icon9 }
]
const HomeBrand = (props) => {
    return (
        <div className='brand-rect'>
            <BottomDescription
                title="TRUSTED BRANDS"
                content1="Bringing you exclusive deals and"
                content2="specials from selected brands"
            />
            <Row justify='space-between' className='mt-20'>
                {brandList.map((x, index)=>{
                    return <Col key={index}>
                        <img src={x.icon} className='brand-img'/>
                    </Col>
                })}
            </Row>
        </div>
    );
};

export default HomeBrand;

