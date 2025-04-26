import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Button, ConfigProvider, Space, Form, Input, DatePicker, message, notification } from "antd";
import { createStyles } from 'antd-style';
import Logo from "assets/png/logo.png";
import { Link } from "react-router-dom";
import { ArrowRightOutlined, LinkOutlined, RightSquareOutlined } from "@ant-design/icons";
import Toast from 'components/Toast/Toast';

import './index.css';
import { UrlGetOpenSeason } from "ajax/apiUrls";
import { apiGet } from "ajax/apiServices";
import { showSkipModal } from "components/SkipModal/showSkipModal";

import { useHistory } from "react-router-dom";
import { ROUTE_USER_SUBSCRIPTION, TEMPLATE_ROUTE_REGISTER1, TEMPLATE_ROUTE_REGISTER2 } from "constants/navigation_constants";
import { showUpdateSubscribeDlg } from "components/Stripe/UpdateSubscribeDlg/showUpdateSubscribeDlg";


const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
  modalContent: css`
    padding: 20px; 
  `
}));

const RegistrationModal = ({ modal2Open, setModal2Open, userInfo, userSubscription, baseMembership }) => {
  const history = useHistory()
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [seasonData, setSeasonData] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const { styles } = useStyle();
  const [selSeason, setSelSeason] = useState(null);
  const [childList, setChildList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuth(true);
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    apiGet(UrlGetOpenSeason)
      .then((res) => {
        let tmpList = [...res.data]
        setSeasonData(tmpList);
      })
      .catch((err) => {
        Toast(err, 2);
      });
  };


  const handleButtonClick = async (season) => {
    if (userInfo.signup_type == "parent") {
      let tmpList = [...userInfo.child_info]
      tmpList = tmpList.filter((x) => x.subscription != "" && x.subscription?.status != "active")
      if (userInfo.child_info.length != 0 && tmpList.length == 0 && userSubscription?.status != "active") {
        let tmpUserList = []
        tmpUserList = [...tmpUserList, { user_id: userInfo.id, first_name: userInfo.first_name, last_name: userInfo.last_name, type: "individual", checked: false }]
        tmpList.map((t) => {
          tmpUserList = [...tmpUserList, { user_id: t.id, first_name: t.first_name, last_name: t.last_name, type: "child", checked: true }]
        })
        setChildList(tmpUserList)
        let dlgRes = await showSkipModal({
          childList: tmpUserList,
          setChildList: setChildList
        })
        if (dlgRes == null) {
          processRegistration(season)
        } else {
          let dlgRes = await showUpdateSubscribeDlg({
            selSubscription: baseMembership,
            userInfo,
            userList: childList
          })
          processRegistration(season)
        }
      } else {
        processRegistration(season)
      }
    } else {
      if (userSubscription.status == "active") {
        processRegistration(season)
      } else {
        let tmpUserList = []
        tmpUserList = [...tmpUserList, { user_id: userInfo.id, first_name: userInfo.first_name, last_name: userInfo.last_name, type: "individual", checked: true }]
        setChildList(tmpUserList)
        let dlgRes = await showSkipModal({
          childList: tmpUserList,
          setChildList: setChildList
        })
        if (dlgRes == null) {
          processRegistration(season)
        } else {
          let dlgRes = await showUpdateSubscribeDlg({
            selSubscription: baseMembership,
            userInfo: userInfo,
            type: "individual",
            user_id: userInfo.id,
            userList: tmpUserList
          })
          processRegistration(season)
        }
      }
    }

  };

  const processRegistration = (season) => {
    setSelSeason({ ...season, isWait: false });
    if (season.is_available == "true") {
      onSubmit({ ...season, isWait: false })
    } else {
      setIsConfirmModal(true);
    }
  }
  const handleAddWaits = (flag) => {
    if (flag == "cancel") {
      setIsConfirmModal(false);
      setTimeout(() => {
        setModal2Open(false);
      }, 800)
    } else {
      let tmpSel = { ...selSeason, isWait: true }
      onSubmit(tmpSel);
    }
  }

  const onSubmit = (season) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // This will return the date in 'DD-MM-YYYY' format

    if (formattedDate < season.registration_end_date) {
      if (!isAuth) return;
      localStorage.setItem("season_id", season.id);
      if (season?.ui_type.includes("Individual")) {
        history.replace(TEMPLATE_ROUTE_REGISTER2)
      } else {
        history.replace(TEMPLATE_ROUTE_REGISTER1)
      }
    } else {
      Toast("This season registration date is passed", 2);
    }
  }
  const screenWidthSize = window.innerWidth;
  return (
    <div className="auth-content">
      <Modal
        wrapClassName="season-select-modal"
        open={modal2Open}
        onOk={() => setModal2Open(false)}  // You can remove or keep these handlers depending on whether you need to manage the state
        onCancel={() => {
          setModal2Open(false);
          if (window.location.href.includes("signin")) {
            window.location.href = "/"
          }
        }}
        footer={null}
        style={{ marginTop: '20px' }}
      >
        <div style={{ textAlign: 'center' }}>
          <Link to="/">
            <img src={Logo} alt="Modal Image" style={{ maxWidth: '100%', marginBottom: '20px' }} />
          </Link>
        </div>
        {screenWidthSize > 768 ? <div style={{ margin: 'auto' }}>
          {
            seasonData.map((season, index) => (
              <Row key={index} onClick={() => {
                if (isAuth) {
                  handleButtonClick(season)
                }
              }} justify={"space-between"} align={"middle"} className={`btn-season-item  ${["Individual"].includes(season.ui_type) ? "red" : "blue"} ${!isAuth ? "disabled-button" : ""}`}>
                <Col>
                  <div className="season-order-txt">
                    <Row gutter={8} align={"middle"}>
                      <Col><div className={`order-text ${["Individual"].includes(season.ui_type) ? "red" : "blue"}`}>{season.priority_order}</div></Col>
                      <Col>
                        <div>{["Individual"].includes(season.ui_type)
                          ? `Register Individual for ${season.type} ${season.name}`
                          : `Register Team for ${season.type} ${season.name}`}</div>
                        <div>{season.sub_title}</div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col><ArrowRightOutlined /></Col>
              </Row>

            ))
          }

          <ConfigProvider
            button={{
              className: styles.linearGradientButton,
            }}
          >
            {!isAuth && (
              <p style={{ color: 'red' }}>Please sign in to register for the season.</p>
            )}
            <Space
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '20px',
                marginTop: '10px'
              }}
            >

            </Space>
          </ConfigProvider>
        </div> : <div style={{ margin: 'auto' }}>
          {
            seasonData.map((season, index) => (
              <div key={index} onClick={() => {
                if (isAuth) {
                  handleButtonClick(season)
                }
              }} className={`btn-season-item  ${["Individual"].includes(season.ui_type) ? "red" : "blue"} ${!isAuth ? "disabled-button" : ""}`}>
                <div className="season-order-txt">
                  <div className={`order-text ${["Individual"].includes(season.ui_type) ? "red" : "blue"}`}>{season.priority_order}</div>
                  <div>
                    {["Individual"].includes(season.ui_type)
                      ? `Register Individual for ${season.type} ${season.name}`
                      : `Register Team for ${season.type} ${season.name}`}
                  </div>
                  <div>{season.sub_title}</div>
                </div>
              </div>

            ))
          }

          <ConfigProvider
            button={{
              className: styles.linearGradientButton,
            }}
          >
            {!isAuth && (
              <p style={{ color: 'red' }}>Please sign in to register for the season.</p>
            )}
            <Space
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '20px',
                marginTop: '10px'
              }}
            >

            </Space>
          </ConfigProvider>
        </div>}

        {seasonData.length == 0 && (
          <div style={{ textAlign: 'center', color: '#f00', fontSize: '19px' }}>
            There is no season. Wait a moment, please.
          </div>
        )}
      </Modal>
      <Modal
        centered
        open={isConfirmModal}
        onOk={() => handleAddWaits("ok")}
        onCancel={() => handleAddWaits("cancel")}
        okText="Yes"
        cancelText="No"
        closable={false} // Removes the close (×) button
      >
        <div style={{ textAlign: 'center' }}>
          <Link to="/">
            <img src={Logo} alt="Modal Image" style={{ maxWidth: '100%', marginBottom: '20px' }} />
          </Link>
          <div style={{ marginBottom: '20px', fontSize: '18px' }}>
            <div style={{ margin: 'auto', width: 'auto', textAlign: 'left' }}>
              Season is full! Would you like to go onto waitlist?
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RegistrationModal;
