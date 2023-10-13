import React, { useState } from 'react';
import styles from './Login.module.css';
import TypeformEmbed from './TypeformEmbed';
import SignUp from './SignUp';

interface LoginProps {
    handleUserLogin: (email: string, password: string) => void;
}
const Login = ({ handleUserLogin }: LoginProps) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            
            if(response.ok) {
                console.log('login success')
                handleUserLogin(email, password)
            } else {
                console.error('error')
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }
    

    return (
        <div>
            <>
                <form onSubmit={handleLogin} className={styles.formContainer}>
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
                <button 
                    type="submit" 
                    onClick={handleLogin} 
                    className={styles.button}
                >
                    Log In
                </button>
                <div className={styles.divBottom}>
                    <TypeformEmbed /> 
                </div>
            </>
        </div>
    );
}

export default Login;