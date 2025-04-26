import React, { useState } from 'react';
import { Button, Row, Col, Card } from 'antd';
import './ParticipationLeague.css';
import { BottomDescription } from "components/Description/BottomDescription/BottomDescription";
import CompetitionModal from "./CompetitionModal";
import PartiLeagueImage from "../../../assets/png/League Structure.jpg";
import PartiLeagueImage1 from "../../../assets/png/League Structure-1.jpg";
import PartiLeagueImage2 from "../../../assets/png/League Structure-2.jpg";

const ParticipationLeague = () => {
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const items = [
      {
          title: `TEAM FORMATION`,
          content: 'Teams are formed through a draft process, with players registering individually and being placed on teams based on their skills and experience.',
          imageUrl: PartiLeagueImage,
      },
      {
          title: `COMPETITION FORMAT`,
          content: 'The league runs over several months with multiple seasons per year, culminating in a finals series where the top teams compete for the championship.',
          imageUrl: PartiLeagueImage1,
      },
      {
          title: `PRIZES`,
          content: 'Teams and individual players compete for prizes, including trophies, medals, and MVP awards.',
          imageUrl: PartiLeagueImage2,
      },
  ];

    const [modalOpen, setModalOpen] = useState(false);

    const handleShowRegistration = (title) => {
      if (title == "TEAM FORMATION") {
        setModalContent("Players that are wanting to play in the tournament are required to register and will put into a selection pool, once you register into the selection pool there isn't a guarantee of being drafted. Teams will be made based on different levels of skilled and positions to ensure the most competitive nature.");
      } else if (title == "COMPETITION FORMAT") {
        setModalContent("There will be 2 seasons, winter and summer the winter season starting in December for nbl1/d league guys that are wanting to compete leading up and into the nbl1 season. It will run over 5 rounds and 2 rounds of finals with a break over Christmas. The summer season will run from may through till July, for players coming home from college and are wanting to compete against other college players and those wanting to go to college. More information regarding seasons to come later on ")
      } else {
        setModalContent("Teams and  players compete for prizes, including trophies, medals, and MVP awards. Both of these seasons will end up with a cash prize for the winning team, there will also be prizes awarded to end of season mvps, defensive player, all star 5s and coach of the season aswell as everyweek an mvp will be awarded who will also be awarded a prize. ");
      }
      setModalTitle(title);
      setModalOpen(true);
    };

    return (
        <div className="programs-section competition-cvontent cbl-section">
            <BottomDescription
                title1="LEAGUE"
                title2="STRUCTURE"
                content="Explore the league structure"
            />

            <Row className="mt-40" gutter={45} justify="space-between">
                {items.length > 0 ? items.map((item, index) => (
                    <Col key={index} xs={24} sm={12} md={8}>
                        <Card
                            className="cbl-card"
                            hoverable
                            cover={
                                <div style={{ padding: '15px' }}>
                                    <img onClick={() => handleShowRegistration(item.title)} alt={item.title} src={item.imageUrl} style={{ width: '100%', height: 'auto' }} />
                                    {modalOpen && <CompetitionModal content={modalContent} title={modalTitle} modalOpen={modalOpen} setModalOpen={setModalOpen} />}
                                </div>
                            }
                        >
                            <h2 className="bold academy-program-title">{item.title}</h2>
                            <p>{item.content}</p>
                        </Card>
                    </Col>
                )) : <p>No items available.</p>}
            </Row>
        </div>
    );
};

export default ParticipationLeague;
