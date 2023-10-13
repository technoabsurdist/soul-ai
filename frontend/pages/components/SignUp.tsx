import { useState } from 'react';
import styles from './Login.module.css';

const SignUp = ({ handleSignUp }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');

    const handleSignup = async (e: React.FormEvent) => {
        console.log('signup')
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            
            if(response.ok) {
                console.log('signup success')
                handleSignUp();
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
                </form>
                <button 
                    type="submit" 
                    onClick={handleSignup} 
                    className={styles.button}
                >
                    Create Account
                </button>
            </>
        </div>
    );
}

export default SignUp;