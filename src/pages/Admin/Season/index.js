import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Select, Input, DatePicker, Row, Col, Radio, Upload, message, Popconfirm, Tooltip, Switch } from 'antd';
import { EditOutlined, DeleteOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Toast from 'components/Toast/Toast';
import AdminLayout from 'layouts/AdminLayout/AdminLayout';
import axios from 'axios';
import moment from 'moment';
import dayjs from 'dayjs';

import './index.css';
import { UrlAdminDeleteSeason, UrlAdminGetSeason, UrlAdminSaveSeason } from 'ajax/apiUrls';
import { apiDelete, apiGet, apiPost } from 'ajax/apiServices';

const SeasonSettings = ({ history }) => {
  const { Option } = Select;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [imageFileList, setImageFileList] = useState([]);

  const [seasons, setSeasons] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSeason, setEditingSeason] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });



  const handleChange = async ({ fileList: newFileList }) => {
    // Show spinner while preview is being generated
    setLoadingPreview(true);

    // // Only handle preview for the new file
    const latestFile = newFileList[0];

    if (latestFile && !latestFile.url && !latestFile.preview) {
      try {
        latestFile.preview = await getBase64(latestFile.originFileObj);
      } catch (e) {
        message.error("Preview failed");
      }
    }
    setImageFileList(newFileList)
    setLoadingPreview(false);
  };

  const handleSubmit = async (values) => {
    const { image, memberType, seasonName, seasonSubName, startDate, endDate, status, registration_start_date, registration_end_date, seasonDetail, uiType, leagueTraing, reg_cost, booking_fee, limit, priority_order } = values;
    // Check if the dates are valid
    if (!startDate || !endDate || !registration_start_date || !registration_end_date) {
      message.error('Please ensure all dates are valid');
      return;
    }
    const imageFile = image?.[0]?.originFileObj;
    const seasonData = {
      id: editingSeason?.key ? editingSeason?.key : "",
      memberType,
      seasonName,
      seasonSubName,
      startDate: startDate.isValid() ? startDate.format('DD-MM-YYYY') : null,
      endDate: endDate.isValid() ? endDate.format('DD-MM-YYYY') : null,
      status: status === 'Open' ? '1' : '0',
      registration_start_date: registration_start_date.isValid() ? registration_start_date.format('DD-MM-YYYY') : null,
      registration_end_date: registration_end_date.isValid() ? registration_end_date.format('DD-MM-YYYY') : null,
      seasonDetail,
      leagueTraing: leagueTraing == 'Applicable' ? '1' : '0',
      uiType,
      reg_cost,
      booking_fee,
      limit,
      priority_order,
      imageFile
    };
    apiPost(UrlAdminSaveSeason, seasonData)
      .then((res) => {
        fetchData();
        Toast('Season saved successfully', 1);
        resetForm();
      })
      .catch((err) => {
        Toast(err, 2);
      });
  };



  const deleteRow = async (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    setPagination((prevPagination) => ({
      ...prevPagination,
      total: newData.length,
      current: Math.ceil(newData.length / prevPagination.pageSize),
    }));


    apiDelete(`${UrlAdminDeleteSeason}${key}`)
      .then((res) => {
        Toast('Deleted successfully!', 1);
      })
      .catch((err) => {
        Toast(err, 2);
      });
  };

  const resetForm = () => {
    setEditingSeason(null);
    setIsModalVisible(false);
  };

  const handleEdit = (record) => {
    setEditingSeason(record);
    setIsModalVisible(true);
    setImageFileList(record?.image_path ? [
      {
        uid: '-1',
        name: 'image.jpg',
        status: 'done',
        url: record?.image_path,
      },
    ] : [])
  };

  const columns = [
    {
      title: 'Type',
      dataIndex: 'memberType',
      sorter: (a, b) => a.memberType.localeCompare(b.memberType)
    },
    {
      title: 'Season Name',
      dataIndex: 'seasonName',
      sorter: (a, b) => a.seasonName.localeCompare(b.seasonName)
    },
    {
      title: 'Season SubTitle',
      dataIndex: 'seasonSubName',
      sorter: (a, b) => a.seasonSubName.localeCompare(b.seasonSubName)
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      render: (date) => date ? moment(date).format('DD-MM-YYYY') : '',
      sorter: (a, b) => moment(a.startDate).valueOf() - moment(b.startDate).valueOf()
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      render: (date) => date ? moment(date).format('DD-MM-YYYY') : '',
      sorter: (a, b) => moment(a.endDate).valueOf() - moment(b.endDate).valueOf()
    },
    {
      title: 'Registration Start Date',
      dataIndex: 'registration_start_date',
      render: (date) => date ? moment(date).format('DD-MM-YYYY') : '',
      sorter: (a, b) => moment(a.registration_start_date).valueOf() - moment(b.registration_start_date).valueOf()
    },
    {
      title: 'Registration End Date',
      dataIndex: 'registration_end_date',
      render: (date) => date ? moment(date).format('DD-MM-YYYY') : '',
      sorter: (a, b) => moment(a.registration_end_date).valueOf() - moment(b.registration_end_date).valueOf()
    },
    {
      title: 'UI Type',
      dataIndex: 'uiType',
    },
    {
      title: 'League Traings',
      dataIndex: 'leagueTraing',
      render: (_, record) => (
        <span>{record.leagueTraing == '1' ? 'Applicable' : 'Not Applicable'}</span>
      ),
    },
    {
      title: 'Limit',
      dataIndex: 'limit',
      render: (_, record) => (
        <span>{parseInt(record.limit) == 0 ? 'None' : record.limit}</span>
      ),
    },
    {
      title: 'Priority Order',
      dataIndex: 'priority_order',
      sorter: (a, b) => a.priority_order - b.priority_order
    },
    {
      title: 'Registration Cost',
      dataIndex: 'reg_cost',
      render: (_, record) => (
        <span>{parseFloat(record.reg_cost).toFixed(2) + ' AUD'}</span>
      ),
    },
    {
      title: 'Booking Fee',
      dataIndex: 'booking_fee',
      render: (_, record) => (
        <span>{parseFloat(record.booking_fee).toFixed(2) + ' AUD'}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, record) => (
        <span>{record.status === '1' ? 'Open' : 'Close'}</span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        return (
          <>
            <Button onClick={() => handleEdit(record)} className="btn-edit-season">
              <EditOutlined />
            </Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteRow(record.key)}>
              <Button type="link" className="btn-admin-delete"><DeleteOutlined /></Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      history.push('/admin/login');
    } else {
      fetchData();
    }
  }, []);
  const fetchData = async () => {
    apiGet(UrlAdminGetSeason)
      .then((res) => {
        const fetchedSeasons = res
          .filter(item => item.is_deleted != 1)
          .map(item => ({
            key: item.id,
            memberType: item.type,
            seasonName: item.name || '',
            seasonSubName: item.sub_title || '',
            startDate: item.start_date ? moment(item.start_date) : null,
            endDate: item.end_date ? moment(item.end_date) : null,
            status: item.status,
            registration_start_date: item.registration_start_date ? moment(item.registration_start_date) : null,
            registration_end_date: item.registration_end_date ? moment(item.registration_end_date) : null,
            seasonDetail: item.detail,
            uiType: item.ui_type,
            leagueTraing: item.league_traing,
            reg_cost: item.reg_cost,
            booking_fee: item.booking_fee,
            limit: item.limit,
            priority_order: item.priority_order,
            image_path: item.image_path
          }));

        setDataSource(fetchedSeasons);
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: fetchedSeasons.length,
        }));
      })
      .catch((err) => {
        Toast(err, 2);
      });
  };

  const parseDate = (date) => {
    // If it's already a dayjs object, just return it; if it's a string, parse it
    return date ? (dayjs.isDayjs(date) ? date : dayjs(date)) : null;
  };

  const handleAddSeason = () => {
    setEditingSeason(null);
    resetForm();
    setIsModalVisible(true);
  }

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleCancel = () => setPreviewOpen(false);
  return (
    <AdminLayout>
      <Row className="d-flex justify-end">
        <Col>
          <Button type="primary" onClick={handleAddSeason} style={{ height: '44px', marginLeft: '10px' }}>
            Add Season
          </Button>
        </Col>
      </Row>

      <Table
        dataSource={dataSource}
        columns={columns}
        style={{ marginTop: '16px' }}
        pagination={pagination}
      />

      <Modal
        key={editingSeason?.key}
        title={editingSeason ? "Edit Season" : "Add Season"}
        visible={isModalVisible}
        onCancel={resetForm}
        width="1000px"
        footer={null}
      >
        <Form
          onFinish={handleSubmit}
          initialValues={{
            memberType: editingSeason?.memberType || '',
            seasonName: editingSeason?.seasonName || '',
            seasonSubName: editingSeason?.seasonSubName || '',
            startDate: parseDate(editingSeason?.startDate),
            endDate: parseDate(editingSeason?.endDate),
            seasonDetail: editingSeason?.seasonDetail || '',
            uiType: editingSeason?.uiType || '',
            registration_start_date: parseDate(editingSeason?.registration_start_date),
            registration_end_date: parseDate(editingSeason?.registration_end_date),
            leagueTraing: editingSeason
              ? editingSeason.leagueTraing === '1'
                ? 'Applicable'
                : 'Not Applicable'
              : 'Applicable',
            status: editingSeason
              ? editingSeason.status === '1'
                ? 'Open'
                : 'Close'
              : 'Open',
            reg_cost: editingSeason ? editingSeason.reg_cost : 0,
            booking_fee: editingSeason ? editingSeason.booking_fee : 0,
            limit: editingSeason ? editingSeason.limit : 0,
            priority_order: editingSeason ? editingSeason.priority_order : 0,
            image: editingSeason?.image_path ? [
              {
                uid: '-1',
                name: 'image.jpg',
                status: 'done',
                url: editingSeason?.image_path,
              },
            ] : []
          }}
          className="mt-20 admin-season"
        >
          <Row gutter={[4, 4]}>
            <Col sm={24}><Form.Item
              label="Season Brand"
              name="image"
              valuePropName="file"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
              rules={[{ required: false, message: 'Please upload a brand!' }]}
            >
              <Upload
                listType="picture-card"
                maxCount={1}
                fileList={imageFileList}
                beforeUpload={() => false}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                <div>
                  {loadingPreview ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>
                    {loadingPreview ? 'Processing...' : 'Upload'}
                  </div>
                </div>
              </Upload>
            </Form.Item>
            </Col>
            <Col sm={12}><Form.Item
              label="Set Type"
              name="memberType"
              rules={[{ required: true, message: '' }]}
            >
              <Select placeholder="Select Type">
                <Option value="CBL">CBL</Option>
                <Option value="JCBL">JCBL</Option>
                <Option value="High School">High School</Option>
                <Option value="Academy">Academy</Option>
              </Select>
            </Form.Item>
            </Col>
            <Col sm={12}>
            </Col>
            <Col sm={12}><Form.Item
              label="Season Title"
              name="seasonName"
              rules={[{ required: true, message: '' }]}
            >
              <Input placeholder="Enter Season Title" />
            </Form.Item>
            </Col>
            <Col sm={12}><Form.Item
              label="Season SubTitle"
              name="seasonSubName"
              rules={[{ required: false, message: '' }]}
            >
              <Input placeholder="Enter Season SubTItle" />
            </Form.Item>
            </Col>
            <Col sm={12}><Form.Item
              label="Season Start Date"
              name="startDate"
              rules={[{ required: true, message: 'Start Date is required' }]}
            >
              <DatePicker
                placeholder="Select Start Date"
                format="DD-MM-YYYY"
                value={editingSeason?.startDate ? moment(editingSeason.startDate, "YYYY-MM-DD") : null}
              />
            </Form.Item>
            </Col>
            <Col sm={12}><Form.Item
              label="Season End Date"
              name="endDate"
              rules={[{ required: true, message: 'End Date is required' }]}
            >
              <DatePicker
                placeholder="Select End Date"
                format="DD-MM-YYYY"
                value={editingSeason?.endDate ? moment(editingSeason.endDate, "YYYY-MM-DD") : null}
              />
            </Form.Item>
            </Col>
            <Col sm={12}><Form.Item
              label="Registration Start Date"
              name="registration_start_date"
              rules={[{ required: true, message: 'Registration Start Date is required' }]}
            >
              <DatePicker
                placeholder="Select Registration Start Date"
                format="DD-MM-YYYY"
                value={editingSeason?.registration_start_date ? moment(editingSeason.registration_start_date, "YYYY-MM-DD") : null}
              />
            </Form.Item>
            </Col>
            <Col sm={12}><Form.Item
              label="Registration End Date"
              name="registration_end_date"
              rules={[{ required: true, message: 'Registration End Date is required' }]}
            >
              <DatePicker
                placeholder="Select Registration End Date"
                format="DD-MM-YYYY"
                value={editingSeason?.registration_end_date ? moment(editingSeason.registration_end_date, "YYYY-MM-DD") : null}
              />
            </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={24}>
              <Form.Item
                label="Detail information"
                name="seasonDetail"
              >
                <Input.TextArea rows={5} placeholder="" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[4, 4]}>
            <Col sm={12}><Form.Item
              label="UI Type"
              name="uiType"
              rules={[{ required: true, message: '' }]}
            >
              <Select placeholder="Select UI Type">
                <Option value="Individual">Individual</Option>
                <Option value="Team">Team</Option>
              </Select>
            </Form.Item>
            </Col>
            <Col sm={12}>
              <Form.Item
                label="League Traings"
                name="leagueTraing"
                rules={[{ required: true, message: '' }]}
              >
                <Radio.Group value={editingSeason?.leagueTraing == '1' ? 'Applicable' : 'Not Applicable'}>
                  <Radio value="Applicable">Applicable</Radio>
                  <Radio value="Not Applicable">Not Applicable</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col sm={12}><Form.Item
              label="Registration Cost"
              name="reg_cost"
              rules={[{ required: false, message: '' }]}
            >
              <Input placeholder="Enter Registration Cost" type='number' />
            </Form.Item>
            </Col>
            <Col sm={12}><Form.Item
              className='form-item-booking'
              label="Booking Fee (Only Charged to non-members)"
              name="booking_fee"
              rules={[{ required: false, message: '' }]}
            >
              <Input placeholder="Enter Booking Fee" type='number' />
            </Form.Item>
            </Col>
            <Col sm={12}>
              <Form.Item
                label="Member Limit"
                name="limit"
              >
                <Input
                  name="limit"
                  type='number'
                  suffix={"Members"}
                  min={0}
                  placeholder="Limit"
                />
              </Form.Item>
            </Col>
            <Col sm={12}>
              <Form.Item
                label="Priority Order"
                name="priority_order"
                rules={[{ required: true, message: 'Priority Order is required' }]}
              >
                <Input
                  name="priority_order"
                  type='number'
                  min={0}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Status" name="status">
            <Radio.Group value={editingSeason?.status === '1' ? 'Open' : 'Close'}>
              <Radio value="Open">Open</Radio>
              <Radio value="Close">Close</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <div className="d-flex justify-end">
              <Button type="primary" htmlType="submit">Save</Button>
              <Button style={{ marginLeft: '8px' }} onClick={resetForm}>Cancel</Button>
            </div>
          </Form.Item>
        </Form>
      </Modal >
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </AdminLayout >
  );
};

export default SeasonSettings;