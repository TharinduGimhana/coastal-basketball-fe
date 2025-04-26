import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, useNavigate, useLocation } from "react-router-dom";
import { NotFound } from "navigation/NotFound";
import HomePage from "pages/Home/HomePage";
import AcademyCBA from "pages/AcademyCBA/AcademyCBA";
import {
  ROOT,
  ROUTE_ABOUT_US,
  ROUTE_COMPETITIONS,
  ROUTE_CBL,
  ROUTE_OTP,
  ROUTE_FACILITIES,
  TEMPLATE_ROUTE_REGISTER1,
  TEMPLATE_ROUTE_REGISTER2,
  ROUTE_JCBL,
  ROUTE_HIGH_SCHOOL,
  ROUTE_REPRESENTATIVE,
  ROUTE_ACADEMY,
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_ADMIN_LOGIN,
  ROUTE_ADMIN_DASHBOARD,
  ROUTE_ADMIN_CBL,
  ROUTE_ADMIN_JCBL,
  ROUTE_ADMIN_ACADEMY,
  ROUTE_ADMIN_HIGHSCHOOL,
  ROUTE_ADMIN_BRANCH,
  ROUTE_ADMIN_EVENT,
  ROUTE_ADMIN_USER,
  ROUTE_ADMIN_PARTNER,
  ROUTE_ADMIN_SEASON,
  ROUTE_PLAYER_PARTNERS,
  ROUTE_CORPORATE_PARTNERS,
  ROUTE_ADMIN_SUBSCRIPTION,
  ROUTE_ADMIN_PAYMENT,
  ROUTE_USER_PAYMENT,
  ROUTE_USER_SUBSCRIPTION,
  ROUTE_MEMBERSHIP,
  ROUTE_ADMIN_WAITLIST,
  ROUTE_TRAINING_CENTRE,
  ROUTE_BOOKING_COURT
}
  from "constants/navigation_constants";

import SignIn from "pages/Auth/signin";
import SignUp from "pages/Auth/signup";
import ForgotPassword from "pages/Auth/forgotpassword";
import VerifyOtp from "pages/Auth/verifyttp";

import Facilities from "pages/Facilities/Facilities";
import BookCourt from "pages/BookCourt/BookCourt";
import Representative from "pages/Representative/Representative";
import Competition from "pages/Competition/Competition";
import Participations from "pages/Participation/Participation";
import TeamPartnerPage from "pages/Partners/TeamPartners";
import PlayerPartnerPage from "pages/Partners/PlayerPartners";

import Competition1Page from "pages/Competitionv/Competition1Page";

import Register1Page from "pages/Register/Register1Page";
import Register2Page from "pages/Register/Register2Page";
import ThankYou from "pages/ThankYou/index";


import AdminLogin from "pages/Admin/Auth/Login";
import AdminDashboard from "pages/Admin/Dashboard";

import Dashboard from "pages/Admin/Dashboard/index";
import CBL from "pages/Admin/CBL/index";
import Branch from "pages/Admin/Branch/index";
import Event from "pages/Admin/Event/index";
import Season from "pages/Admin/Season/index";
import User from "pages/Admin/User/index";
import Partner from "pages/Admin/Partner/index";
import SubscriptionSetting from "pages/Admin/SubscriptionSetting/index";
import Payment from "pages/Admin/Payment/index";

import UserPayment from "pages/User/Payment/index";
import UserSubscription from "pages/User/Subscription/index";
import Membership from "pages/Membership/Membership";
import HomeLayout from "layouts/HomeLayout/HomeLayout";
import WaitList from "pages/Admin/WaitList";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const RouterConfig = () => {
  return (
    <Router>
      <ScrollToTop />

      <Switch>
        <Route exact path={ROOT} component={HomePage} />
        <Route exact path={ROUTE_LOGIN} component={SignIn} />
        <Route exact path={ROUTE_SIGNUP} component={SignUp} />
        <Route exact path={ROUTE_FORGOT_PASSWORD} component={ForgotPassword} />
        <Route exact path={ROUTE_OTP} component={VerifyOtp} />
        <Route exact path={ROUTE_ACADEMY} component={AcademyCBA} />
        <Route exact path={ROUTE_MEMBERSHIP} component={Membership} />
        <Route exact path={ROUTE_COMPETITIONS} component={Competition} />
        <Route exact path={ROUTE_CBL} component={Participations} />
        <Route exact path={ROUTE_PLAYER_PARTNERS} component={PlayerPartnerPage} />
        <Route exact path={ROUTE_CORPORATE_PARTNERS} component={TeamPartnerPage} />

        <Route exact path={ROUTE_TRAINING_CENTRE} component={Facilities} />
        <Route exact path={ROUTE_BOOKING_COURT} component={BookCourt} />
        <Route exact path={ROUTE_JCBL} component={Competition1Page} />
        <Route exact path={ROUTE_HIGH_SCHOOL} component={Competition} />
        <Route exact path={TEMPLATE_ROUTE_REGISTER1} component={Register1Page} />
        <Route exact path={TEMPLATE_ROUTE_REGISTER2} component={Register2Page} />

        <Route exact path={ROUTE_USER_PAYMENT} component={UserPayment} />
        <Route exact path={ROUTE_USER_SUBSCRIPTION} component={UserSubscription} />

        <Route exact path={ROUTE_ADMIN_DASHBOARD} component={Dashboard} />
        <Route exact path={ROUTE_ADMIN_LOGIN} component={AdminLogin} />
        <Route exact path={ROUTE_ADMIN_CBL} component={CBL} />
        <Route exact path={ROUTE_ADMIN_JCBL} component={CBL} />
        <Route exact path={ROUTE_ADMIN_ACADEMY} component={CBL} />
        <Route exact path={ROUTE_ADMIN_HIGHSCHOOL} component={CBL} />
        <Route exact path={ROUTE_ADMIN_BRANCH} component={Branch} />
        <Route exact path={ROUTE_ADMIN_EVENT} component={Event} />
        <Route exact path={ROUTE_ADMIN_SEASON} component={Season} />
        <Route exact path={ROUTE_ADMIN_USER} component={User} />
        <Route exact path={ROUTE_ADMIN_WAITLIST} component={WaitList} />
        <Route exact path={ROUTE_ADMIN_PARTNER} component={Partner} />
        <Route exact path={ROUTE_ADMIN_SUBSCRIPTION} component={SubscriptionSetting} />
        <Route exact path={ROUTE_ADMIN_PAYMENT} component={Payment} />
        <Route exact path='/thank_you' component={ThankYou} />
        <Route exact path='/admin' component={Dashboard} />

        <Route path="*" component={NotFound} />

      </Switch>

    </Router>
  );
};

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
