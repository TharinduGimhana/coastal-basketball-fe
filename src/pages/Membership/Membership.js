import React, { useEffect, useState } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { Helmet } from "react-helmet-async";
import PackageTop from "components/PackageWidget/PackageTop/PackageTop";
import BaseMembershipWidget from "components/PackageWidget/BaseMembershipWidget/BaseMembershipWidget";
import MembershipWidget from "components/MembershipWidget/MembershipWidget";
import { apiGet } from "ajax/apiServices";
import { UrlGetSubscriptionSetting } from "ajax/apiUrls";
import { Spin } from "antd";
import { showUpdateSubscribeDlg } from "components/Stripe/UpdateSubscribeDlg/showUpdateSubscribeDlg";
import { useSelector } from "react-redux";
import { ROUTE_USER_SUBSCRIPTION } from "constants/navigation_constants";

function Membership(props) {
  const userInfo = useSelector((state) => state.user);
  const history = useHistory();
  const [subscriptionSettings, setSubscriptionSettings] = useState([]);
  const [baseMembership, setBaseMembership] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selSubscription, setSelSubscription] = useState(null);
  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    setLoading(true);
    apiGet(UrlGetSubscriptionSetting)
      .then((res) => {
        let tmpSubList = []
        res.map((x, index) => {
          let tmpObj = { ...x }
          tmpObj = { ...tmpObj, checked: false }
          if (parseInt(tmpObj.package) == 1) {
            setBaseMembership(tmpObj);
          } else {
            tmpSubList = [...tmpSubList, tmpObj]
          }
        })
        setSubscriptionSettings(tmpSubList);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const onBuy = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      // let dlgRes = await showUpdateSubscribeDlg({
      //   selSubscription: selSubscription,
      //   userInfo: userInfo
      // })
      // if (dlgRes == null) return;
      // setSelSubscription(null);
      history.push(ROUTE_USER_SUBSCRIPTION)
    } else {
      window.location.href = "/signin?ref=subscription"
    }
  }
  const onCancel = () => {

  }
  return (
    <HomeLayout>
      <Spin spinning={loading}>
        <Helmet>
          <title>CoastalBasketball Membership</title>
        </Helmet>
        <PackageTop />
        <BaseMembershipWidget />
        <div className="base-membership-main-rect">
          <MembershipWidget
            baseSubscriptionInfo={baseMembership}
            setBaseMembership={setBaseMembership}
            subscriptionSettings={subscriptionSettings}
            setSubscriptionSettings={setSubscriptionSettings}
            selSubscription={selSubscription}
            setSelSubscription={setSelSubscription}
            loading={loading}
            setLoading={setLoading}
            onBuy={onBuy}
            onCancel={onCancel} />
        </div>
      </Spin>
    </HomeLayout>
  );
}

export default withRouter(Membership);