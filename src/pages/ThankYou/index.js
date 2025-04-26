import React, { useEffect } from "react";
import { withRouter } from 'react-router-dom';
import HomeLayout from "layouts/HomeLayout/HomeLayout";
import imgBg from "assets/png/register-logo2.jpg";
import axios from 'axios';
import './index.css';

function ThankYou(props) {
    return (
        <HomeLayout>
            <div className="thanks-content">
                <div>
                    <h2 style={{ color: "#B53A3A" }}>Thank you for registering  for the {localStorage.getItem("season_name")} for Term two. </h2>
                    <div className="text-center mt-20">A confirmation email will be sent to your inbox. </div>

                </div>

            </div>
            <div class="image-container">
                <img src={imgBg} width='100%' height='auto' />
            </div>
        </HomeLayout>
    );
}

export default withRouter(ThankYou);