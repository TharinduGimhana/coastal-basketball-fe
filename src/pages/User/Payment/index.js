import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Popconfirm, Form, Tooltip, Row, Col, Select, Tabs, Modal, message } from 'antd';
import UserLayout from 'layouts/UserLayout/UserLayout';
import Toast from 'components/Toast/Toast';
import './index.css';
import DataTable from './DataTable';
import { numberWithCommas } from 'constants/global';
import { apiPost } from 'ajax/apiServices';
import { UrlAdminGetPayment, UrlDownloadInvoice, UrlGetUserPayment } from 'ajax/apiUrls';
import { useSelector } from 'react-redux';

const Payment = ({ history }) => {
  const userInfo = useSelector((state) => state.user);
  const [dataSource, setDataSource] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/signin');
    } else {
      setDataSource([]);
      setFilteredData([]);
      fetchData();
    }
  }, []);
  const fetchData = async () => {
    const formData = new FormData();
    formData.append('email', userInfo.email);
    apiPost(UrlGetUserPayment, formData)
      .then((res) => {
        setTotalAmount(res.total);
        const fetchedData = res.payments.map((item, index) => ({
          ...item,
          key: String(item.id),
        }));
        setDataSource(fetchedData);
        setFilteredData(fetchedData);
      })
      .catch((err) => {
        Toast(err, 2);
      });
  };


  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = dataSource.filter(item =>
      Object.values(item).some(val => String(val).toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredData(filtered);
    setPagination({ ...pagination, current: 1 });
  };

  const handleDownload = async (record) => {
    const formData = new FormData();
    formData.append('id', record.id);
    apiPost(UrlDownloadInvoice, formData)
      .then((res) => {
        console.log("res:", res)
      })
      .catch((err) => {
        Toast(err, 2);
      });
  }

  return (
    <UserLayout>
      <div className='page-title'>Transaction History</div>
      <Row className="table-nav">
        <Col className='d-flex'>
          <Input
            placeholder="Search..."
            value={searchText}
            allowClear={true}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Col>
        <Col style={{ fontWeight: 500, fontSize: 16 }}>
          Total Paid: {numberWithCommas(totalAmount)} AUD
        </Col>
      </Row>


      <div style={{ overflowX: 'auto', marginTop: 20, border: '1px solid #f0f0f0', borderRadius: '4px', overflowY: 'hidden' }}>
        <DataTable
          filteredData={filteredData}
          pagination={pagination}
          setPagination={setPagination}
          handleDownload={handleDownload}
        />
      </div>
    </UserLayout>
  );
};

export default Payment;