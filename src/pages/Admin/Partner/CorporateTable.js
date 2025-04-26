import React, { useState } from 'react'
import { Table, Button, Input, Popconfirm, Form, Tooltip, Row, Col, Select, Tabs, Modal, message, Image } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
const CorporateTable = (props) => {
    const { filteredData, handleEdit, deleteRow, pagination, setPagination } = props;


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
        { title: 'Type', dataIndex: 'type' },
        { title: 'Name', dataIndex: 'name' },
        { title: 'Phone Number', dataIndex: 'phone' },
        { title: 'Email Address', dataIndex: 'email' },
        {
            title: 'Website', dataIndex: 'website', render: (record) => {
                return <a href={`https://${record}`}>https://{record}</a>
            }
        },
        { title: 'Company/Brand', dataIndex: 'brand' },
        {
            title: 'Logo', dataIndex: 'logo', render: (record) => {
                return <Image width={70} src={`${process.env.REACT_APP_API_BASE_URL}uploads/media/${record}`} />
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
export default CorporateTable