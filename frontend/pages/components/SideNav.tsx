import Link from 'next/link';
import React from 'react';
import styles from '../../styles/Home.module.css';

export const SideNav = () => {
    return (
        <div className={styles.navbarParent}>
            <div>
                <Link href="">All Dreams</Link>
            </div>
            <div>
                <Link href="">Analysis</Link>
            </div>
            <div>
                <Link href="">About</Link>
            </div>
        </div>
        
    )
}