import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Popconfirm, Form, Tooltip, Row, Col, Select, Tabs, Modal, message } from 'antd';
import AdminLayout from 'layouts/AdminLayout/AdminLayout';
import Toast from 'components/Toast/Toast';
import '../Dashboard/index.css';
import DataTable from './DataTable';
import { numberWithCommas } from 'constants/global';
import { UrlAdminGetPayment, UrlDownloadInvoice } from 'ajax/apiUrls';
import { apiGet, apiPost } from 'ajax/apiServices';

const Payment = ({ history }) => {
  const [dataSource, setDataSource] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      history.push('/admin/login');
    } else {
      setDataSource([]);
      setFilteredData([]);
      fetchData();
    }
  }, []);
  const fetchData = async () => {
    apiGet(UrlAdminGetPayment)
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
        if (res.status === "success") {
          window.open(res.url, "_target");
        } else {
          Toast("Something went wrong in while generating invoice.", 2);
        }
      })
      .catch((err) => {
        Toast(err, 2);
      });


  }

  return (
    <AdminLayout>
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
          Total: {numberWithCommas(totalAmount)} AUD
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
    </AdminLayout>
  );
};

export default Payment;