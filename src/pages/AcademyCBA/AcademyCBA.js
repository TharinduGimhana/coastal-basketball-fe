import React from "react";
import { withRouter } from 'react-router-dom';
import AcademyCBATop from "components/AcademyCBA/AcademyCBATop/AcademyCBATop";
import AcademyCBAPrograms from "components/AcademyCBA/AcademyCBAProgram/AcademyCBAProgram";
import AcademyCBAEnrolment from "components/AcademyCBA/AcademyCBAEnrolment/AcademyCBAEnrolment";
import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { Helmet } from "react-helmet-async";
import AcademyDescWidget from "./AcademyDescWidget";

function AcademyCBA(props) {
  return (
    <HomeLayout>
      <Helmet>
        <title>Coastal Basketball ACADEMY [CBA]</title>
        <meta name="description" content="Changing the way traditional basketball development has been done to date by focusing on what truly matters. We coach and train athletes to become multi skilled players who make great decisions and enjoy the game. Rather than following strict age brackets, we allow each player's true abilities to determine their path forward, always challenging them at the appropriate level." />
      </Helmet>
      <AcademyCBATop />
      <AcademyDescWidget />
      <AcademyCBAPrograms />
    </HomeLayout>
  );
}

export default withRouter(AcademyCBA);
