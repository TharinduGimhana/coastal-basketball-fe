import React from "react";
import { withRouter } from 'react-router-dom';
import HomeLayout from "layouts/HomeLayout/HomeLayout";
import JCBLSlide from "components/Competition/JCBLSlide/JCBLSlide";
import JCBLStructure from "components/Competition/JCBLStructure/JCBLStructure";
import JCBLIntro from "components/Competition/JCBLIntro/JCBLIntro";


function Competition2Page(props) {
  return (
    <HomeLayout>
      <JCBLSlide/>
      <JCBLStructure/>
      <JCBLIntro/>
    </HomeLayout>
  );
}

export default withRouter(Competition2Page);
