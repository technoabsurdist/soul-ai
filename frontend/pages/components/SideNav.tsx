import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import { NewIcon } from './icons/NewIcon';
import { ArchiveIcon } from './icons/ArchiveIcon';
import { AnalysisIcon } from './icons/AnalysisIcon';
import { Divider } from './icons/Divider';

const SideNav = () => {
    const [showPrompt, setShowPrompt] = useState(false)
    const handleNewNote = () => {
        setShowPrompt(true)
    }

    return (
        <div className={styles.navbarParent}>
            <img className={styles.profileImage} src="/dreams2.png" alt="Profile"/>
            <div className={styles.divider}>
                <Divider /> 
            </div>
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
            <div className={styles.divider}>
                <Divider /> 
            </div>
            <div>
                <Link className={styles.profileName} href="">Emilio Andere</Link>
                <Link className={styles.profileItem} href="">admin@example.com</Link>
            </div>
        </div>
    )
}


export default SideNav
