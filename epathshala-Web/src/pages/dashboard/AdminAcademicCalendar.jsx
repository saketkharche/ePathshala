import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText, IconButton, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getEvents, addEvent, deleteEvent } from '../../api/admin';

function AdminAcademicCalendar() {
  const [eventForm, setEventForm] = useState({ eventName: '', date: '', description: '' });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getEvents();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const onAddEvent = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      await addEvent(eventForm);
      setSuccess('Event added successfully!');
      setEventForm({ eventName: '', date: '', description: '' });
      fetchEvents();
    } catch (err) {
      setError('Failed to add event');
    }
  };

  const onDeleteEvent = async (id) => {
    setSuccess('');
    setError('');
    try {
      await deleteEvent(id);
      setSuccess('Event deleted successfully!');
      fetchEvents();
    } catch (err) {
      setError('Failed to delete event');
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>Academic Calendar</Typography>
      <Box component="form" onSubmit={onAddEvent} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        <TextField
          label="Event Name"
          value={eventForm.eventName}
          onChange={e => setEventForm({ ...eventForm, eventName: e.target.value })}
          required
        />
        <TextField
          type="date"
          value={eventForm.date}
          onChange={e => setEventForm({ ...eventForm, date: e.target.value })}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Description"
          value={eventForm.description}
          onChange={e => setEventForm({ ...eventForm, description: e.target.value })}
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          Add Event
        </Button>
      </Box>
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <List>
        {events.map(event => (
          <ListItem key={event.id} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => onDeleteEvent(event.id)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText
              primary={`${event.eventName} - ${event.date}`}
              secondary={event.description}
            />
          </ListItem>
        ))}
        {events.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
            No events found.
          </Typography>
        )}
      </List>
    </Box>
  );
}

export default React.memo(AdminAcademicCalendar);