import React, { useState, useEffect, useRef } from "react";
import styles from './PromptInput.module.css';

const PromptInput = ({ prompt }) => {
  const [value, setValue] = useState('');
  const textAreaRef = useRef(null);

  const handleTextChange = (e: any) => {
    setValue(e.target.value);
    resizeTextArea();
  };

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
      resizeTextArea();
  }, [value]);

  const submitEntry = async (e: React.FormEvent) => {
    e.preventDefault(); 
    try {
      const title = 'Testing Title 1';
      const response = await fetch('http://localhost:5001/entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ title: title, text: value }),
      })
      if (response.ok) {
        console.log('entry success');
        setValue('');  // Clear the text area
        window.alert('Submitted!');  // Show an alert
      } else {
        console.error('error');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  return (
    <div className={styles.inputWrapper}>
      <textarea
        ref={textAreaRef}
        className={`${styles.titleColorBorder} ${styles.expandedTextArea}`}
        value={value}
        placeholder={"What are you thinking..."} 
        onChange={handleTextChange}
      />
      <button onClick={submitEntry}>
        Submit
      </button>
    </div>
  );
};

export default PromptInput;
