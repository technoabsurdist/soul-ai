import React, { useState } from 'react';
import styles from "../../styles/Home.module.css"
import PromptInput from './PromptInput';

const Home = () => {

    const [showPrompt, _] = useState(true)

    return (
        <>
            <main className={styles.mainContent}>
                {showPrompt && <PromptInput />}
            </main>
            <div>
            </div>
        </>
       
    );
};

export default Home;
