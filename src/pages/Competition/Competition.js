import React from "react";
import { withRouter } from 'react-router-dom';
import HomeLayout from "layouts/HomeLayout/HomeLayout";
import CompetitionSlide from "components/Competition/CompetitionSlide/CompetitionSlide";
import CompetitionDetail from "components/Competition/CompetitionDetail/CompetitionDetail";
import CompetitionRegister from "components/Competition/CompetitionRegister/CompetitionRegister";

function Facilities(props) {
  return (
    <HomeLayout>
        <CompetitionSlide />
        <CompetitionDetail />
        <CompetitionRegister />
    </HomeLayout>
  );
}

export default withRouter(Facilities);
