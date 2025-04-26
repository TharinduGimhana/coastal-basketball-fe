import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Popconfirm, Form, Tooltip, Row, Col, Select, Tabs, Modal, message, Spin } from 'antd';
import Toast from 'components/Toast/Toast';
import './index.css';
import UserLayout from 'layouts/UserLayout/UserLayout';
import MembershipWidget from 'components/MembershipWidget/MembershipWidget';
import { showUpdateSubscribeDlg } from 'components/Stripe/UpdateSubscribeDlg/showUpdateSubscribeDlg';
import { apiPost } from 'ajax/apiServices';
import { UrlCancelSubscription, UrlGetSubscription, UrlUpdateSubscription } from 'ajax/apiUrls';
import { useDispatch, useSelector } from 'react-redux';
import { updateSubscription } from '../../../redux/reducers/subscriptionSlice';

const Subscription = ({ history }) => {
  const userInfo = useSelector((state) => state.user);
  const userSubscription = useSelector((state) => state.subscription);
  const dispatch = useDispatch();
  const [subscriptionSettings, setSubscriptionSettings] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [membershipList, setMembershipList] = useState([]);
  const [selSubscription, setSelSubscription] = useState(null);
  const [baseMembership, setBaseMembership] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selIndex, setSelIndex] = useState(0);

  const onChangeUser = (index) => {
    setCurrentSubscription(membershipList[index])
    setSelIndex(index);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/signin');
    } else {
      fetchData();
    }
  }, []);
  const fetchData = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('user_id', userInfo.id);
    formData.append('email', userInfo.email);
    apiPost(UrlGetSubscription, formData)
      .then((res) => {
        setLoading(false);
        let tmpList = [...res.packages]
        let tmpSubList = []
        tmpList.map((x, index) => {
          let tmpObj = { ...x }
          tmpObj = { ...tmpObj, checked: false }
          if (parseInt(tmpObj.package) == 1) {
            setBaseMembership(tmpObj);
          } else {
            tmpSubList = [...tmpSubList, tmpObj]
          }
        })
        setSubscriptionSettings(tmpSubList);
        if (res.cur_package.length > 0) {
          let tmpList = [...res.cur_package]
          tmpList = tmpList.map((x, index) => {
            return { ...x, key: index, label: index == 0 ? "My Membership" : "Kid " + index + " (" + x.first_name + " " + x.last_name + ")" }
          })
          setMembershipList(tmpList)
          setSelIndex(0)
          setCurrentSubscription(tmpList[0])
        } else {
          setMembershipList([]);
        }
        dispatch(updateSubscription(res.subscription));
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleCancel = async () => {
    const formData = new FormData();
    formData.append('user_id', currentSubscription.type == "child" ? currentSubscription.user_id : userInfo.id);
    formData.append('email', userInfo.email);
    formData.append('type', currentSubscription.type);
    apiPost(UrlCancelSubscription, formData)
      .then((res) => {
        Toast("Membership canceled successfully", 1);
        setSelSubscription(null);
        onGetCurrentSubscription();
      })
      .catch((err) => {
        Toast(err, 2);
      });
  }
  const handleUpdate = async (tmpSelSubscription = null) => {
    if (tmpSelSubscription == null && selSubscription == null) {
      Toast("Please select package", 2);
      return;
    }

    if (currentSubscription?.subscription_plan_id) {
      onUpdateSubscription(tmpSelSubscription)
    } else {
      let dlgRes = await showUpdateSubscribeDlg({
        selSubscription: tmpSelSubscription ? tmpSelSubscription : selSubscription,
        userInfo: userInfo,
        userList: [[...membershipList][selIndex]]
      })
      if (dlgRes == null) return;
      setSelSubscription(null);
      onGetCurrentSubscription();
    }
  }

  const onUpdateSubscription = async (tmpSelSubscription = null) => {
    const formData = new FormData();
    formData.append('user_id', currentSubscription.type == "child" ? currentSubscription.user_id : userInfo.id);
    formData.append('email', userInfo.email);
    formData.append('type', currentSubscription.type);
    formData.append('subscription_plan_id', tmpSelSubscription ? tmpSelSubscription.id : selSubscription.id);
    apiPost(UrlUpdateSubscription, formData)
      .then((res) => {
        Toast("Membership updated successfully", 1);
        setSelSubscription(null);
        onGetCurrentSubscription();
      })
      .catch((err) => {
        Toast(err, 2);
      });

  }


  const onGetCurrentSubscription = async () => {
    setLoading(true);
    setTimeout(() => {
      const formData = new FormData();
      formData.append('user_id', userInfo.id);
      apiPost(UrlGetSubscription, formData)
        .then((res) => {
          setLoading(false);
          let tmpList = [...res.packages]
          let tmpSubList = []
          tmpList.map((x, index) => {
            let tmpObj = { ...x }
            tmpObj = { ...tmpObj, checked: false }
            if (parseInt(tmpObj.package) == 1) {
              setBaseMembership(tmpObj);
            } else {
              tmpSubList = [...tmpSubList, tmpObj]
            }
          })
          setSubscriptionSettings(tmpSubList);
          if (res.cur_package) {
            setCurrentSubscription({ ...res.cur_package })
          } else {
            setCurrentSubscription(null);
          }
          dispatch(updateSubscription(res.subscription));
        })
        .catch((err) => {
          setLoading(false);
        });
    }, 2000)

  }

  const onBuy = (index) => {
    let tmpSelSubscription = null
    if (index == -1) {
      setSelSubscription({ ...baseMembership })
      tmpSelSubscription = { ...baseMembership };
      setBaseMembership({ ...baseMembership, checked: true })
      let tmpList = [...subscriptionSettings]
      tmpList = tmpList.map((x, key) => {
        let tmpObj = { ...x }
        tmpObj.checked = false;
        return tmpObj
      })
      setSubscriptionSettings(tmpList)
    } else {
      console.log("ttttttttttttt")
      Toast("For the all access membership packages, we will open from the Thursday 28th April", 2);
      return;
      setBaseMembership({ ...baseMembership, checked: false })

      let tmpList = [...subscriptionSettings]
      tmpList = tmpList.map((x, key) => {
        let tmpObj = { ...x }
        if (key == index) {
          tmpObj.checked = true;
          setSelSubscription({ ...tmpObj })
          tmpSelSubscription = { ...tmpObj };
        } else {
          tmpObj.checked = false;
        }
        return tmpObj
      })
      setSubscriptionSettings(tmpList)
    }

    handleUpdate(tmpSelSubscription);
  }
  const onCancel = (index) => {
    let tmpSelSubscription = null
    if (index == -1) {
      setSelSubscription({ ...baseMembership })
      tmpSelSubscription = { ...baseMembership };
      setBaseMembership({ ...baseMembership, checked: true })
      let tmpList = [...subscriptionSettings]
      tmpList = tmpList.map((x, key) => {
        let tmpObj = { ...x }
        tmpObj.checked = false;
        return tmpObj
      })
      setSubscriptionSettings(tmpList)
    } else {
      Toast("For the all access membership packages, we will open from the Thursday 28th April", 2);
      return;
      setBaseMembership({ ...baseMembership, checked: false })
      let tmpList = [...subscriptionSettings]
      tmpList = tmpList.map((x, key) => {
        let tmpObj = { ...x }
        if (key == index) {
          tmpObj.checked = true;
          setSelSubscription({ ...tmpObj })
          tmpSelSubscription = { ...tmpObj };
        } else {
          tmpObj.checked = false;
        }
        return tmpObj
      })
      setSubscriptionSettings(tmpList)
    }
    handleCancel();
  }
  return (
    <UserLayout>
      <Spin spinning={loading}>
        <div className='user-membership-top-rect'>
          <Tabs defaultActiveKey={selIndex} items={membershipList} onChange={onChangeUser} />
          <div style={{ marginTop: 20 }}>
            <MembershipWidget
              baseSubscriptionInfo={baseMembership}
              setBaseMembership={setBaseMembership}
              subscriptionSettings={subscriptionSettings}
              setSubscriptionSettings={setSubscriptionSettings}
              currentSubscription={currentSubscription}
              selSubscription={selSubscription}
              setSelSubscription={setSelSubscription}
              loading={loading}
              setLoading={setLoading}
              onBuy={onBuy}
              onCancel={onCancel}
            />
          </div>
        </div>
      </Spin>
    </UserLayout>
  );
};

export default Subscription;