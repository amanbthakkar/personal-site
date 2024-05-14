import React, { useState } from 'react';
import './Gauri.css';
import axios from 'axios';

const Gauri = () => {
  const [customMessage, setCustomMessage] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleCustomMessageChange = (e) => {
    setCustomMessage(e.target.value);
  };

  const handleButtonClick = (message) => {
    // Send a POST request to your backend API with the message
    sendNotification(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to your backend API with the custom message
    sendNotification(customMessage);
    setCustomMessage('');
  };

  const sendNotification = async (message) => {
    console.log(message);
    
    try {
      const response = await axios.post('https://cloud.amanthakkar.com/postTest', { "test": message });
      
      if (response.status === 200) {
        console.log('Notification sent successfully');
        setNotificationMessage('Sent notification to Aman!');
        setTimeout(() => {
          setNotificationMessage('');
        }, 3000);
      } else {
        console.error('Failed to send notification');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <div className="gauri-container">
      <p>
        Sometimes I am a lil stupid in understanding you or you may miss me when
        I am not there. Press my buttons here and I shall be instantly notified, both on Phone as well as Watch
        :D
      </p>
      <div className="button-grid">
        <button
          className="blue-button"
          onClick={() => handleButtonClick('Gauri needs attention!')}
        >
          I NEED ATTENTIONNNN
        </button>
        <button
          className="green-button"
          onClick={() => handleButtonClick('Gauri misses you!')}
        >
          I MISSS YOUUU
        </button>
        <button
          className="red-button"
          onClick={() => handleButtonClick('Uh-oh. What did you do?')}
        >
          I AM MAD. AT YOU.
        </button>
        <button
          className="yellow-button"
          onClick={() => handleButtonClick('Hehehehehehe ;)')}
        >
          I WANT TO ;)
        </button>
      </div>
      <p>Send a custom message (requires mode of payment to be decided by me later (usually kissss):</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your custom message"
          value={customMessage}
          onChange={handleCustomMessageChange}
        />
        <button type="submit">Send</button>
      </form>
      {notificationMessage && (
        <p style={{ color: 'green' }}>{notificationMessage}</p>
      )}
    </div>
  );
};

export default Gauri;
