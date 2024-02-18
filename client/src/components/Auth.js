import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ModeSelector from "./ModeSelector";
import baseURL from "../api";

function Auth() {

    const [cookies, setCookie, removeCookie] = useCookies(null);

    const [mode, setMode] = useState('Login');
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function handleLogin(event) {
        event.preventDefault();

        const response = await fetch(`${baseURL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: event.target[0].value,
                password: event.target[1].value
            })
        }).then(response => response.json());
        if (response.message) {
            setError(response.message);
        } else {
            setCookie('username', response.username);
            setCookie('authToken', response.token);
            setError('');
            window.location.reload();
        }
    }

    async function handleRegister(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (email !== confirmEmail) {
            setError('E-mails do not match');
            return;
        }

        const response = await fetch(`${baseURL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: event.target[0].value,
                email: event.target[1].value,
                password: event.target[3].value
            })
        }).then(response => response.json());
        if (response.message) {
            setError(response.message);
        } else {
            setCookie('username', response.username);
            setCookie('authToken', response.token);
            setError('');
            window.location.reload();
        }
    }

    useEffect(() => {
        setError('');
    }, [mode]);

    return (
        <div className="auth-section">
            <h1>Welcome to uplift!</h1>
            <div className="auth-container">
                <ModeSelector modes={['Login', 'Register']} mode={mode} setMode={setMode} />
                <div className="form-container">
                    {mode === 'Login' &&
                        <form className="login-form" onSubmit={handleLogin}>
                            <input type="text" placeholder="Username or e-mail" onChange={(e) => {setUsername(e.target.value)}} required minLength={5} maxLength={20}/>
                            <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} required minLength={5} maxLength={20}/>
                            <div className="form-footer">
                                <p className="auth-error">{error}</p>
                                <button type="submit">Login</button>
                            </div>
                        </form>
                    }
                    {mode === 'Register' &&
                        <form className="register-form" onSubmit={handleRegister}>
                            <input type="text" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} required minLength={5} maxLength={20}/>
                            <input type="email" placeholder="E-mail" onChange={(e) => {setEmail(e.target.value)}} required minLength={5} maxLength={20}/>
                            <input type="email" placeholder="Confirm e-mail" onChange={(e) => {setConfirmEmail(e.target.value)}} required minLength={5} maxLength={20}/>
                            <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} required minLength={5} maxLength={20}/>
                            <input type="password" placeholder="Confirm password" onChange={(e) => {setConfirmPassword(e.target.value)}} required minLength={5} maxLength={20}/>
                            <div className="form-footer">
                                <p className="auth-error">{error}</p>
                                <button type="submit">Register</button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </div>

    );
}

export default Auth;