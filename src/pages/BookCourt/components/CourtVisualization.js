import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const VisualizationContainer = styled(Box)(({ theme }) => ({
  marginTop: '100px',
  width: '100%',
  height: '50%',
  backgroundColor: '#1a1a1a',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px',
}));

const ShootingBaysContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '20%',
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '16px',
}));

const ShootingBay = styled(Box)(({ theme, isSelected }) => ({
  width: '48%',
  height: '100%',
  backgroundColor: '#0066CC',
  opacity: isSelected ? 1 : 0.3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#B22234',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  lineHeight: 1.5,
  letterSpacing: '0.00938em',
}));

const CourtWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '100px',
}));

const CourtSection = styled(Box)(({ theme }) => ({
  flex: 1,
  position: 'relative',
  backgroundColor: '#333',
  minHeight: '40%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '10px 0',
  marginTop: 0,
}));

const HalfCourt = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isReversed' && prop !== 'selectedCourt'
})(({ theme, isSelected, isReversed, selectedCourt }) => ({
  width: '100%',
  height: '100%',
  position: 'relative',
  transform: isReversed ? 'rotate(180deg)' : 'none',
  '& .court-lines': {
    position: 'absolute',
    top: '5%',
    left: 0,
    width: '100%',
    height: '90%',
    '& .three-point-line': {
      position: 'absolute',
      bottom: '35%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80%',
      height: '70%',
      border: '2px solid rgba(255, 255, 255, 0.7)',
      borderRadius: '0 0 180px 180px',
      zIndex: 1,
    },
    '& .key-area': {
      position: 'absolute',
      bottom: '-30%',
      left: '50%',
      WebkitTransform: 'translateX(-50%)',
      MozTransform: 'translateX(-50%)',
      msTransform: 'translateX(-50%)',
      transform: 'translateX(-50%)',
      width: '100%',
      height: '140%',
      backgroundColor: '#0066CC',
      opacity: (isSelected || selectedCourt === 'FULL COURT') ? 1 : 0.3,
      zIndex: 0,
    },
    '& .free-throw-circle': {
      position: 'absolute',
      bottom: '80%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '40%',
      height: '25%',
      border: '2px solid rgba(255, 255, 255, 0.7)',
      borderRadius: '0 0 208px 208px ',
      zIndex: 1,
    },
    '& .basket': {
      position: 'absolute',
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '8%',
      height: '4%',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      zIndex: 1,
    },
  },
}));

const Grid = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `
    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
  `,
  backgroundSize: '20px 20px',
}));

const CourtLabel = styled(Typography)(({ theme, isReversed }) => ({
  margin: 0,
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: 400,
  fontSize: '1rem',
  lineHeight: 1.5,
  letterSpacing: '0.00938em',
  margin: 0,
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: 'bold',
  fontSize: '0.75rem',
  lineHeight: 1.5,
  letterSpacing: '0.00938em',
  position: 'absolute',
  color: '#B22234',
  top: '40%',
  left: '50%',
  WebkitTransform: isReversed ? 'translate(-50%, -50%) rotate(180deg)' : 'translate(-50%, -50%)',
  MozTransform: isReversed ? 'translate(-50%, -50%) rotate(180deg)' : 'translate(-50%, -50%)',
  msTransform: isReversed ? 'translate(-50%, -50%) rotate(180deg)' : 'translate(-50%, -50%)',
  transform: isReversed ? 'translate(-50%, -50%) rotate(180deg)' : 'translate(-50%, -50%)',
  zIndex: 2,
  opacity: 1,
}));

const CenterCircle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80px',
  height: '80px',
  border: '2px solid rgba(255, 255, 255, 0.7)',
  borderRadius: '50%',
  zIndex: 1,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40px',
    height: '4px',
    // backgroundColor: '#B22234',
  },
}));

const CourtVisualization = ({ selectedCourt }) => {
  return (
    <VisualizationContainer>
      <ShootingBaysContainer>
        <ShootingBay isSelected={selectedCourt === 'SHOOTING BAY 1'}>
          SHOOTING BAY 1
        </ShootingBay>
        <ShootingBay isSelected={selectedCourt === 'SHOOTING BAY 2'}>
          SHOOTING BAY 2
        </ShootingBay>
      </ShootingBaysContainer>
      <CourtWrapper>
        <CourtSection>
          <Grid />
          <HalfCourt isSelected={selectedCourt === 'HALF COURT 1' || selectedCourt === 'FULL COURT'} isReversed={false} selectedCourt={selectedCourt}>
            <div className="court-lines">
              <div className="three-point-line" />
              <div className="key-area" />
              <div className="free-throw-circle" />
              <div className="basket" />
            </div>
            <CourtLabel isReversed={false}>HALF COURT 1</CourtLabel>
          </HalfCourt>
        </CourtSection>
        <CenterCircle />
        <CourtSection>
          <Grid />
          <HalfCourt isSelected={selectedCourt === 'HALF COURT 2' || selectedCourt === 'FULL COURT'} isReversed={true} selectedCourt={selectedCourt}>
            <div className="court-lines">
              <div className="three-point-line" />
              <div className="key-area" />
              <div className="free-throw-circle" />
              <div className="basket" />
            </div>
            <CourtLabel isReversed={true}>HALF COURT 2</CourtLabel>
          </HalfCourt>
        </CourtSection>
      </CourtWrapper>
    </VisualizationContainer>
  );
};

export default CourtVisualization; 