import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JournalEntry from './components/JournalEntry';
import EmojiPicker from './components/EmojiPicker';
import './index.css';

// Main component for the DailyDose app
function App() {
  // State for journal entries, form inputs, and selected emoji
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState('');
  const [mood, setMood] = useState('');

  // Fetch entries from backend on component mount
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get('https://dailydose-server.onrender.com');
        setEntries(response.data);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };
    fetchEntries();
  }, []);

  // Handle form submission to post new entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://dailydose-server.onrender.com', { text, mood });
      const response = await axios.get('https://dailydose-server.onrender.com');
      setEntries(response.data);
      setText('');
      setMood('');
    } catch (error) {
      console.error('Error posting entry:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">DailyDose</h1>
      {/* Form for creating new journal entries */}
      <div className="mb-4">
        <textarea
          className="w-full p-2 border rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your journal entry..."
          rows="4"
        />
        <div className="flex items-center space-x-2">
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="Select or type a mood emoji"
          />
          <EmojiPicker onEmojiClick={(emoji) => setMood(emoji)} />
        </div>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Post
        </button>
      </div>
      {/* Display list of journal entries */}
      <div>
        {entries.map((entry) => (
          <JournalEntry key={entry._id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

export default App;