import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import { NewIcon } from './icons/NewIcon';
import { ArchiveIcon } from './icons/ArchiveIcon';
import { AnalysisIcon } from './icons/AnalysisIcon';
import { Divider } from './icons/Divider';
import { View } from '../Main';
import { ChatIcon } from './icons/ChatIcon';


interface SideNavProps {
    handleSetView: (view: View) => void;
}

const SideNav = ({ handleSetView }: SideNavProps) => {

    return (
        <div className={styles.navbarParent}>
            <img className={styles.profileImage} src="/dreams2.png" alt="Profile"/>
            <div className={styles.divider}>
                <Divider /> 
            </div>
            <div className={styles.iconWithText}>
                <NewIcon /> 
                <span className={styles.navbarItem} onClick={() => handleSetView(View.HOME)}>
                   New Note
                </span>
            </div>
            <div className={styles.iconWithText}>
                <ArchiveIcon /> 
                <a className={styles.navbarItem} onClick={() => handleSetView(View.ARCHIVE)}>
                   Archive 
                </a>
            </div>
            <div className={styles.iconWithText}>
                <AnalysisIcon /> 
                <span className={styles.navbarItem} onClick={() => handleSetView(View.INSIGHTS)}>
                   Insights 
                </span>
            </div>
            <div className={styles.iconWithText}>
                <ChatIcon /> 
                <span className={styles.navbarItem} onClick={() => handleSetView(View.CHAT)}>
                   SOUL CHAT 
                </span>
            </div>
            <div className={styles.divider}>
                <Divider /> 
            </div>
            <div>
                <Link className={styles.profileName} href="">Admin Example</Link>
                <Link className={styles.profileItem} href="">admin@example.com</Link>
            </div>
        </div>
    )
}


export default SideNav
