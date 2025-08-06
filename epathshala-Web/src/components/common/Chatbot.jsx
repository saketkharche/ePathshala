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
import ChatHeader from './ChatHeader';
import ChatMessageList from './ChatMessageList';
import ChatInputArea from './ChatInputArea';
import PredefinedQuestionSelector from './PredefinedQuestionSelector';

const PREDEFINED_QUESTIONS = [
  "What is the academic calendar?",
  "How to check attendance?",
  "How to request leave?",
  "How to view grades?",
  "How to submit assignments?",
  "How to contact support?"
];

function Chatbot({ isOpen, onClose }) {
  const { user } = useAuth();
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
      
      // Test backend connectivity
      testBackendConnection();
    }
  }, [isOpen]);

  const testBackendConnection = async () => {
    try {
      console.log('Testing backend connection...');
      const response = await fetch('/api/chatbot/health');
      console.log('Backend health check status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Backend health check response:', data);
      } else {
        console.error('Backend health check failed:', response.status);
      }
    } catch (error) {
      console.error('Backend connection test failed:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !user) return;

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
      console.log('Sending message to chatbot:', {
        message: userMessage,
        sessionId: sessionId,
        userRole: user.role,
        userEmail: `${user.name}@epathshala.com` // Create email from name
      });

      console.log('User token:', user.token ? 'Token exists' : 'No token');
      console.log('User details:', { role: user.role, name: user.name, id: user.id });

      // First test the connection
      const healthResponse = await fetch('/api/chatbot/health');
      console.log('Health check status:', healthResponse.status);

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
          userEmail: `${user.name}@epathshala.com` // Create email from name
        })
      });

      console.log('Chatbot response status:', response.status);
      console.log('Chatbot response headers:', Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        const data = await response.json();
        console.log('Chatbot response data:', data);
        setSessionId(data.sessionId);
        
        // Add bot response to chat
        const botMessage = {
          message: data.response,
          isUserMessage: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const errorText = await response.text();
        console.error('Chatbot error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        message: `Sorry, I'm having trouble responding right now. Error: ${error.message}`,
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
    if (sessionId && user) {
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

  // Don't render if user is not logged in
  if (!user) {
    return null;
  }

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose} PaperProps={{ sx: { width: 400, height: '100%', display: 'flex', flexDirection: 'column' } }}>
      <ChatHeader onClose={onClose} />
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        <ChatMessageList messages={messages} isLoading={isLoading} messagesEndRef={messagesEndRef} />
      </Box>
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Button size="small" startIcon={<ClearIcon />} onClick={clearChat} variant="outlined">Clear Chat</Button>
          <Button size="small" onClick={testBackendConnection} variant="outlined" color="secondary">Test Connection</Button>
          <Chip label={user.role} size="small" color="secondary" variant="outlined" />
        </Box>
        <PredefinedQuestionSelector setInputMessage={setInputMessage} />
        <ChatInputArea inputMessage={inputMessage} setInputMessage={setInputMessage} handleKeyPress={handleKeyPress} sendMessage={sendMessage} isLoading={isLoading} />
      </Box>
    </Drawer>
  );
}

export default Chatbot; 