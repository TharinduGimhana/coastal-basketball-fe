import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import Toast from 'components/Toast/Toast';
import { Link } from "react-router-dom";
import AdminLayout from 'layouts/AdminLayout/AdminLayout';
import './index.css';
import { ROUTE_ADMIN_ACADEMY, ROUTE_ADMIN_CBL, ROUTE_ADMIN_HIGHSCHOOL, ROUTE_ADMIN_JCBL, ROUTE_ADMIN_SEASON, ROUTE_ADMIN_USER } from 'constants/navigation_constants';
import { apiGet } from 'ajax/apiServices';
import { UrlAdminDashboard } from 'ajax/apiUrls';

const Dashboard = ({ history }) => {
    const [activeUserCount, setActiveUserCount] = useState(0);
    const [deletedUserCount, setDeletedUserCount] = useState(0);
    const [seasonCount, setSeasonCount] = useState(0);
    const [cblCount, setCblCount] = useState(0);
    const [jcblCount, setJcblCount] = useState(0);
    const [academyCount, setAcademyCount] = useState(0);
    const [highschoolCount, setHighschoolCount] = useState(0);

    const animateCount = (targetCount, setCount) => {
        let currentCount = 0;
        const interval = setInterval(() => {
            if (currentCount < targetCount) {
                currentCount += Math.ceil(targetCount / 100);
                if (currentCount > targetCount) {
                    currentCount = targetCount;
                }
                setCount(currentCount);
            } else {
                clearInterval(interval);
            }
        }, 70);
    };

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        console.log("token111:", token)
        if (!token) {
            history.push('/admin/login');
        } else {
            fetchData();
        }
    }, [history]);

    const fetchData = async () => {
        apiGet(UrlAdminDashboard)
            .then((res) => {
                animateCount(res.cbl_count, setCblCount);
                animateCount(res.jcbl_count, setJcblCount);
                animateCount(res.academy_count, setAcademyCount);
                animateCount(res.highschool_count, setHighschoolCount);
                animateCount(res.active_user_count, setActiveUserCount);
                animateCount(res.deleted_user_count, setDeletedUserCount);
                animateCount(res.season_count, setSeasonCount);
            })
            .catch((err) => {
                Toast(err, 2);
            });
    };

    return (
        <AdminLayout>
            <Row gutter={32} className="admin-dashbaord">

                <Col xs={24} sm={12} md={8} xl={4} className="mb-20">
                    <Link to={ROUTE_ADMIN_USER} rel="noopener noreferrer">
                        <Card title="User" bordered={false}>
                            <p className='txt-count'>{activeUserCount}</p>
                        </Card>
                    </Link>
                </Col>
                <Col xs={24} sm={12} md={8} xl={4} className="mb-20">
                    <Link to={ROUTE_ADMIN_SEASON} rel="noopener noreferrer">
                        <Card title="Seasons" bordered={false}>
                            <p className='txt-count'>{seasonCount}</p>
                        </Card>
                    </Link>
                </Col>
                <Col xs={24} sm={12} md={8} xl={4} className="mb-20">
                    <Link to={ROUTE_ADMIN_CBL} rel="noopener noreferrer">
                        <Card title="CBL" bordered={false}>
                            <p className='txt-count'>{cblCount}</p>
                        </Card>
                    </Link>
                </Col>
                <Col xs={24} sm={12} md={8} xl={4} className="mb-20">
                    <Link to={ROUTE_ADMIN_JCBL} rel="noopener noreferrer">
                        <Card title="JCBL" bordered={false}>
                            <p className='txt-count'>{jcblCount}</p>
                        </Card>
                    </Link>
                </Col>
                <Col xs={24} sm={12} md={8} xl={4} className="mb-20">
                    <Link to={ROUTE_ADMIN_HIGHSCHOOL} rel="noopener noreferrer">
                        <Card title="High School" bordered={false}>
                            <p className='txt-count'>{highschoolCount}</p>
                        </Card>
                    </Link>
                </Col>
                <Col xs={24} sm={12} md={8} xl={4} className="mb-20">
                    <Link to={ROUTE_ADMIN_ACADEMY} rel="noopener noreferrer">
                        <Card title="Academy" bordered={false}>
                            <p className='txt-count'>{academyCount}</p>
                        </Card>
                    </Link>
                </Col>
            </Row>
        </AdminLayout>
    );
};

export default Dashboard;