import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
// import { DragAndDropCalendar } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"; // Important for DnD styles
import { 
  Box, 
  Paper, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions, 
  Button, 
  Typography,
  useTheme,
  alpha,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { keyframes, styled } from "@mui/system";
import WorkIcon from '@mui/icons-material/Work';
import AddIcon from '@mui/icons-material/Add';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

// Setup localizer
const localizer = momentLocalizer(moment);

// Setup the DnD Calendar
const DnDCalendar = withDragAndDrop(Calendar);

// Animation keyframes
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const buttonHoverAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(38, 166, 154, 0.6); }
  70% { box-shadow: 0 0 0 10px rgba(38, 166, 154, 0); }
  100% { box-shadow: 0 0 0 0 rgba(38, 166, 154, 0); }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

// Styled components
const AnimatedButton = styled(Button)(({ theme }) => ({
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'all 0.5s ease',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 7px 14px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.08)',
    '&:before': {
      left: '100%',
    },
  },
  '&:active': {
    transform: 'translateY(1px)',
  }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255,255,255,0.95)',
  backdropFilter: 'blur(8px)',
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
  border: '1px solid rgba(255,255,255,0.18)',
  padding: theme.spacing(3),
  animation: `${fadeInUp} 0.8s ease-out`,
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '5px',
    background: 'linear-gradient(90deg, #00796b, #26a69a, #4db6ac)',
  }
}));

// Event types with colors
const EVENT_TYPES = {
  interview: { 
    label: "Interview", 
    color: "#26a69a", 
    icon: <PersonIcon fontSize="small" />
  },
  meeting: { 
    label: "Meeting", 
    color: "#5c6bc0", 
    icon: <EventNoteIcon fontSize="small" />
  },
  training: { 
    label: "Training", 
    color: "#ef6c00", 
    icon: <RestaurantMenuIcon fontSize="small" />
  },
  orientation: { 
    label: "Orientation", 
    color: "#8e24aa", 
    icon: <WorkIcon fontSize="small" />
  }
};

export default function CalendarView() {
  const theme = useTheme();
  const [events, setEvents] = useState([
    { 
      id: 1, 
      title: "Chef Interview - Mario's Bistro", 
      start: new Date(2025, 1, 20, 10, 0), 
      end: new Date(2025, 1, 20, 11, 0),
      type: "interview",
      location: "Office Room 3"
    },
    { 
      id: 2, 
      title: "Staff Meeting - Quarterly Planning", 
      start: new Date(2025, 1, 21, 14, 0), 
      end: new Date(2025, 1, 21, 15, 0),
      type: "meeting",
      location: "Conference Room"
    },
    { 
      id: 3, 
      title: "Barista Training Session", 
      start: new Date(2025, 1, 22, 9, 0),
      end: new Date(2025, 1, 22, 12, 0),
      type: "training",
      location: "Training Center"
    },
  ]);

  // Dialog state for creating a new event
  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({ 
    title: "", 
    start: new Date(), 
    end: new Date(), 
    type: "interview",
    location: ""
  });

  // Open dialog on slot selection
  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ 
      title: "", 
      start, 
      end: end || moment(start).add(1, 'hour').toDate(), 
      type: "interview",
      location: ""
    });
    setOpenDialog(true);
  };

  // Save new event and add to events array
  const handleSaveEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      const id = events.length ? events[events.length - 1].id + 1 : 1;
      setEvents([...events, { id, ...newEvent }]);
      setOpenDialog(false);
    }
  };

  // Fixed drag/drop handler - properly update the event
  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = events.map(existingEvent => {
      return existingEvent.id === event.id 
        ? { ...existingEvent, start, end: end || moment(start).add(1, 'hour').toDate() } 
        : existingEvent;
    });
    setEvents(updatedEvents);
  };

  // Fixed resize handler
  const handleEventResize = ({ event, start, end }) => {
    const updatedEvents = events.map(existingEvent => {
      return existingEvent.id === event.id 
        ? { ...existingEvent, start, end } 
        : existingEvent;
    });
    setEvents(updatedEvents);
  };

  // Custom event component - improved to better fit in calendar cells
  const EventComponent = ({ event }) => {
    const eventType = EVENT_TYPES[event.type] || EVENT_TYPES.interview;
    
    return (
      <Box sx={{ 
        height: '100%', 
        width: '100%', 
        display: 'flex',
        flexDirection: 'column',
        fontSize: '0.85rem',
        p: 0.5,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 0.5,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {eventType.icon}
          <Typography 
            variant="caption" 
            sx={{ 
              ml: 0.5, 
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flexGrow: 1
            }}
          >
            {event.title}
          </Typography>
        </Box>
        {event.location && (
          <Typography 
            variant="caption" 
            sx={{ 
              opacity: 0.8, 
              fontSize: '0.75rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {event.location}
          </Typography>
        )}
      </Box>
    );
  };

  // Custom calendar styling - enhanced for better event display
  const calendarStyles = {
    '.rbc-toolbar': {
      padding: '12px',
      marginBottom: '15px',
      background: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    },
    '.rbc-btn-group': {
      button: {
        borderRadius: '20px',
        padding: '6px 12px',
        fontWeight: 500,
        transition: 'all 0.2s ease',
        background: 'white',
        boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
        border: 'none',
        color: '#555',
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
          animation: `${pulseAnimation} 0.3s ease`,
        },
        '&.rbc-active': {
          backgroundColor: '#26a69a',
          color: 'white',
        }
      }
    },
    '.rbc-toolbar-label': {
      fontSize: '1.3rem',
      fontWeight: 600,
      color: '#333',
    },
    '.rbc-header': {
      padding: '10px',
      fontWeight: 600,
      color: '#222',
      background: 'rgba(245,245,245,0.8)',
      borderBottom: '2px solid rgba(0,0,0,0.06)',
    },
    '.rbc-event': {
      backgroundColor: '#26a69a',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: 'none',
      padding: '3px 6px',
      overflow: 'hidden',
      cursor: 'move', // Add cursor for draggable indication
      textOverflow: 'ellipsis',
      '&:hover': {
        animation: `${pulseAnimation} 0.5s ease`,
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      }
    },
    '.rbc-today': {
      backgroundColor: 'rgba(38, 166, 154, 0.05)',
    },
    '.rbc-month-view, .rbc-time-view': {
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid rgba(0,0,0,0.08)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
    // Enhance event fitting
    '.rbc-event-content': {
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    // Improve drag and drop visual
    '.rbc-addons-dnd .rbc-event.rbc-selected': {
      boxShadow: '0 0 0 2px #26a69a',
      backgroundColor: alpha('#26a69a', 0.9),
    },
    '.rbc-addons-dnd-drag-preview': {
      opacity: 0.7,
      boxShadow: '0 0 10px rgba(0,0,0,0.3) !important',
    }
  };

  // Event style function - enhanced for better visibility
  const eventStyleGetter = (event) => {
    const eventType = EVENT_TYPES[event.type] || EVENT_TYPES.interview;
    return {
      style: {
        backgroundColor: eventType.color,
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'move',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }
    };
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: ` url("https://source.unsplash.com/featured/?restaurant,kitchen,chef")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        py: 2,
        mt: 0,
        px: { xs: 2, md: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // Adjusted positioning - shifting content upwards and adding bottom padding
        pt: { xs: 4, md: 6 },
        pb: { xs: 10, md: 16 },
        justifyContent: "flex-start", // Changed from center to flex-start
      }}
    >
      {/* Header */}
      <Box 
        sx={{ 
          display: "flex", 
          alignItems: "center",
          mb: 4,
          animation: `${fadeInUp} 0.6s ease-out`,
        }}
      >
        <WorkIcon 
          sx={{ 
            fontSize: 40, 
            color: "white",
            mr: 2,
            animation: `${floatAnimation} 2s infinite ease-in-out`,
          }} 
        />
      
      </Box>

      {/* Main Calendar */}
      <StyledPaper 
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 1200,
          // Added margin-bottom to create more space at the bottom
          mb: { xs: 6, md: 10 },
        }}
      >
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: '#222' }}>
              <EventNoteIcon sx={{ mr: 1, color: '#26a69a' }} />
              Scheduling Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage interviews, meetings and training sessions for restaurant job candidates
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            {Object.entries(EVENT_TYPES).map(([key, value]) => (
              <Box key={key} sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                bgcolor: alpha(value.color, 0.1),
                color: value.color,
                px: 1.5,
                py: 0.5,
                borderRadius: 10,
                fontSize: '0.75rem',
                fontWeight: 500,
                border: `1px solid ${alpha(value.color, 0.3)}`,
              }}>
                {value.icon}
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  {value.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            height: { xs: "60vh", md: "70vh" },
            width: "100%",
            borderRadius: 2,
            overflow: "hidden",
            position: "relative",
            ...calendarStyles,
          }}
        >
          <DnDCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            resizable
            onSelectSlot={handleSelectSlot}
            onEventDrop={handleEventDrop}
            onEventResize={handleEventResize}
            eventPropGetter={eventStyleGetter}
            components={{
              event: EventComponent
            }}
            onSelectEvent={(event) => {
              const title = window.prompt("Edit event:", event.title);
              if (title) {
                const updatedEvent = { ...event, title };
                setEvents(events.map(ev => (ev.id === event.id ? updatedEvent : ev)));
              }
            }}
            views={['month', 'week', 'day']}
            defaultView="month"
            style={{
              height: "100%",
              borderRadius: "8px",
              fontFamily: theme.typography.fontFamily,
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <AnimatedButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setNewEvent({ 
                title: "", 
                start: new Date(), 
                end: moment(new Date()).add(1, 'hour').toDate(), 
                type: "interview",
                location: ""
              });
              setOpenDialog(true);
            }}
            sx={{
              background: 'linear-gradient(45deg, #00796b, #26a69a)',
              borderRadius: '30px',
              boxShadow: '0 4px 10px rgba(38, 166, 154, 0.3)',
              px: 3,
              py: 1,
              '&:hover': {
                background: 'linear-gradient(45deg, #26a69a, #00796b)',
                boxShadow: '0 6px 14px rgba(38, 166, 154, 0.4)',
                animation: `${buttonHoverAnimation} 1s infinite`,
              }
            }}
          >
            Schedule Event
          </AnimatedButton>
        </Box>
      </StyledPaper>

      {/* Dialog for adding new event */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(45deg, #00796b, #26a69a)',
          color: 'white',
          py: 2,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
        }}>
          <AccessTimeIcon sx={{ mr: 1 }} /> Schedule New Event
        </DialogTitle>
        <DialogContent sx={{ mt: 2, px: 3, py: 2 }}>
          <TextField
            fullWidth
            label="Event Title"
            variant="outlined"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            sx={{ 
              mb: 3, 
              mt: 1,
              '.MuiOutlinedInput-root': {
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#26a69a',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#26a69a',
                  borderWidth: 2,
                },
              }
            }}
          />
          
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="event-type-label">Event Type</InputLabel>
            <Select
              labelId="event-type-label"
              value={newEvent.type}
              label="Event Type"
              onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
              sx={{ 
                borderRadius: 2,
                '.MuiOutlinedInput-notchedOutline': {
                  transition: 'all 0.3s ease',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#26a69a',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#26a69a',
                },
              }}
            >
              {Object.entries(EVENT_TYPES).map(([key, value]) => (
                <MenuItem key={key} value={key} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box component="span" sx={{ 
                    width: 16, 
                    height: 16, 
                    borderRadius: '50%', 
                    backgroundColor: value.color,
                    mr: 1,
                    display: 'inline-block'
                  }} />
                  {value.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            label="Location"
            variant="outlined"
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            sx={{ 
              mb: 3,
              '.MuiOutlinedInput-root': {
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#26a69a',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#26a69a',
                  borderWidth: 2,
                },
              }
            }}
          />
          
          <TextField
            fullWidth
            label="Start Time"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
            onChange={(e) => {
              setNewEvent({ ...newEvent, start: new Date(e.target.value) });
            }}
            sx={{ 
              mb: 3,
              '.MuiOutlinedInput-root': {
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#26a69a',
                },
              }
            }}
          />
          <TextField
            fullWidth
            label="End Time"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
            onChange={(e) => {
              setNewEvent({ ...newEvent, end: new Date(e.target.value) });
            }}
            sx={{ 
              '.MuiOutlinedInput-root': {
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#26a69a',
                },
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, justifyContent: 'space-between' }}>
          <AnimatedButton 
            onClick={() => setOpenDialog(false)}
            sx={{ 
              borderRadius: 30, 
              px: 3,
              color: '#26a69a',
              border: '1px solid #26a69a',
              '&:hover': {
                backgroundColor: 'rgba(38, 166, 154, 0.05)',
              }
            }}
          >
            Cancel
          </AnimatedButton>
          <AnimatedButton 
            variant="contained" 
            onClick={handleSaveEvent}
            sx={{ 
              borderRadius: 30, 
              px: 3,
              background: 'linear-gradient(45deg, #00796b, #26a69a)',
              boxShadow: '0 4px 10px rgba(38, 166, 154, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #26a69a, #00796b)',
                boxShadow: '0 6px 14px rgba(38, 166, 154, 0.4)',
                animation: `${buttonHoverAnimation} 1s infinite`,
              }
            }}
          >
            Save Event
          </AnimatedButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}