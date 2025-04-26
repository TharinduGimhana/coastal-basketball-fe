import React, { useState } from 'react'
import { Table, Button, Input, Popconfirm, Form, Tooltip, Row, Col, Select, Tabs, Modal, message, Image, Avatar } from 'antd';
import { DeleteOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons';
import { numberWithCommas } from 'constants/global';
const DataTable = (props) => {
    const { filteredData, handleDownload, pagination, setPagination } = props;


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
        { title: 'Email', dataIndex: 'email' },
        {
            title: 'Billing Reason', dataIndex: 'payment_type',
            render: (record) => {
                if (record == "subscription") {
                    return "Membership";
                } else if (record == "individual_registration") {
                    return "Individual Registration Cost";
                } else if (record == "booking") {
                    return "Booking Fee";
                }
            }
        },
        {
            title: 'Paid amount (AUD)', dataIndex: 'amount_paid',
            render: (record) => {
                return "$" + numberWithCommas(parseFloat(record));
            }
        },

        {
            title: 'Created At', dataIndex: 'created_at',
            render: (record) => {
                return record;
            }
        },
        {
            title: 'Invoice',
            dataIndex: 'action',
            render: (_, record) => {

                return record.invoice_pdf ? <Button type="primary" onClick={() => handleDownload(record)}>
                    <DownloadOutlined /> Download Invoice
                </Button> : "None"
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