import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import { NewIcon } from './icons/NewIcon';
import { ArchiveIcon } from './icons/ArchiveIcon';
import { AnalysisIcon } from './icons/AnalysisIcon';

const SideNav = () => {
    const [showPrompt, setShowPrompt] = useState(false)
    const handleNewNote = () => {
        setShowPrompt(true)
    }

    return (
        <div className={styles.navbarParent}>
            <div className={styles.iconWithText}>  {/* Apply the new class here */}
                <NewIcon /> 
                <a className={styles.navbarItem} onClick={handleNewNote} href="/new">
                   New Dream 
                </a>
            </div>
            <div className={styles.iconWithText}>
                <ArchiveIcon /> 
                <Link className={styles.navbarItem} href="/dreams">
                   Archive 
                </Link>
            </div>
            <div className={styles.iconWithText}>
                <AnalysisIcon /> 
                <Link className={styles.navbarItem} href="/analysis">
                    Analysis
                </Link>
            </div>
        </div>
    )
}


export default SideNav
