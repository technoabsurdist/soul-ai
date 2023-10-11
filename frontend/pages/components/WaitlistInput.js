import React, { useState } from "react";
import styles from './WaitlistInput.module.css';


export const WaitlistInput = ( ) => {
    const [value, setValue] = useState('');

    return (
        <div className={styles.inputWrapper}>
        <input
            className={styles.titleColorBorder}
            value={value}
            placeholder={"Enter your email to join the waitlist..."}
            onChange={(e) => setValue(e.target.value)}
        />
       </div>
  );
};
