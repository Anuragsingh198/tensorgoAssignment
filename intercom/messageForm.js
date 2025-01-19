
import axios from 'axios';

export const  sendMessage = async (email, message) => {
  console.log("this is the email from  frontend messageform ");
  try {
    const response = await axios.post('http://localhost:5000/api/send-message', {
      email,
      message,
    });
    console.log('Message sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error.response?.data || error.message);
    throw error;
  }
};

