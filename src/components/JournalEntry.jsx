import React from 'react';

// Component to display a single journal entry
function JournalEntry({ entry }) {
  return (
    <div className="entry-card border p-4 my-2 rounded shadow">
      <p className="text-gray-800">{entry.text}</p>
      <div className="text-sm text-gray-500">Mood: {entry.mood}</div>
      <div className="text-xs text-gray-400">Posted: {new Date(entry.createdAt).toLocaleString()}</div>
    </div>
  );
}

export default JournalEntry;