import React, { useState } from 'react'
import { Table, Button, Input, Popconfirm, Form, Tooltip, Row, Col, Select, Tabs, Modal, message, Image, Avatar } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
const PlayerTable = (props) => {
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
        {
            title: 'Avatar', dataIndex: 'avatar', render: (record) => {
                return <Avatar width={70} src={`${process.env.REACT_APP_API_BASE_URL}uploads/media/${record}`} />
            }
        },
        { title: 'Name', dataIndex: 'name' },
        { title: 'Position', dataIndex: 'position' },
        { title: 'Point', dataIndex: 'point' },
        {
            title: 'Company Logo', dataIndex: 'logo', render: (record) => {
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
export default PlayerTable