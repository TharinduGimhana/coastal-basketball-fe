import React from "react";
import { withRouter } from 'react-router-dom';
import HomeLayout from "layouts/HomeLayout/HomeLayout";
import CBCSlide from "components/Facilities/CBCSlide/CBCSlide";
import CBCFacility from "components/Facilities/CBCFacility/CBCFacility";
import CBCHome from "components/Facilities/CBCHome/CBCHome";
import CBCMap from "components/Facilities/CBCMap/CBCMap";
import { Helmet } from "react-helmet-async";

function Facilities(props) {
  return (
    <HomeLayout>
      <Helmet>
        <title>CBC Facilities</title>
        <meta name="description" content="Located in Bunbury, CBC is the first of several planned centres aimed at
                    providing basketball amenities to the region" />
      </Helmet>
      <CBCSlide />
      <CBCFacility />
      <CBCHome />
      <CBCMap />
    </HomeLayout>
  );
}

export default withRouter(Facilities);
