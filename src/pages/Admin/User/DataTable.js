import React, { useState } from 'react'
import { Table, Button, Checkbox, Popconfirm, Tag, Tooltip, Row, Col, Select, Tabs, Modal, message, Image, Avatar } from 'antd';
import { DeleteOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';
const DataTable = (props) => {
    const { dataSource, filteredData, selectedRowKeys, setSelectedRowKeys, pagination, setPagination, edit, deleteRow } = props;


    const columns = [
        {
            title: (
                <Checkbox
                    indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < dataSource.length}
                    checked={selectedRowKeys.length === dataSource.length}
                    onChange={(e) => {
                        const checked = e.target.checked;
                        const newSelectedKeys = checked ? dataSource.map(item => item.key) : [];
                        setSelectedRowKeys(newSelectedKeys);
                    }}
                />
            ),
            dataIndex: 'checkbox',
            render: (_, record) => (
                <Checkbox
                    checked={selectedRowKeys.includes(record.key)}
                    onChange={(e) => {
                        const checked = e.target.checked;
                        setSelectedRowKeys(prev =>
                            checked ? [...prev, record.key] : prev.filter(key => key !== record.key)
                        );
                    }}
                />
            ),
        },
        {
            title: 'No',
            dataIndex: 'no',
            render: (_, __, index) => index + 1 + (pagination.current - 1) * pagination.pageSize,
        },
        {
            title: 'UserType',
            dataIndex: 'user_type',
            width: '10%',
            render: (text, record) => {
                return text == "parent" ? <span>{"Individual"}</span> : <span>{text}</span>
            },
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            width: '10%',
            render: (text, record) => {
                return <span>{text}</span>
            },
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            width: '10%',
            render: (text, record) => {
                return <span>{text}</span>
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (text, record) => {
                return record.user_type == "parent" ? <span>{record.email}</span> : <span>{record.parent_email}</span>
            },
        },
        {
            title: 'Access Time',
            dataIndex: 'access_time',
            render: (date) => date ? moment(date).format('DD-MM-YYYY HH:MM') : '',
        },
        {
            title: 'Membership Start Date',
            render: (date, record) => {
                if (record.subscription) {
                    return (
                        moment(record.subscription.start_date).format('DD-MM-YYYY')
                    )
                }
            }
        },
        {
            title: 'Membership End Date',
            render: (date, record) => {
                if (record.subscription) {
                    return (
                        moment(record.subscription.end_date).format('DD-MM-YYYY')
                    )
                }
            }
        },
        {
            title: 'Membership Status',
            dataIndex: 'subscription',
            render: (text, record) => {
                return record.subscription == "" ? (
                    <Tag style={{ color: 'white', backgroundColor: '#F83535', padding: '2px 6px', border: 'none' }}>
                        Non Member
                    </Tag>
                ) : (
                    record.subscription.status.toLowerCase() == "canceled" ? <Tag style={{ color: 'white', backgroundColor: '#F83535', padding: '2px 6px', border: 'none' }}>
                        {record.subscription?.package_type_info ? record.subscription.status.toUpperCase() + " (" + record.subscription.package_type_info.title + ")" : record.subscription.status}
                    </Tag> :
                        <Tag style={{ color: 'white', backgroundColor: 'green', padding: '2px 6px', border: 'none', textAlign: 'center' }}>
                            {record.subscription?.package_type_info ? record.subscription.status.toUpperCase() + " (" + record.subscription.package_type_info.title + ")" : record.subscription.status}
                        </Tag>
                );
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => {
                return record.status == 1 ? (
                    <Tag style={{ color: 'white', backgroundColor: 'green', padding: '2px 6px', border: 'none', width: '55px', textAlign: 'center' }}>
                        Verified
                    </Tag>
                ) : (
                    <Tag style={{ color: 'white', backgroundColor: '#F83535', padding: '2px 6px', border: 'none', width: '80px' }}>
                        Non Verified
                    </Tag>
                );
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => {
                return <>
                    {/* <Button onClick={() => edit(record)} type="link">
                        <EditOutlined style={{ fontSize: '20px' }} />
                    </Button> */}
                    <Popconfirm title="Sure to delete?" onConfirm={() => deleteRow(record.key)}>
                        <Button type="link">
                            <DeleteOutlined style={{ fontSize: '20px', color: 'red' }} />
                        </Button>
                    </Popconfirm>
                </>;
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