import Link from 'next/link';
import React, { useEffect, useState } from 'react';
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
    const [profileData, setProfileData] = useState({ name: "", email: "" });

    useEffect(() => {
        // Fetch profile data from API when the component mounts
        const fetchData = async () => {
            const response = await fetch('http://localhost:5001/user', {
                credentials: 'include',
            });
            const data = await response.json();
            const username = data.email.split("@")[0]; 
            const name = (username.charAt(0).toUpperCase() + username.slice(1))|| "Unknown";
            setProfileData({
                name: name || "Unknown",
                email: data.email || "unknown@example.com",
            });
        };

        fetchData();
    }, []); // Empty dependency array means this useEffect runs once when the component mounts

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
                <Link className={styles.profileName} href="">{profileData.name}</Link>
                <Link className={styles.profileItem} href="">{profileData.email}</Link>
            </div>
        </div>
    )
}


export default SideNav
