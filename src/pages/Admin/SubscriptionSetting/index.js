import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Popconfirm, Form, Tooltip, Row, Col, Select, Tabs, Modal, message } from 'antd';
import AdminLayout from 'layouts/AdminLayout/AdminLayout';
import Toast from 'components/Toast/Toast';
import { showAddSettingDlg } from './AddSettingDlg/showAddSettingDlg';
import DataTable from './DataTable';
import { UrlAdminDeleteBenefit, UrlAdminDeleteBillingFrequency, UrlAdminDeletePackageType, UrlAdminDeleteSubscriptionSetting, UrlAdminGetSubscriptionSetting } from 'ajax/apiUrls';
import { apiDelete, apiGet } from 'ajax/apiServices';
import './index.css';
import PackageTypeTable from './PackageTypeTable';
import BillingFrequencyTable from './BillingFrequencyTable';
import BenefitTable from './BenefitTable';
import { showAddBillingFrequencyModal } from './AddBillingFrequencyModal/showAddBillingFrequencyModal';
import { showAddPackageTypeModal } from './AddPackageTypeModal/showAddPackageTypeModal';
import { showAddBenefitModal } from './AddBenefitModal/showAddBenefitModal';
const SubscriptionSetting = ({ history }) => {
  const [dataSource, setDataSource] = useState([]);
  const [billingFreqList, setBillingFreqList] = useState([]);
  const [packageTypeList, setPackageTypeList] = useState([]);
  const [benefitList, setBenefitList] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      history.push('/admin/login');
    } else {
      fetchData();
    }
  }, []);
  const fetchData = async () => {
    apiGet(UrlAdminGetSubscriptionSetting)
      .then((res) => {
        const tmpPackages = res.packages.map((item, index) => ({
          ...item,
          key: index,
        }));
        setDataSource(tmpPackages);

        const tmpBillingFreqList = res.billing_frequency.map((item, index) => ({
          ...item,
          key: String(item.id),
        }));
        setBillingFreqList(tmpBillingFreqList);

        const tmpPackageTypes = res.package_type.map((item, index) => ({
          ...item,
          key: String(item.id),
        }));
        setPackageTypeList(tmpPackageTypes);

        const tmpBenefits = res.benefit.map((item, index) => ({
          ...item,
          key: String(item.id),
        }));
        setBenefitList(tmpBenefits);
      })
      .catch((err) => {

      });


  };

  const handleAdd = async () => {
    let dlgRes = await showAddSettingDlg({
      title: "Add Membership Setting",
      packageTypeList: packageTypeList,
      billingFreqList,
      benefitList
    })
    if (dlgRes == null) return
    fetchData();
  }
  const handleEdit = async (record) => {
    let dlgRes = await showAddSettingDlg({
      info: record,
      title: "Edit Membership Setting",
      packageTypeList,
      billingFreqList,
      benefitList
    })
    if (dlgRes == null) return
    fetchData();
  };

  const deleteRow = async (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    const total = newData.length;
    const current = pagination.current > Math.ceil(total / pagination.pageSize) ? Math.ceil(total / pagination.pageSize) : pagination.current;
    setPagination({ ...pagination, total, current });
    apiDelete(`${UrlAdminDeleteSubscriptionSetting}${dataSource[key].id}`)
      .then((res) => {
        Toast('Deleted successfully!', 1);
      })
      .catch((err) => {
        Toast(err, 2);
      });

  };
  const handleAddBillingFreq = async () => {

    let dlgRes = await showAddBillingFrequencyModal({
      title: "Add Billing Frequency"
    })
    if (dlgRes == null) return
    fetchData();
  }

  const handleEditBillingFreq = async (record) => {
    let dlgRes = await showAddBillingFrequencyModal({
      info: record,
      title: "Edit Billing Frequency"
    })
    if (dlgRes == null) return
    fetchData();
  };

  const deleteBillingFreqRow = async (key) => {
    const newData = billingFreqList.filter((item) => item.key !== key);
    setBillingFreqList(newData);

    apiDelete(`${UrlAdminDeleteBillingFrequency}${key}`)
      .then((res) => {
        Toast('Deleted successfully!', 1);
      })
      .catch((err) => {
        Toast(err, 2);
      });
  };


  const handleAddPackageType = async () => {

    let dlgRes = await showAddPackageTypeModal({
      title: "Add Package Type"
    })
    if (dlgRes == null) return
    fetchData();
  }

  const handleEditPackageType = async (record) => {
    let dlgRes = await showAddPackageTypeModal({
      info: record,
      title: "Edit Package Type"
    })
    if (dlgRes == null) return
    fetchData();
  };

  const deletePackageType = async (key) => {
    const newData = packageTypeList.filter((item) => item.key !== key);
    setPackageTypeList(newData);

    apiDelete(`${UrlAdminDeletePackageType}${key}`)
      .then((res) => {
        Toast('Deleted successfully!', 1);
      })
      .catch((err) => {
        Toast(err, 2);
      });
  };

  const handleAddBenefit = async () => {

    let dlgRes = await showAddBenefitModal({
      title: "Add Package Benefit"
    })
    if (dlgRes == null) return
    fetchData();
  }

  const handleEditPackagBenefit = async (record) => {
    let dlgRes = await showAddBenefitModal({
      info: record,
      title: "Edit Package Benefit"
    })
    if (dlgRes == null) return
    fetchData();
  };

  const deletePackageBenefit = async (key) => {
    const newData = benefitList.filter((item) => item.key !== key);
    setBenefitList(newData);

    apiDelete(`${UrlAdminDeleteBenefit}${key}`)
      .then((res) => {
        Toast('Deleted successfully!', 1);
      })
      .catch((err) => {
        Toast(err, 2);
      });
  };
  return (
    <AdminLayout>
      <div>
        <Row className="table-nav">
          <Col className='d-flex'>
            <p className='sub-table-title'>Subscripion Packages</p>
          </Col>
          <Col>
            <Button type="primary" onClick={handleAdd} style={{ height: '38px' }}>
              Add
            </Button>
          </Col>
        </Row>
        <div style={{ overflowX: 'auto', marginTop: 20, border: '1px solid #f0f0f0', borderRadius: '4px', overflowY: 'hidden' }}>
          <DataTable
            filteredData={dataSource}
            handleEdit={handleEdit}
            deleteRow={deleteRow}
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      </div>
      <Row style={{ marginTop: 40 }} gutter={[36, 12]}>
        <Col md={8} xs={24}>
          <>
            <Row className="table-nav">
              <Col className='d-flex'>
                <p className='sub-table-title'>Billing Frequency</p>
              </Col>
              <Col>
                <Button type="primary" onClick={handleAddBillingFreq} style={{ height: '38px' }}>
                  Add
                </Button>
              </Col>
            </Row>
            <div style={{ overflowX: 'auto', marginTop: 20, border: '1px solid #f0f0f0', borderRadius: '4px', overflowY: 'hidden' }}>
              <BillingFrequencyTable
                filteredData={billingFreqList}
                handleEdit={handleEditBillingFreq}
                deleteRow={deleteBillingFreqRow}
              />
            </div>
          </>
        </Col>
        <Col md={8} xs={24}>
          <>
            <Row className="table-nav">
              <Col className='d-flex'>
                <p className='sub-table-title'>Package Type</p>
              </Col>
              <Col>
                <Button type="primary" onClick={handleAddPackageType} style={{ height: '38px' }}>
                  Add
                </Button>
              </Col>
            </Row>
            <div style={{ overflowX: 'auto', marginTop: 20, border: '1px solid #f0f0f0', borderRadius: '4px', overflowY: 'hidden' }}>
              <PackageTypeTable
                filteredData={packageTypeList}
                handleEdit={handleEditPackageType}
                deleteRow={deletePackageType}
              />
            </div>
          </>
        </Col>
        <Col md={8} xs={24}>
          <>
            <Row className="table-nav">
              <Col className='d-flex'>
                <p className='sub-table-title'>Package Benefit</p>
              </Col>
              <Col>
                <Button type="primary" onClick={handleAddBenefit} style={{ height: '38px' }}>
                  Add
                </Button>
              </Col>
            </Row>
            <div style={{ overflowX: 'auto', marginTop: 20, border: '1px solid #f0f0f0', borderRadius: '4px', overflowY: 'hidden' }}>
              <BenefitTable
                filteredData={benefitList}
                handleEdit={handleEditPackagBenefit}
                deleteRow={deletePackageBenefit}
              />
            </div>
          </>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default SubscriptionSetting;