import React from "react";
import { withRouter } from 'react-router-dom';
import HomeLayout from "layouts/HomeLayout/HomeLayout";
import JCBLSlide from "components/Competitionv/JCBLSlide/JCBLSlide";
import JCBLStructure from "components/Competitionv/JCBLStructure/JCBLStructure";
import JCBLIntro from "components/Competitionv/JCBLIntro/JCBLIntro";
import { Helmet } from "react-helmet-async";


function Competition2Page(props) {
  return (
    <HomeLayout>
      <Helmet>
        <title>League Structure</title>
        <meta name="description" content="The Junior Coastal Basketball League (JCBL) provides young athletes with the opportunity 
                to develop their basketball skills in a competitive and supportive environment." />
      </Helmet>
      <JCBLSlide />
      <JCBLStructure />
      <JCBLIntro />
    </HomeLayout>
  );
}

export default withRouter(Competition2Page);
