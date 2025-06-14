import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JournalEntry from './components/JournalEntry';
import EmojiPicker from './components/EmojiPicker';
import './index.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState('');
  const [mood, setMood] = useState('');

  // Use environment variable for backend URL
  const API_URL = import.meta.env.VITE_API_URL || 'https://dailydose-server.onrender.com';

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/entries`);
        setEntries(response.data);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };
    fetchEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/entries`, { text, mood });
      const response = await axios.get(`${API_URL}/api/entries`);
      setEntries(response.data);
      setText('');
      setMood('');
    } catch (error) {
      console.error('Error posting entry:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  };

  return (
    <div className="container">
      <h1>DailyDose</h1>
      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your journal entry..."
          rows="4"
        />
        <div>
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="Select or type a mood emoji"
          />
          <EmojiPicker onEmojiClick={(emoji) => setMood(emoji)} />
        </div>
        <button onClick={handleSubmit}>Post</button>
      </div>
      <div>
        {entries.map((entry) => (
          <JournalEntry key={entry._id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

export default App;