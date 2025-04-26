import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Popconfirm, Form, Tooltip, Row, Col, Select, Tabs, Modal, message } from 'antd';
import { Link, useLocation } from "react-router-dom";
import { DeleteOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons';
import AdminLayout from 'layouts/AdminLayout/AdminLayout';
import Toast from 'components/Toast/Toast';
import '../Dashboard/index.css';
import { showAddIndividualPlayerDlg } from './AddIndividualPlayerDlg/showAddIndividualPlayerDlg';
import { showAddTeamPlayerDlg } from './AddTeamPlayerDlg/showAddTeamPlayerDlg';
import { UrlAdminDeleteInvidualPlayer, UrlAdminDeleteTeamPlayer, UrlAdminGetInvidualPlayerSeason, UrlAdminGetSeasonType, UrlAdminSelectSeason, UrlAdminUpdateInvidualPlayer } from 'ajax/apiUrls';
import { apiDelete, apiPost } from 'ajax/apiServices';
import { useSelector } from 'react-redux';


const CBL = ({ history }) => {
  const adminInfo = useSelector((state) => state.admin)
  const [dataSource, setDataSource] = useState([]);
  const [title, setTitle] = useState("");
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [seasonList, setSeasonList] = useState([]);
  const [uiType, setUiType] = useState("Individual");
  const [selectedSeason, setSelectedSeason] = useState("");
  const location = useLocation();


  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      history.push('/admin/login');
    } else {
      fetchSeason();
    }
  }, [location.pathname]);

  useEffect(() => {
    fetchData();
  }, [uiType])

  const fetchData = async (tmpSeason = selectedSeason) => {
    const formData = new FormData();
    formData.append('route', location.pathname);
    formData.append('ui_type', uiType);
    formData.append('season', tmpSeason);

    apiPost(UrlAdminGetInvidualPlayerSeason, formData)
      .then((res) => {
        setTitle(res.season_type);
        const fetchedData = res.season_data.map((item, index) => ({
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

  const getData = (tmpValue = selectedSeason) => {
    const formData = new FormData();
    formData.append('type', title); // ensure 'title' is defined in your scope
    formData.append('season', tmpValue);
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
  }
  const fetchSeason = async () => {
    const formData = new FormData();
    formData.append('route', location.pathname);
    formData.append('ui_type', uiType);
    apiPost(UrlAdminGetSeasonType, formData)
      .then((res) => {
        setSeasonList(res.season_types);
        if (res.season_types.length > 0) {
          let tmpSeason = res.season_types.map((season) => ({
            value: season.name,
            label: season.name,
          }))[0]
          setSelectedSeason(tmpSeason)
          fetchData(tmpSeason)
        } else {
          fetchData("");
        }
      })
      .catch((err) => {
        Toast(err, 2);
      });
  };


  const handleEdit = async (record) => {
    let tmpList = [...seasonList]
    tmpList = tmpList.filter((x) => x.ui_type == uiType)
    if (tmpList.length == 0) {
      message.error("There is no season for " + uiType);
      return;
    }
    let dlgRes = uiType == "Individual" ? await showAddIndividualPlayerDlg({
      seasons: tmpList,
      data: record,
      adminInfo,
      title: "Update Individual Registration"
    }) : await showAddTeamPlayerDlg({
      seasons: tmpList,
      data: record,
      adminInfo,
      title: "Update Team Registration"
    })
    if (dlgRes == null) return
    fetchData();
  };

  const deleteRow = async (key, type) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    setFilteredData(newData);

    const total = newData.length;
    const current = pagination.current > Math.ceil(total / pagination.pageSize) ? Math.ceil(total / pagination.pageSize) : pagination.current;
    setPagination({ ...pagination, total, current });

    if (type == "team") {
      apiDelete(`${UrlAdminDeleteTeamPlayer}${key}`)
        .then((res) => {
          Toast('Deleted successfully!', 1);
        })
        .catch((err) => {
          Toast(err, 2);
        });
    } else {
      apiDelete(`${UrlAdminDeleteInvidualPlayer}${key}`)
        .then((res) => {
          Toast('Deleted successfully!', 1);
        })
        .catch((err) => {
          Toast(err, 2);
        });
    }


  };





  const handlePageSizeChange = (value) => {
    setPagination({ ...pagination, pageSize: value, current: 1 });
  };


  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = dataSource.filter(item =>
      Object.values(item).some(val => String(val).toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredData(filtered);
    setPagination({ ...pagination, current: 1 });
  };


  const columns = [
    // Define your columns here (same as before)
    {
      title: 'No',
      dataIndex: 'no',
      render: (_, record, index) => {
        const { current, pageSize } = pagination;
        const displayIndex = (current - 1) * pageSize + index + 1;
        return displayIndex;
      },
      width: '5%',
    },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Gender', dataIndex: 'gender' },
    { title: 'Birthday', dataIndex: 'birthday' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Phone Number', dataIndex: 'phone_number' },
    { title: 'Season', dataIndex: 'season_name' },
    { title: 'Status', render: (text, record) => { return record.is_wait == "true" ? "On Waiting" : "Active" } },

    { title: 'Created By', render: (text, record) => { return record.user_id == "0" ? "Admin" : record.first_name + " " + record.last_name } },
    { title: 'Created At', dataIndex: 'created_at' },
    {
      title: 'Invoice',
      dataIndex: 'action',
      render: (_, record) => {

        return record.invoice_pdf ? <Button type="primary" onClick={() => handleDownload(record)}>
          <DownloadOutlined /> Download Invoice
        </Button> : "None"
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        return <>
          <Button onClick={() => handleEdit(record)} className="btn-edit-season">
            <EditOutlined />
          </Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => deleteRow(record.key, "individual")}>
            <Button type="link" className="btn-admin-delete"><DeleteOutlined /></Button>
          </Popconfirm>
        </>;
      },
    },
  ];

  const team_columns = [
    {
      title: 'No',
      dataIndex: 'no',
      render: (_, record, index) => {
        const { current, pageSize } = pagination;
        const displayIndex = (current - 1) * pageSize + index + 1;
        return displayIndex;
      },
    },
    { title: 'School Name', dataIndex: 'school_name' },
    { title: 'Contact Number', dataIndex: 'contact_number' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Team Name', dataIndex: 'team_name' },
    { title: 'Player Number', dataIndex: 'player_number' },
    { title: 'Coach Name', dataIndex: 'coach_name' },
    { title: 'Coach Email', dataIndex: 'coach_email' },
    { title: 'Created By' },
    { title: 'Created At', dataIndex: 'created_at' },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        return <>
          <Button onClick={() => handleEdit(record)} className="btn-edit-season">
            <EditOutlined />
          </Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => deleteRow(record.key, "team")}>
            <Button type="link" className="btn-admin-delete"><DeleteOutlined /></Button>
          </Popconfirm>
        </>;
      },
    },
  ];

  const items = [
    {
      key: 'Individual',
      label: 'Individual',
      children: '',
    },
    {
      key: 'Team',
      label: 'Team',
      children: '',
    },
  ];

  const onChange = (key) => {
    setSearchText("");
    setUiType(key);
  };

  const handleDownload = async (record) => {
    window.open(record.invoice_pdf, "_target");
  }

  const handleAdd = async () => {
    let tmpList = [...seasonList]
    tmpList = tmpList.filter((x) => x.ui_type == uiType)
    if (tmpList.length == 0) {
      message.error("There is no season for " + uiType);
      return;
    }
    let dlgRes = uiType == "Individual" ? await showAddIndividualPlayerDlg({
      seasons: tmpList,
      title: "Individual Registration",
      adminInfo
    }) : await showAddTeamPlayerDlg({
      seasons: tmpList,
      title: "Team Registration",
      adminInfo
    })
    if (dlgRes == null) return
    fetchData();
  }
  return (
    <AdminLayout>
      <Row className="table-nav">
        <Col className='d-flex admin-season-selection'>
          <Select
            showSearch
            style={{ marginBottom: '11px', width: '250px' }}
            placeholder="Select a season"
            value={selectedSeason || undefined}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={seasonList.map((season) => ({
              value: season.name,
              label: season.name,
            }))}
            allowClear
            onChange={async (value) => {
              let tmpValue = value
              if (value == undefined) {
                tmpValue = "";
              }
              setSelectedSeason(tmpValue);  // Set selected season
              if (tmpValue == "") {
                setDataSource([]);
                setFilteredData([]);
                fetchData();
              } else {
                getData(tmpValue)
              }
            }}
          />
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
        <Tabs defaultActiveKey={uiType} items={items} onChange={onChange} />
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid #f0f0f0', borderRadius: '4px', overflowY: 'hidden' }}>
        <Form form={form} component={false}>
          {uiType == "Individual" && (
            <Table
              rowKey="key"
              pagination={{
                ...pagination,
                total: filteredData.length,
                onChange: (page, pageSize) => setPagination({ current: page, pageSize }),
                showSizeChanger: true,
                onShowSizeChange: handlePageSizeChange,
              }}
              dataSource={filteredData.slice((pagination.current - 1) * pagination.pageSize, pagination.current * pagination.pageSize)}
              columns={columns}
            />
          )}

          {uiType == "Team" && (
            <Table
              rowKey="key"
              pagination={{
                ...pagination,
                total: filteredData.length,
                onChange: (page, pageSize) => setPagination({ current: page, pageSize }),
                showSizeChanger: true,
                onShowSizeChange: handlePageSizeChange,
              }}
              dataSource={filteredData.slice((pagination.current - 1) * pagination.pageSize, pagination.current * pagination.pageSize)}
              columns={team_columns}
            />
          )}
        </Form>
      </div>

    </AdminLayout>
  );
};

export default CBL;