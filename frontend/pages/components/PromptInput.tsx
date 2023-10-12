import React, { useState, useEffect, useRef } from "react";
import styles from './PromptInput.module.css';

const PromptInput = ({ prompt }) => {
  const [value, setValue] = useState('');
  const textAreaRef = useRef(null);

  const handleTextChange = (e) => {
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

  return (
    <div className={styles.inputWrapper}>
      <textarea
        ref={textAreaRef}
        className={`${styles.titleColorBorder} ${styles.expandedTextArea}`}
        value={value}
        placeholder={"Tell me about your dream..."}
        onChange={handleTextChange}
      />
    </div>
  );
};

export default PromptInput;
