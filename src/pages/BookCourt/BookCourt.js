import React, { useState } from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import CourtCalendar from './components/CourtCalendar';
import CourtSelector from './components/CourtSelector';
import CourtVisualization from './components/CourtVisualization';
import { withRouter } from 'react-router-dom';
import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { Helmet } from "react-helmet-async";

const PageWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(4, 0),
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  maxWidth: '1200px !important',
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  color: '#002B5B',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  '& .highlight': {
    color: '#B22234',
    display: 'block',
    fontSize: 'inherit',
    fontWeight: 'inherit',
  },
}));

const BookingSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: theme.spacing(1),
  border: '1px solid #e0e0e0',
  padding: theme.spacing(4),
}));

const PurchaseSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const PurchaseButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#B22234',
  color: 'white',
  padding: theme.spacing(1.5, 4),
  fontSize: '0.875rem',
  fontWeight: 'bold',
  borderRadius: '4px',
  minWidth: '250px',
  '&:hover': {
    backgroundColor: '#8B1A29',
  },
  '&.Mui-disabled': {
    backgroundColor: '#cccccc',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: '#002B5B',
  fontWeight: 'bold',
  fontSize: '1rem',
}));

const VisualizationBox = styled(Box)(({ theme }) => ({
  borderRadius: 1,
  padding: theme.spacing(2),
  height: '100%',
}));

const DayCell = styled(Box)(({ theme, isSelected, isToday }) => ({
  flex: 1,
  minWidth: '120px',
  height: '60px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1),
  backgroundColor: isSelected ? '#0066CC' : isToday ? '#333' : 'transparent',
  color: isSelected ? '#fff' : isToday ? '#fff' : '#666',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  position: 'relative',
  margin: 0,
  '&:hover': {
    backgroundColor: isSelected ? '#0066CC' : '#333',
    color: '#fff',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    right: 0,
    top: '10%',
    bottom: '10%',
    width: '1px',
    backgroundColor: '#333',
  },
  '&:last-child::after': {
    display: 'none',
  },
}));

const TimeSlot = styled(Box)(({ theme, isSelected, isBooked, isPast }) => ({
  flex: 1,
  minWidth: '120px',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1),
  backgroundColor: isSelected ? '#0066CC' : isBooked ? '#333' : isPast ? '#1a1a1a' : 'transparent',
  color: isSelected ? '#fff' : isBooked ? '#666' : isPast ? '#666' : '#fff',
  cursor: isBooked || isPast ? 'not-allowed' : 'pointer',
  transition: 'all 0.2s ease',
  position: 'relative',
  '&:hover': {
    backgroundColor: isSelected ? '#0066CC' : isBooked || isPast ? 'transparent' : '#333',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    right: 0,
    top: '10%',
    bottom: '10%',
    width: '1px',
    backgroundColor: '#333',
  },
  '&:last-child::after': {
    display: 'none',
  },
}));

const DayRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: 0,
  height: '60px',
  borderBottom: '1px solid #333',
  margin: 0,
  padding: 0,
}));

const TimeRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '0px',
  height: '60px',
  borderBottom: '1px solid #333',
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const CalendarGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  height: '100%',
  overflow: 'hidden',
  margin: 0,
  padding: 0,
}));

const BookCourt = () => {
  const [selectedCourt, setSelectedCourt] = useState('');
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  const handleCourtChange = (court) => {
    setSelectedCourt(court);
    setSelectedTimeSlots([]); // Reset time slots when court changes
  };

  const handleTimeSlotSelect = (slots) => {
    setSelectedTimeSlots(slots);
  };

  const handlePurchase = async () => {
    if (!selectedCourt || selectedTimeSlots.length === 0) return;

    try {
      // Here you would make an API call to your backend
      const bookingData = {
        court: selectedCourt,
        timeSlots: selectedTimeSlots,
      };
      
      console.log('Booking data:', bookingData);
      // const response = await bookingService.createBooking(bookingData);
      // Handle successful booking
    } catch (error) {
      // Handle error
      console.error('Booking failed:', error);
    }
  };

  const isPurchaseDisabled = !selectedCourt || selectedTimeSlots.length === 0;

  return (
    <HomeLayout>
      <Helmet>
        <title>Book Court - Coastal Basketball Centre</title>
        <meta name="description" content="Book your basketball court or shooting bay at Coastal Basketball Centre" />
      </Helmet>
      <PageWrapper>
        <ContentContainer>
          <MainTitle>
            BOOK YOUR COURT OR
            <span className="highlight">SHOOTING BAY</span>
          </MainTitle>

          <BookingSection>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <CourtSelector
                  selectedCourt={selectedCourt}
                  onCourtChange={handleCourtChange}
                />
                <CourtCalendar
                  selectedCourt={selectedCourt}
                  onTimeSlotSelect={handleTimeSlotSelect}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <VisualizationBox>
                  <CourtVisualization selectedCourt={selectedCourt} />
                </VisualizationBox>
              </Grid>
            </Grid>

            <PurchaseSection>
              <SectionTitle>PURCHASE</SectionTitle>
              <PurchaseButton
                variant="contained"
                disabled={isPurchaseDisabled}
                onClick={handlePurchase}
              >
                PURCHASE MEMBERSHIP
              </PurchaseButton>
            </PurchaseSection>
          </BookingSection>
        </ContentContainer>
      </PageWrapper>
    </HomeLayout>
  );
};

export default withRouter(BookCourt);
