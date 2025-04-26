import React, { useState } from 'react'
import { Table, Button, Input, Popconfirm, Form, Tooltip, Row, Col, Select, Tabs, Modal, message, Image, Avatar } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
const DataTable = (props) => {
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
            title: 'Membership Level', dataIndex: 'package_type_info',
            render: (record) => {
                return record.title;
            }
        },
        {
            title: 'Membership Fee', dataIndex: 'fee',
            render: (record) => {
                return "$" + record;
            }
        },
        {
            title: 'Billing Frequency', dataIndex: 'billing_frequency_info',
            render: (record) => {
                return record.title;
            }
        },
        {
            title: 'Key Benefits', dataIndex: 'benefit_info',
            render: (record) => {
                return record.split(",").map((x, index) => {
                    return <div key={index}>{x}</div>
                });
            }
        },
        {
            title: 'Ideal For', dataIndex: 'ideal',
            render: (record) => {
                return record.length > 30 ? record.slice(0, 29) + "..." : record;
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