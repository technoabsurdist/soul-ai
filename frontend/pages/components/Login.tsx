import React, { useState } from 'react';
import styles from './Login.module.css';
import TypeformEmbed from './TypeformEmbed';

export const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            
            if(response.ok) {
                console.log('success')
                // Handle successful login, e.g., navigate to dashboard
            } else {
                console.error('error')
                // Handle error, display an error message to the user
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }
    

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className={styles.input}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    className={styles.input} 
                />
             </form>
            <button type="submit" className={styles.button}>Log In</button>
            <TypeformEmbed /> 
        
        </div>
    );
}
