import React from 'react';

const RadioButton = () => {

    return (
        <Radio.Group onChange={onChange} value={value} className="custom-radio-group">
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Radio.Button value="school-team">SCHOOL TEAM</Radio.Button>
                </Col>
                <Col span={12}>
                    <Radio.Button value="local-club">LOCAL CLUB/ASSOCIATION</Radio.Button>
                </Col>
                <Col span={12}>
                    <Radio.Button value="state-level">STATE LEVEL</Radio.Button>
                </Col>
                <Col span={12}>
                    <Radio.Button value="national-level">NATIONAL LEVEL</Radio.Button>
                </Col>
                <Col span={24}>
                    <Radio.Button value="other">OTHER (PLEASE SPECIFY)</Radio.Button>
                </Col>
            </Row>
        </Radio.Group>
    )

}

export default RadioButton;