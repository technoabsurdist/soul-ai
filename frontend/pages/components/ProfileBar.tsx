import Link from 'next/link';
import React from 'react';
import styles from '../../styles/Home.module.css';

const ProfileBar = () => {
    return (
        <div className={styles.navbarParent}>
            <img className={styles.profileImage} src="/dreams2.png" alt="Profile"/>
            <div>
                <Link className={styles.profileItem} href="">admin@example.com</Link>
            </div>
        </div>
        
    )
}

export default ProfileBar
