import React, { useEffect, useState } from 'react';
import RequestForm from './RequestForm';
import RequestList from './RequestList';
import Header from './Header';
import axios from 'axios';
import { useValue } from '../../Context/ContextProvider';
import { sendMessage } from '../../intercom/messageForm.js';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { CATEGORIES } from './Category.js';

const HomePage = () => {
  const { state: { currentUser, isLogin }, dispatch } = useValue();
  const [requests, setRequests] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const saveUserData = async ({ url, data }) => {
    if (!data) {
      console.error("Data is null or undefined. Skipping API call.");
      return;
    }

    try {
      console.log(`Sending data to /api/${url}`, data);
      const response = await axios.post(
        `http://localhost:5000/api/${url}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`Response from /api/${url}:`, response.data);
    } catch (error) {
      console.error(`Error in API call to /api/${url}:`, error.response?.data || error.message);
    }
  };

  const getAllRequests = async (id) => {
    if (!id) {
      console.error("User ID is not provided. Cannot fetch requests.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/${id}/getRequests`);
      setRequests(response.data.requestData); 
      console.log("Successfully fetched all requests:", response.data.requestData);
    } catch (error) {
      console.error("Error in fetching requests:", error.response?.data || error.message);
    }
  };

  const handleSubmit = (data) => {
    saveUserData({ url: 'request', data: { currentUser, data } });

    const newRequest = {
      id: Date.now().toString(),
      ...data,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setRequests((prev) => [newRequest, ...prev]);
    sendMessage({ email: currentUser.email, message: data.description });
    dispatch({ type: 'UPDATE_DETAILS', payload: data });
  };

  useEffect(() => {
    if (isLogin && currentUser) {
      saveUserData({ url: 'login', data: currentUser });
      console.log("User data sent to backend:", currentUser);
      getAllRequests(currentUser.googleId);
    }
  }, [currentUser, isLogin]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #f0f4f8, #e0f7fa)' }}>
      <Header />
      <div style={{ display: 'flex', padding: '20px', gap: '20px' }}>

        <Box style={{ flex: 1, background: '#fff', borderRadius: '8px', padding: '16px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <RequestForm onSubmit={handleSubmit} />
        </Box>

        <Box style={{ flex: 2 }}>

          <FormControl fullWidth variant="outlined" style={{ marginBottom: '16px' }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Category"
            >
              <MenuItem value="">All Categories</MenuItem>
              {Object.keys(CATEGORIES).map((categoryKey) => (
                <MenuItem key={categoryKey} value={categoryKey}>
                  {CATEGORIES[categoryKey]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <RequestList requests={requests} selectedCategory={selectedCategory} />
        </Box>
      </div>
    </div>
  );
};

export default HomePage;
