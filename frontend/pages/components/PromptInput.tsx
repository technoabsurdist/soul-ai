import React, { useState, useEffect } from "react";
import styles from './PromptInput.module.css';

const PromptInput = ({ prompt }) => {
  const [value, setValue] = useState('');

   return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.titleColorBorder}
        value={value}
        placeholder={prompt}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default PromptInput;