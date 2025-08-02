import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../utils/auth';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Fab,
  Drawer,
  AppBar,
  Toolbar,
  Button,
  Chip
} from '@mui/material';
import {
  Send as SendIcon,
  Chat as ChatIcon,
  Close as CloseIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  Clear as ClearIcon
} from '@mui/icons-material';

function Chatbot() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message
      setMessages([
        {
          message: "Hello! I'm the ePathshala Assistant. How can I help you today?",
          isUserMessage: false,
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message to chat
    const newUserMessage = {
      message: userMessage,
      isUserMessage: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const response = await fetch('/api/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId,
          userRole: user.role,
          userEmail: user.name // Using name as email for demo
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSessionId(data.sessionId);
        
        // Add bot response to chat
        const botMessage = {
          message: data.response,
          isUserMessage: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        message: "Sorry, I'm having trouble responding right now. Please try again later.",
        isUserMessage: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = async () => {
    if (sessionId) {
      try {
        await fetch(`/api/chatbot/clear/${sessionId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
      } catch (error) {
        console.error('Error clearing chat:', error);
      }
    }
    setMessages([]);
    setSessionId(null);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="chat"
        onClick={() => setIsOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000
        }}
      >
        <ChatIcon />
      </Fab>

      {/* Chat Drawer */}
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            width: 400,
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >
        {/* Chat Header */}
        <AppBar position="static" color="primary">
          <Toolbar>
            <BotIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ePathshala Assistant
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Chat Messages */}
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          <List sx={{ width: '100%' }}>
            {messages.map((msg, index) => (
              <ListItem
                key={index}
                sx={{
                  flexDirection: 'column',
                  alignItems: msg.isUserMessage ? 'flex-end' : 'flex-start',
                  mb: 1
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                    maxWidth: '80%'
                  }}
                >
                  {!msg.isUserMessage && (
                    <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                      <BotIcon />
                    </Avatar>
                  )}
                  <Paper
                    elevation={1}
                    sx={{
                      p: 1.5,
                      backgroundColor: msg.isUserMessage ? 'primary.main' : 'grey.100',
                      color: msg.isUserMessage ? 'white' : 'text.primary',
                      borderRadius: 2,
                      maxWidth: '100%',
                      wordBreak: 'break-word'
                    }}
                  >
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      {msg.message}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        mt: 0.5,
                        opacity: 0.7
                      }}
                    >
                      {formatTime(msg.timestamp)}
                    </Typography>
                  </Paper>
                  {msg.isUserMessage && (
                    <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                      <PersonIcon />
                    </Avatar>
                  )}
                </Box>
              </ListItem>
            ))}
            {isLoading && (
              <ListItem sx={{ justifyContent: 'flex-start' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <BotIcon />
                  </Avatar>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 1.5,
                      backgroundColor: 'grey.100',
                      borderRadius: 2
                    }}
                  >
                    <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                      Typing...
                    </Typography>
                  </Paper>
                </Box>
              </ListItem>
            )}
            <div ref={messagesEndRef} />
          </List>
        </Box>

        {/* Chat Input */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <Button
              size="small"
              startIcon={<ClearIcon />}
              onClick={clearChat}
              variant="outlined"
            >
              Clear Chat
            </Button>
            <Chip
              label={user.role}
              size="small"
              color="secondary"
              variant="outlined"
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              size="small"
            />
            <IconButton
              color="primary"
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Chatbot; 