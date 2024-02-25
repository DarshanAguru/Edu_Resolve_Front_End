import { useState, useEffect } from 'react';
import axios from 'axios';

const useMessages = (token, userId, refreshToggle) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `http://localhost:9000/messages/getAllMessages`,
          { token, id: userId }
        );
        setMessages(response.data.reverse());
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [token, userId, refreshToggle]);

  const postMessage = async (messageData) => {
    try {
      await axios.post(
        `http://localhost:9000/messages/addMessage/${userId}@${uuidv4()}`,
        messageData
      );
    } catch (error) {
      setError(error);
    }
  };

  return { messages, loading, error, postMessage };
};

export default useMessages;
