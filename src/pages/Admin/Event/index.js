import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Popconfirm, Form, Tooltip, Row, Col, Select, Tabs, Modal, message } from 'antd';
import AdminLayout from 'layouts/AdminLayout/AdminLayout';
import Toast from 'components/Toast/Toast';
import '../Dashboard/index.css';
import DataTable from './DataTable';
import { showAddEventDlg } from './AddEventDlg/showAddEventDlg';
import { UrlAdminDeleteEvent, UrlAdminGetEvent } from 'ajax/apiUrls';
import { apiDelete, apiGet } from 'ajax/apiServices';

const Branch = ({ history }) => {
  const [dataSource, setDataSource] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      history.push('/admin/login');
    } else {
      fetchData();
    }
  }, [history]);


  const fetchData = async () => {
    apiGet(UrlAdminGetEvent)
      .then((res) => {
        const fetchedData = res.map(item => ({
          ...item,
          key: String(item.id),
          active: item.active == 'true',
        }));
        setDataSource(fetchedData);
        setFilteredData(fetchedData);
      })
      .catch((err) => {
        Toast(err, 2);
      });
  };

  const deleteRow = async (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    setFilteredData(newData);

    const total = newData.length;
    const current = pagination.current > Math.ceil(total / pagination.pageSize) ? Math.ceil(total / pagination.pageSize) : pagination.current;
    setPagination({ ...pagination, total, current });

    apiDelete(`${UrlAdminDeleteEvent}${key}`)
      .then((res) => {
        Toast('Deleted successfully!', 1);
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



  const handleAdd = async () => {
    let dlgRes = await showAddEventDlg({
      title: "Add Event"
    })
    if (dlgRes == null) return
    fetchData();
  }

  const handleEdit = async (record) => {
    let dlgRes = await showAddEventDlg({
      info: record,
      title: "Edit Event"
    })
    if (dlgRes == null) return
    fetchData();
  };

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
        <Col>
          <Button type="primary" onClick={handleAdd} style={{ height: '38px' }}>
            Add
          </Button>
        </Col>
      </Row>

      <div style={{ overflowX: 'auto', border: '1px solid #f0f0f0', marginTop: 10, borderRadius: '4px', overflowY: 'hidden' }}>
        <DataTable
          filteredData={filteredData}
          handleEdit={handleEdit}
          deleteRow={deleteRow}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </AdminLayout>
  );
};

export default Branch;