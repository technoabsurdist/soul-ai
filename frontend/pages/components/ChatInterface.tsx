import React, { useState } from 'react';
import styles from './ChatInterface.module.css';

const ChatInterface = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async () => {
    setChatHistory([...chatHistory, { type: 'user', text: userInput }]);
    
    const response = await fetch('http://localhost:5001/chat', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: userInput }),
    });
    const data = await response.json();
    const modelReply = data.model_response;
  
    setChatHistory([...chatHistory, { type: 'user', text: userInput }, { type: 'model', text: modelReply }]);
    
    setUserInput('');
  };
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Soul Chat</h1>
      <div className={styles.chatBox}>
        {chatHistory.map((entry, index) => (
          <div key={index} className={entry.type === 'user' ? styles.user : styles.model}>
            {entry.text}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input type="text" className={styles.inputForm} value={userInput} onChange={handleInputChange} />
        <button className={styles.buttonForm} onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;
