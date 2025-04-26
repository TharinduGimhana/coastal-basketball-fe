import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Table, Button, Input, Popconfirm, Form, Tooltip, Row, Col, Select, Tabs, Modal, message } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { DeleteOutlined, SaveOutlined, ReloadOutlined, EditOutlined } from '@ant-design/icons';
import AdminLayout from 'layouts/AdminLayout/AdminLayout';
import Toast from 'components/Toast/Toast';
import '../Dashboard/index.css';
import CorporateTable from './CorporateTable';
import { showAddCorporatePartnerDlg } from './AddCorporatePartnerDlg/showAddCorporatePartnerDlg';
import PlayerTable from './PlayerTable';
import { showAddPlayerDlg } from './AddPlayerDlg/showAddPlayerDlg';
import { apiDelete, apiPost } from 'ajax/apiServices';
import { UrlAdminDeleteCoporatePartner, UrlAdminDeletePlayerPartner, UrlAdminGetCoporatePartners, UrlAdminGetPlayerPartners, UrlAdminSelectSeason } from 'ajax/apiUrls';

const Partner = ({ history }) => {
  const [dataSource, setDataSource] = useState([]);
  const [title, setTitle] = useState("");


  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const typeList = [
    { value: "CBL", label: "CBL" },
    { value: "JCBL", label: "JCBL" },
    { value: "Academy", label: "Academy" },
    { value: "High School", label: "High School" },
    { value: "United", label: "United" }]

  const [uiType, setUiType] = useState("CORPORATE PARTNERS");

  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });

  const [selectedType, setSelectedType] = useState("");
  const tabItems = [
    {
      key: 'CORPORATE PARTNERS',
      label: 'CORPORATE PARTNERS',
      children: '',
    },
    {
      key: 'PLAYER PARTNERSHIPS',
      label: 'PLAYER PARTNERSHIPS',
      children: '',
    },
  ]

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      history.push('/admin/login');
    } else {
      setDataSource([]);
      setFilteredData([]);
      fetchData();
    }
  }, [uiType]);


  const fetchData = async () => {
    const formData = new FormData();
    formData.append('type', selectedType);
    let dataUrl = UrlAdminGetCoporatePartners;
    if (uiType != "CORPORATE PARTNERS") {
      dataUrl = UrlAdminGetPlayerPartners;
    }

    apiPost(dataUrl, formData)
      .then((res) => {
        const fetchedData = res.map((item, index) => ({
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

  const handleEdit = async (record) => {
    let dlgRes = uiType == "CORPORATE PARTNERS" ? await showAddCorporatePartnerDlg({
      typeList: typeList,
      info: record,
      title: "Edit Corporate Partner"
    }) : await showAddPlayerDlg({
      seasons: typeList,
      info: record,
      title: "Edit Player Partnership"
    })
    if (dlgRes == null) return
    fetchData();
  };

  const deleteRow = async (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    setFilteredData(newData);

    const total = newData.length;
    const current = pagination.current > Math.ceil(total / pagination.pageSize) ? Math.ceil(total / pagination.pageSize) : pagination.current;
    setPagination({ ...pagination, total, current });

    let deleteUrl = `${UrlAdminDeleteCoporatePartner}${key}`;
    if (uiType != "CORPORATE PARTNERS") {
      deleteUrl = `${UrlAdminDeletePlayerPartner}${key}`;
    }

    apiDelete(deleteUrl)
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



  const onChange = (key) => {
    setSearchText("");
    setUiType(key);
  };

  const handleAdd = async () => {

    let dlgRes = uiType == "CORPORATE PARTNERS" ? await showAddCorporatePartnerDlg({
      typeList: typeList,
      title: "Add Corporate Partner"
    }) : await showAddPlayerDlg({
      seasons: typeList,
      title: "Add Player Partnership"
    })
    if (dlgRes == null) return
    fetchData();
  }
  return (
    <AdminLayout>
      <Row className="table-nav">
        <Col className='d-flex'>
          {uiType == "CORPORATE PARTNERS" && <Select
            showSearch
            style={{ marginBottom: '11px', width: '250px' }}
            placeholder="Select a type"
            value={selectedType || undefined}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={typeList}
            onChange={async (value) => {
              setSelectedType(value);  // Set selected season
              const formData = new FormData();
              formData.append('type', title); // ensure 'title' is defined in your scope
              formData.append('season', value);
              formData.append("ui_type", uiType);

              apiPost(UrlAdminSelectSeason, formData)
                .then((res) => {
                  let response_result = [...res];

                  // Map the response data to include unique keys
                  const fetchedData = response_result.map((item) => ({
                    ...item,
                    key: String(item.id),
                  }));

                  // Update the table data source
                  setDataSource(fetchedData);
                  setFilteredData(fetchedData);
                })
                .catch((err) => {
                  Toast(err, 2);
                });

            }}
          />}
        </Col>
        <Col>
          <Row justify={'center'} align={'middle'} gutter={[16, 16]}>
            <Col><Input
              placeholder="Search..."
              value={searchText}
              allowClear={true}
              onChange={(e) => handleSearch(e.target.value)}
            /></Col>
            <Col><Button type="primary" onClick={handleAdd} style={{ height: '38px' }}>
              Add
            </Button></Col>
          </Row>
        </Col>
      </Row>

      <div>
        <Tabs defaultActiveKey={uiType} items={tabItems} onChange={onChange} />
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid #f0f0f0', borderRadius: '4px', overflowY: 'hidden' }}>
        {uiType == "CORPORATE PARTNERS" ? (
          <CorporateTable
            filteredData={filteredData}
            handleEdit={handleEdit}
            deleteRow={deleteRow}
            pagination={pagination}
            setPagination={setPagination}
          />
        ) : <PlayerTable
          filteredData={filteredData}
          handleEdit={handleEdit}
          deleteRow={deleteRow}
          pagination={pagination}
          setPagination={setPagination}
        />}
      </div>
    </AdminLayout>
  );
};

export default Partner;