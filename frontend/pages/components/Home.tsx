import React, { useState } from 'react';
import styles from "../../styles/Home.module.css"
import PromptInput from './PromptInput';
import Archive from './Archive';

const Home = () => {
    const [showPrompt, _] = useState(true);
    const [reloadTrigger, setReloadTrigger] = useState(false);

    const afterSubmit = () => {
        setReloadTrigger(!reloadTrigger); // Toggle the reloadTrigger state
    };

    return (
        <>
            <main className={styles.mainContent}>
                {showPrompt && <PromptInput afterSubmit={afterSubmit} />}
            </main>
            <Archive reload={reloadTrigger} />
            <div>
            </div>
        </>
    );
};

export default Home;
