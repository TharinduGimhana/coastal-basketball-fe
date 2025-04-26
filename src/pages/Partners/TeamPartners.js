import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { Button, Col, Input, Row, Select, message, Typography, Upload, DatePicker, notification, Form, Spin, ConfigProvider } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import "./Partners.css";
import ImgRegisterLogo from "assets/png/slide-back.jpg"

import axios from 'axios';
import dayjs from 'dayjs';
import moment from "moment";
import { TypeButton } from "components/ButtonWidget/TypeButton/TypeButton";
import { UrlAdminGetCoporatePartners } from "ajax/apiUrls";
import { apiPost } from "ajax/apiServices";
import Toast from "components/Toast/Toast";

const { Option } = Select;
const { Text } = Typography;
const { Dragger } = Upload;

const TeamPartners = ({ history }) => {
    const [loading, setLoading] = useState(false);
    const [activeType, setActiveType] = useState("CBL");

    const [buttonList, setButtonList] = useState([
        { text: "CBL", checked: true },
        { text: "JCBL", checked: false },
        { text: "Academy", checked: false },
        { text: "High School", checked: false },
        { text: "United", checked: false },
    ])
    const [itemList, setItemList] = useState([])
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('type', "");
        apiPost(UrlAdminGetCoporatePartners, formData)
            .then((res) => {
                setLoading(false);
                setItemList(res);
            })
            .catch((err) => {
                setLoading(false);
                Toast(err, 2);
            });
    };
    const onClickType = (info) => {
        setActiveType(info.text)
        let tmpList = [...buttonList]
        tmpList = tmpList.map((x) => {
            if (x.text === info.text) {
                return { ...x, checked: true }
            } else {
                return { ...x, checked: false }
            }
        })
        setButtonList(tmpList);
    }
    return (
        <HomeLayout>
            <div className="page-rect">
                <div className='partner-rect-logo'>
                    <img src={ImgRegisterLogo} width="100%" />
                </div>

                <div className='partner-rect'>

                    <div className='partner-title'>
                        <h1>Corporate Partners</h1>
                    </div>
                    <div className="partner-form-rect">
                        {buttonList.map((x) => {
                            return <TypeButton checked={x.checked} onClick={() => {
                                onClickType(x)
                            }} >{x.text}</TypeButton>
                        })}
                        {itemList.filter((x) => x.type === activeType).length > 0 ? itemList.filter((x) => x.type === activeType).map((item, key) => {
                            return <div className="partner-item-rect" key={key}>
                                <div className="title-and-details">
                                    <span className="title">{item.name}</span>
                                    <div className="details">
                                        {item.phone && <em>
                                            <img className="lazy" src="https://wildcatscorporate.com.au/wp-content/themes/wildcats-corporate/images/icons/phone.svg" style={{ display: 'inline' }} />
                                            <a href={`tel:${item.phone}`} rel="noopener" target="_blank">{item.phone}</a>
                                        </em>}
                                        <em>
                                            <img className="lazy" src="https://wildcatscorporate.com.au/wp-content/themes/wildcats-corporate/images/icons/link.svg" style={{ display: 'inline' }} />
                                            <a href={`https://${item.website}`} rel="noopener" target="_blank"><span className="txt-website">{item.website}</span></a>
                                        </em>
                                    </div>
                                </div>
                                <a href={`${item.website}`} rel="noopener" target="_blank">
                                    <img className="brand-logo lazy" src={`${process.env.REACT_APP_API_BASE_URL}uploads/media/${item.logo}`} style={{ display: "block" }} />
                                </a>
                                <div className="content-rect"><p>{item.content}</p></div>
                            </div>
                        }) : <div className="no-found-rect">
                            <p className="no-found-txt">No Found</p>
                        </div>}
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default withRouter(TeamPartners);