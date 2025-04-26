import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Popconfirm, Form, Tooltip, Row, Col, Checkbox, Tag, Tabs } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, ReloadOutlined } from '@ant-design/icons';
import moment from 'moment';
import AdminLayout from 'layouts/AdminLayout/AdminLayout';
import axios from 'axios';
import Toast from 'components/Toast/Toast';
import { showAddUserDlg } from './AddUserDlg/showAddUserDlg';
import { apiDelete, apiGet, apiPost } from 'ajax/apiServices';
import { UrlAdminBuilkDeleteUser, UrlAdminDeleteUser, UrlAdminGetWaitingUsers } from 'ajax/apiUrls';
import DataTable from './DataTable';


const WaitList = ({ history }) => {

  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tab, setTab] = useState("Full Access Users");
  const items = [
    {
      key: 'Full Access Users',
      label: 'Full Access Users',
      children: '',
    },
    {
      key: 'Wait Users',
      label: 'Wait Users',
      children: '',
    },
  ];
  const onChangeTab = (key) => {
    setSearchText("");
    setTab(key);
  };


  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      history.push('/admin/login');
    } else {
      setDataSource([])
      setFilteredData([])
      fetchData();
    }
  }, [tab]);

  const fetchData = async () => {
    const formData = new FormData();
    formData.append("type", tab);
    apiPost(UrlAdminGetWaitingUsers, formData)
      .then((res) => {
        const fetchedData = res
          .filter(item => item.is_deleted != 1)
          .map((item, index) => ({
            ...item,
            key: String(item.id),
          }));

        setDataSource(fetchedData);
        setFilteredData(fetchedData);
      })
      .catch((err) => {

      });

  };
  const handleBulkDelete = async () => {
    if (selectedRowKeys.length === 0) {
      Toast('No users selected for deletion.', 2);
      return;
    }
    const idsToDelete = selectedRowKeys;
    apiDelete(UrlAdminBuilkDeleteUser, { ids: idsToDelete })
      .then((res) => {
        const updatedData = dataSource.filter(item => !idsToDelete.includes(item.key));
        setDataSource(updatedData);
        setFilteredData(updatedData);
        setSelectedRowKeys([]);

        Toast('Selected users deleted successfully!', 1);
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

    apiDelete(`${UrlAdminDeleteUser}${key}`)
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
    let dlgRes = await showAddUserDlg({
      title: "Add User"
    })
    if (dlgRes == null) return
    Toast('Added successfully!', 1);
    fetchData();
  }
  const edit = async (record) => {
    let dlgRes = await showAddUserDlg({
      title: "Update User",
      userData: record
    })
    if (dlgRes == null) return
    Toast('Updated successfully!', 1);
    fetchData();
  };
  return (
    <AdminLayout>
      <Row className="table-nav">
        <Col className="d-flex">
          {selectedRowKeys.length > 0 && (
            <Button
              type="primary"
              danger
              onClick={handleBulkDelete}
              icon={<DeleteOutlined />}
              style={{ marginRight: '16px', marginTop: '10px', height: '33px' }}
            >
              Delete {selectedRowKeys.length} {selectedRowKeys.length > 1 ? 'Users' : 'User'}
            </Button>
          )}
          <Input
            className="mt-10"
            placeholder="Search..."
            allowClear={true}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginBottom: 10 }}
          />
        </Col>
      </Row>
      <div>
        <Tabs defaultActiveKey={tab} items={items} onChange={onChangeTab} />
      </div>
      <div className="admin-user">
        <DataTable
          dataSource={dataSource}
          filteredData={filteredData}
          pagination={pagination}
          setPagination={setPagination}
          deleteRow={deleteRow}
          edit={edit}
          selectedRowKeys={selectedRowKeys}
        />
      </div>

    </AdminLayout>
  );
};

export default WaitList;