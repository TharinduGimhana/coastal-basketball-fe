import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  format,
  addDays,
  startOfWeek,
  addWeeks,
  subWeeks,
  isSameDay,
} from "date-fns";

const CalendarContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const MonthNavigator = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2),
  "& .MuiIconButton-root": {
    padding: theme.spacing(1),
  },
}));

const MonthText = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
  fontWeight: "medium",
  color: "#000",
}));

const WeekGrid = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  "& .day-cell": {
    textAlign: "center",
    padding: theme.spacing(1),
    cursor: "pointer",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    "&.selected": {
      backgroundColor: "#002B5B",
      color: "#fff",
    },
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
    "&.selected:hover": {
      backgroundColor: "#002B5B",
    },
    "&.disabled": {
      backgroundColor: "#f5f5f5",
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
  "& .day-name": {
    fontSize: "0.75rem",
    color: "#666",
    marginBottom: "4px",
  },
  "& .day-number": {
    fontSize: "0.9rem",
    fontWeight: "medium",
  },
}));

const TimeGridContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  border: "1px solid #e0e0e0",
  borderRadius: "4px",
  overflow: "hidden",
}));

const TimeLabels = styled(Box)(({ theme }) => ({
  width: "60px",
  borderRight: "1px solid #e0e0e0",
  backgroundColor: "#fff",
  "& .time-label": {
    height: "30px",
    padding: "5px",
    fontSize: "0.75rem",
    color: "#666",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid #e0e0e0",
    "&.highlight": {
      color: "#B22234",
    },
  },
}));

const SlotsGrid = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  "& .time-column": {
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #e0e0e0",
    "&:last-child": {
      borderRight: "none",
    },
  },
  "& .time-slot": {
    height: "30px",
    borderBottom: "1px solid #e0e0e0",
    backgroundColor: "#fff",
    cursor: "pointer",
    transition: "all 0.2s",
    "&.selected": {
      backgroundColor: "#002B5B",
    },
    "&.reserved": {
      backgroundColor: "#f5f5f5",
    },
    "&:hover:not(.reserved)": {
      backgroundColor: "#e0e0e0",
    },
  },
}));

const Legend = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
  justifyContent: "center",
  "& .legend-item": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(0.5),
    fontSize: "0.75rem",
  },
  "& .legend-dot": {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },
}));

const CourtCalendar = ({ selectedCourt, onTimeSlotSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [weekDays, setWeekDays] = useState([]);
  const [reservedSlots, setReservedSlots] = useState({});

  const timeSlots = [
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];

  const highlightedTimes = ["7:30", "8:00"];

  useEffect(() => {
    updateWeekDays(currentDate);
    // In a real application, you would fetch reserved slots from the backend here
    fetchReservedSlots();
  }, [currentDate, selectedCourt]);

  const updateWeekDays = (date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 }); // Start from Monday
    const days = Array.from({ length: 7 }, (_, index) => {
      const day = addDays(start, index);
      return {
        date: day,
        name: format(day, "EEE").toUpperCase(),
        number: format(day, "d"),
        disabled: day < new Date(),
      };
    });
    setWeekDays(days);
  };

  const fetchReservedSlots = async () => {
    // Mock API call - replace with actual API call
    const mockReservedSlots = {
      "8:30": [0, 1],
      "9:00": [0, 1, 2],
    };
    setReservedSlots(mockReservedSlots);
  };

  const handlePreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  const handleNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  const handleDateSelect = (date) => {
    if (date < new Date()) return;
    setSelectedDate(date);
    setSelectedTimeSlots([]);
  };

  const handleTimeSlotSelect = (timeSlot, dayIndex) => {
    const day = weekDays[dayIndex].date;
    if (reservedSlots[timeSlot]?.includes(dayIndex)) return;

    const slotKey = `${format(day, "yyyy-MM-dd")}-${timeSlot}`;
    setSelectedTimeSlots((prev) => {
      const newSlots = prev.includes(slotKey)
        ? prev.filter((slot) => slot !== slotKey)
        : [...prev, slotKey];

      // Notify parent component
      if (onTimeSlotSelect) {
        onTimeSlotSelect(newSlots);
      }

      return newSlots;
    });
  };

  const isTimeSlotSelected = (timeSlot, dayIndex) => {
    const day = weekDays[dayIndex].date;
    const slotKey = `${format(day, "yyyy-MM-dd")}-${timeSlot}`;
    return selectedTimeSlots.includes(slotKey);
  };

  return (
    <CalendarContainer>
      <MonthNavigator>
        <IconButton onClick={handlePreviousWeek}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <MonthText>{format(currentDate, "MMMM yyyy").toUpperCase()}</MonthText>
        <IconButton onClick={handleNextWeek}>
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </MonthNavigator>

      <WeekGrid container spacing={1}>
        {weekDays.map((day, index) => (
          <Grid item xs key={day.name + day.number}>
            <Box
              className={`day-cell ${
                isSameDay(day.date, selectedDate) ? "selected" : ""
              } ${day.disabled ? "disabled" : ""}`}
              onClick={() => !day.disabled && handleDateSelect(day.date)}
            >
              <Typography className="day-name">{day.name}</Typography>
              <Typography className="day-number">{day.number}</Typography>
            </Box>
          </Grid>
        ))}
      </WeekGrid>

      <TimeGridContainer>
        <TimeLabels>
          {timeSlots.map((time) => (
            <div
              key={time}
              className={`time-label ${
                highlightedTimes.includes(time) ? "highlight" : ""
              }`}
            >
              {time}
            </div>
          ))}
        </TimeLabels>
        <SlotsGrid>
          {weekDays.map((day, dayIndex) => (
            <div key={dayIndex} className="time-column">
              {timeSlots.map((timeSlot) => (
                <div
                  key={`${dayIndex}-${timeSlot}`}
                  className={`time-slot ${
                    isTimeSlotSelected(timeSlot, dayIndex) ? "selected" : ""
                  } ${
                    reservedSlots[timeSlot]?.includes(dayIndex)
                      ? "reserved"
                      : ""
                  }`}
                  onClick={() =>
                    !day.disabled && handleTimeSlotSelect(timeSlot, dayIndex)
                  }
                />
              ))}
            </div>
          ))}
        </SlotsGrid>
      </TimeGridContainer>

      <Legend>
        <Box className="legend-item">
          <Box className="legend-dot" sx={{ backgroundColor: "#002B5B" }} />
          <span>SELECTED</span>
        </Box>
        <Box className="legend-item">
          <Box
            className="legend-dot"
            sx={{ backgroundColor: "#fff", border: "1px solid #666" }}
          />
          <span>AVAILABLE</span>
        </Box>
        <Box className="legend-item">
          <Box className="legend-dot" sx={{ backgroundColor: "#f5f5f5" }} />
          <span>RESERVED</span>
        </Box>
      </Legend>
    </CalendarContainer>
  );
};

export default CourtCalendar;
