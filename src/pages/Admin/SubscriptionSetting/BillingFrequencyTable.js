import React, { useState } from 'react'
import { Table, Button, Input, Popconfirm, Form, Tooltip, Row, Col, Select, Tabs, Modal, message, Image, Avatar } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
const BillingFrequencyTable = (props) => {
    const { filteredData, handleEdit, deleteRow } = props;


    const columns = [
        { title: 'Billing Frequency', dataIndex: 'title' },
        {
            title: 'Terms', dataIndex: 'term',
            render: (record) => {
                return record + " day" + (parseInt(record) == 1 ? "" : "s");
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


    return <Table
        rowKey="key"
        pagination={false}
        dataSource={filteredData}
        columns={columns}
    />
}
export default BillingFrequencyTable