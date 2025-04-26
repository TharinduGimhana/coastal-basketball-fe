import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spin, Modal, Button } from 'antd';
import { useHistory } from "react-router-dom";
import './AcademyCBAProgram.css';
import { BottomDescription } from "components/Description/BottomDescription/BottomDescription";

import Toast from 'components/Toast/Toast';
import { apiPost } from 'ajax/apiServices';
import { UrlAdminGetSeasonType } from 'ajax/apiUrls';
import { Link } from "react-router-dom";
import { formatToDDMMYYYY } from 'constants/global';
import ImageWithLoading from 'components/ImageWithLoading/ImageWithLoading';
import { useSelector } from 'react-redux';
import { showSkipModal } from 'components/SkipModal/showSkipModal';
import { ROUTE_USER_SUBSCRIPTION, TEMPLATE_ROUTE_REGISTER1, TEMPLATE_ROUTE_REGISTER2 } from 'constants/navigation_constants';
import { showUpdateSubscribeDlg } from 'components/Stripe/UpdateSubscribeDlg/showUpdateSubscribeDlg';
const AcademyCBAProgram = () => {
  const history = useHistory();
  const userInfo = useSelector((state) => state.user);
  const userSubscription = useSelector((state) => state.subscription);
  const baseMembership = useSelector((state) => state.base_membership);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selSeason, setSelSeason] = useState(null);
  const [childList, setChildList] = useState([]);

  const handleShowMore = (item) => {
    setSelSeason(item);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelSeason(null)
    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('route', "/admin/academy");
    apiPost(UrlAdminGetSeasonType, formData)
      .then((res) => {
        setLoading(false)
        setPrograms(res.season_types);
      })
      .catch((err) => {
        setLoading(false)
        Toast(err, 2);
      });
  };

  const handleShowRegistration = async (item) => {
    if (localStorage.getItem("token")) {
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
            processRegistration(item);
          } else {
            let dlgRes = await showUpdateSubscribeDlg({
              selSubscription: baseMembership,
              userInfo,
              userList: childList
            })
            processRegistration(item);
          }
        } else {
          processRegistration(item);
        }
      } else {
        if (userSubscription?.status != "active") {
          let tmpUserList = []
          tmpUserList = [...tmpUserList, { user_id: userInfo.id, first_name: userInfo.first_name, last_name: userInfo.last_name, type: "individual", checked: true }]
          setChildList(tmpUserList)
          let dlgRes = await showSkipModal({
            childList: tmpUserList,
            setChildList: setChildList
          })
          if (dlgRes == null) {
            processRegistration(item);
          } else {
            let dlgRes = await showUpdateSubscribeDlg({
              selSubscription: baseMembership,
              userInfo,
              userList: childList
            })
            processRegistration(item);
          }
        } else {
          processRegistration(item);
        }
      }
    } else {
      window.location.href = "/signin"
    }
  }

  const processRegistration = (item) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // This will return the date in 'DD-MM-YYYY' format

    if (formattedDate < item.registration_end_date) {
      localStorage.setItem("season_id", item.id);
      if (item?.ui_type.includes("Individual")) {
        history.replace(TEMPLATE_ROUTE_REGISTER2)
      } else {
        history.replace(TEMPLATE_ROUTE_REGISTER1)
      }
    } else {
      Toast("This season registration date is passed", 2);
    }
  }
  return (
    <div>
      <Spin spinning={loading}>
        <div className="programs-section academy-programs">
          <BottomDescription
            title1="ACADEMY"
            title2="PROGRAMS"
            content="Explore and join our academic programs"
          />

          <Row className="mt-40" gutter={45} justify="space-between">
            {programs.length > 0 ? programs.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={6}>
                <Card
                  hoverable
                  cover={
                    <div style={{ padding: '15px' }}>
                      {/* <img alt={item.name} src={item.image_path} style={{ width: '100%', height: 'auto' }} /> */}
                      <ImageWithLoading alt={item.name} src={item.image_path} />
                    </div>
                  }
                >
                  <h5 className="font-16 red bold mt--15  home-little-letter">{item.name}</h5>
                  <h2 className="bold academy-program-title home-little-letter">{item.sub_title}</h2>
                  <p className='program-detail'>{item.detail}</p>
                  <span className="program-detail-more-text" onClick={() => {
                    handleShowMore(item)
                  }}> View Details</span>
                  <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <Link to="#" className="slide-subtitle-register" onClick={() => {
                      handleShowRegistration(item);
                    }}>Register Now</Link>
                  </div>
                </Card>
              </Col>
            )) : <p className="home-little-letter">No items available.</p>}
          </Row>
        </div>
      </Spin>

      <Modal
        title={selSeason?.type + " - " + selSeason?.name + " Detail"}
        wrapClassName="season-detail-modal"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <div className="season-detail-text-left">
          <Row gutter={[16, 4]}>
            <Col span={12}>
              <span className='season-detail-item-label'>Season Name:</span> <span className='season-detail-item-txt'> {selSeason?.name} ({selSeason?.sub_title})</span> <br />
              <span className='season-detail-item-label'>Start Date:</span> <span className='season-detail-item-txt'> {formatToDDMMYYYY(selSeason?.start_date)}</span> <br />
              <span className='season-detail-item-label'>Registration Start Date:</span> <span className='season-detail-item-txt'> {formatToDDMMYYYY(selSeason?.registration_start_date)}</span> <br />

            </Col>
            <Col span={12}>
              <span className='season-detail-item-label'>Registration Cost:</span> <span className='season-detail-item-txt'> {parseFloat(selSeason?.reg_cost).toFixed(2)} AUD</span> <span style={{ color: 'red', fontWeight: 600 }}>*</span><br />
              <span className='season-detail-item-label'>End Date:</span> <span className='season-detail-item-txt'> {formatToDDMMYYYY(selSeason?.end_date)}</span> <br />
              <span className='season-detail-item-label'>Registration End Date:</span> <span className='season-detail-item-txt'> {formatToDDMMYYYY(selSeason?.registration_end_date)}</span> <br />
            </Col>
            <Col span={24}><span className='season-detail-item-label'>Description:</span></Col>
            <Col span={24}><span className='season-detail-item-txt'>{selSeason?.detail}</span></Col>
          </Row>
          <div style={{ textAlign: 'center', marginTop: 20, position: 'relative' }}>
            <div className='txt-gst-info'>* GST, Non-Member Booking Fee & Processing Fees Not Included</div>
            <Link to="#" className="slide-subtitle-register" onClick={() => {
              handleShowRegistration(selSeason);
            }}>Register Now</Link>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AcademyCBAProgram;
