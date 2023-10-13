import { useState } from 'react';
import styles from './Login.module.css';

const SignUp = ({ handleUserLogin }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Signup
            const signupResponse = await fetch('http://localhost:5001/signup', {
                credentials: 'include',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name }),
            });

            if (signupResponse.ok) {
                // Automatically log the user in after a successful signup
                const loginResponse = await fetch('http://localhost:5001/login', {
                    credentials: 'include',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                if (loginResponse.ok) {
                    console.log('Signup and login success');
                    handleUserLogin(email, password);
                } else {
                    console.error('Login error after signup');
                }
            } else {
                console.error('Signup error');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSignup} className={styles.formContainer}>
                <input 
                    type="name" 
                    placeholder="First Name"
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    className={styles.input} 
                />
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
                <button 
                    type="submit" 
                    className={styles.button}
                >
                    Create Account
                </button>
            </form>
        </div>
    );
}

export default SignUp;
