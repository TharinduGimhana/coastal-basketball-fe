import React from "react";
import { withRouter } from 'react-router-dom';
import RepresentativeTop from "components/Representative/RepresentativeTop/RepresentativeTop";
import RepresentativeOpportunity from "components/Representative/RepresentativeOpportunity/RepresentativeOpportunity";
import RepresentativeFuture from "components/Representative/RepresentativeFuture/RepresentativeFuture";
import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { Helmet } from "react-helmet-async";

function Representative(props) {
  return (
    <HomeLayout>
      <Helmet>
        <title>Coastal Basketball UNITED [CB UNITED]</title>
        <meta name="description" content="Coastal Basketball United (CB United) is the representative
                     arm of Coastal Basketball, bringing together the best talent
                      from our leagues and academy to compete at state and national
                       levels. CB United provides a platform for elite players to 
                       showcase their skills and represent the South West region in 
                       high-profile tournaments." />
      </Helmet>
      <RepresentativeTop />
      <RepresentativeOpportunity />
      <RepresentativeFuture />
    </HomeLayout>
  );
}

export default withRouter(Representative);