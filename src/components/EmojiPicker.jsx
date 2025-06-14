import React from 'react';
import Picker from 'emoji-picker-react';

// Component to select emojis
function EmojiPicker({ onEmojiClick }) {
  return (
    <div className="inline-block">
      <Picker
        onEmojiClick={(emojiObject) => onEmojiClick(emojiObject.emoji)}
        disableAutoFocus
        pickerStyle={{ width: '250px' }}
      />
    </div>
  );
}

export default EmojiPicker;