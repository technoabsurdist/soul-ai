import React from 'react';
import styles from './MenuOptions.module.css';

const MenuOptions = () => {
    const handleViewDreamsClick = () => {
        // handle view dreams click logic
    };

    const handleAnalyzeDreamsClick = () => {
        // handle analyze dreams click logic
    };

    const handleRecordDreamClick = () => {
        // handle record dream click logic
    };

    return (
        <div className={styles['menu-options']}>
            <button className={styles['menu-option']} onClick={handleViewDreamsClick}>View past dreams</button>
            <button className={styles['menu-option']} onClick={handleAnalyzeDreamsClick}>Analyze past dreams</button>
            <button className={styles['menu-option']} onClick={handleRecordDreamClick}>Record a dream</button>
        </div>
    );
};

export default MenuOptions;
