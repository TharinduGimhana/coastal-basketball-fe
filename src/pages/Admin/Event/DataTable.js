import React, { useState } from 'react'
import { Table, Button, Input, Popconfirm, Form, Tooltip, Row, Col, Select, Tabs, Modal, message, Image, Avatar, Checkbox } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
const DataTable = (props) => {
    const { filteredData, handleEdit, deleteRow, pagination, setPagination } = props;


    const columns = [
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
        {
            title: 'Image', dataIndex: 'image_path', render: (record) => {
                return <img
                    src={`${process.env.REACT_APP_API_BASE_URL}uploads/media/${record}`}
                    style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '8px' }}
                />
            }
        },
        {
            title: 'Title',
            dataIndex: 'title',
            render: (text, record) => {
                return <Tooltip title={text || 'No title available'}>
                    <span>{text}</span>
                </Tooltip>
            }
        },
        {
            title: 'Link',
            dataIndex: 'link',
            render: (text, record) => {
                return <a href={`https://${text}`} target='_blank'>
                    {`https://${text}`}
                </a>
            }
        },
        {
            title: 'Status',
            dataIndex: 'active',
            render: (text, record) => {
                return record.active == true ? "Active" : "InActive"
            }
        },

        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => {

                return <><Button onClick={() => handleEdit(record)} className="btn-edit-season">
                    <EditOutlined />
                </Button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => deleteRow(record.key)}>
                        <Button type="link" className="btn-admin-delete"><DeleteOutlined /></Button>
                    </Popconfirm></>
            },
        },
    ];

    const handlePageSizeChange = (value) => {
        setPagination({ ...pagination, pageSize: value, current: 1 });
    };


    return <Table
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
}
export default DataTable