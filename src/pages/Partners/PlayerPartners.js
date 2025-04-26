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
import { apiGet, apiPost } from "ajax/apiServices";
import { UrlAdminGetPlayerPartners, UrlGetOpenSeason } from "ajax/apiUrls";
import Toast from "components/Toast/Toast";

const { Option } = Select;
const { Text } = Typography;
const { Dragger } = Upload;

const PlayerPartners = ({ history }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [signinResponse, setSigninResponse] = useState("");
    const [signupResponse, setSignupResponse] = useState("");
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(false);

    const [seasonData, setSeasonData] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState("");

    const [buttonList, setButtonList] = useState([
        { text: "CBL", checked: true },
        { text: "JCBL", checked: false },
        { text: "ACADEMY", checked: false },
        { text: "HIGH SCHOOL", checked: false },
        { text: "UNITED", checked: false },
    ])
    const [itemList, setItemList] = useState([])


    useEffect(() => {
        getSeasons();
        fetchData();
    }, [])

    const fetchData = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('type', "");
        apiPost(UrlAdminGetPlayerPartners, formData)
            .then((res) => {
                setLoading(false);
                setItemList(res);
            })
            .catch((err) => {
                setLoading(false);
                Toast(err, 2);
            });
    };
    const getSeasons = async () => {
        apiGet(UrlGetOpenSeason)
            .then((res) => {
                let tmpList = [...res.data]
                setSeasonData(tmpList);
            })
            .catch((err) => {
                Toast(err, 2);
            });
    }
    return (
        <HomeLayout>
            <div className="page-rect">
                <div className='partner-rect-logo'>
                    <img src={ImgRegisterLogo} width="100%" />
                </div>

                <div className='partner-rect'>

                    <div className='partner-title'>
                        <h1>Player Partners</h1>
                    </div>

                    <div className="player-sponsors">
                        <div>
                            <Select
                                showSearch
                                style={{ marginBottom: '11px', width: '250px' }}
                                placeholder="Select a season"
                                value={selectedSeason || undefined}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={seasonData.map((season) => ({
                                    value: season.name,
                                    label: season.name,
                                }))}
                                onChange={async (value) => {
                                    setSelectedSeason(value);
                                }}
                            />
                        </div>
                        {itemList.length > 0 ? itemList.map((item, key) => {
                            return <div className="player" key={key}>
                                <h3>{item.name} <span>#{item.point}</span>  / {item.position}</h3>
                                <a href="https://cmtg.com.au/" rel="noopener" target="_blank">
                                    <img className="lazy brand-logo" src={`${process.env.REACT_APP_API_BASE_URL}uploads/media/${item.logo}`} />
                                </a>
                                <div className="player-image">
                                    <img className="lazy" src={`${process.env.REACT_APP_API_BASE_URL}uploads/media/${item.avatar}`} />
                                </div>
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

export default withRouter(PlayerPartners);