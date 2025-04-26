import React, { useEffect } from "react";
import { withRouter } from 'react-router-dom';
import HomeBranch from "components/HomePage/HomeBranch/HomeBranch";
import HomeFeature from "components/HomePage/HomeFeature/HomeFeature";
import HomeSlide from "components/HomePage/HomeSlide/HomeSlide";
import HomeNews from "components/HomePage/HomeNews/HomeNews";
import HomeEvent from "components/HomePage/HomeEvent/HomeEvent";
import HomeAbout from "components/HomePage/HomeAbout/HomeAbout";
import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { Helmet } from "react-helmet-async";

function HomePage(props) {
  // useEffect(() => {
  //   window.GC.scoreboard.init({
  //     target: "#gc-scoreboard-widget-t3b9",
  //     widgetId: "fcc937d3-04ab-436e-9490-02652ed70cfc",
  //     maxVerticalGamesVisible: 4,
  //   })
  // }, [])
  return (
    <HomeLayout>
      <Helmet>
        <title>CoastalBasketball</title>
      </Helmet>
      <HomeSlide />
      {/* <div className="customer-rect">
        <div id="gc-scoreboard-widget-t3b9"></div>
      </div> */}
      <HomeBranch />
      {/* <HomeFeature 
        style={{ backgroundColor: 'var(--redColor)' }} 
        content="REGISTER NOW FOR OUR UPCOMING LEAGUES"
        btnTitle="REGISTER NOW"
        bgBtn="var(--darkPurple)"
      /> */}
      {/* <HomeNews /> */}
      <HomeFeature
        style={{ backgroundColor: 'var(--darkPurple)' }}
        content="JOIN OUR ACADEMY AND TAKE YOUR GAME TO THE NEXT LEVEL."
        btnTitle="JOIN NOW"
        bgBtn="var(--redColor)"
      />
      <HomeEvent />
      {/* <HomeAbout/> */}
    </HomeLayout>
  );
}

export default withRouter(HomePage);