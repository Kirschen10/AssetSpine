// LogIn.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './CSS/LogIn.css';

const LogIn = () => {
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {

        try {
            const response = await fetch('http://localhost:8081/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                setUsername('');
                setPassword('');
                history.push(`/Home/${data.userId}`);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login');
        }
    };

    // Added a listener for the ENTER key
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                handleLogin(); 
            }
        };

        // Adding the event
        window.addEventListener('keydown', handleKeyDown);

        // Clear the event when the component is removed
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [username, password]); // Listens for username and password changes
    
    return (
        <div className="login-page">
            <div className="login-container">
                <img src={"/images/Logo.png"} alt="Logo" className="login-logo" />
                <p className="login-header">Welcome to Asset Spine Software</p>
                <p className="login-subheader">Please log in to continue</p>
                <div className="login-input-container">
                    <img src="/images/User_Icon.png" alt="user icon" className="icon" />
                    <input
                        type="text"
                        className="login-input"
                        placeholder="Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="login-input-container">
                    <img src="/images/Lock_Icon.png" alt="lock icon" className="icon" />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className="login-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={togglePasswordVisibility} className="toggle-password-btn">
                        <img src='/images/visible.png' alt='Toggle Password Visibility' width='20px' />
                    </button>
                </div>
                <button className="login-button" onClick={handleLogin}>
                    Log In
                </button>
            </div>
        </div>
    );
};

export default LogIn;

/*
 * The LogIn component is a React component for user authentication in the Asset Spine Software. It provides a user interface for entering login credentials (username and password) and handles login attempts with a backend API. The component also includes functionality for showing or hiding the password.

 * State Variables:
 * 1. **username (String)**:
 *    - Stores the current value of the username (email) input field.
 *
 * 2. **password (String)**:
 *    - Stores the current value of the password input field.
 *
 * 3. **showPassword (Boolean)**:
 *    - Toggles the visibility of the password field (show/hide password).
 *
 * Functions:
 * 1. **togglePasswordVisibility (Function)**:
 *    - Toggles the value of `showPassword` to show or hide the password when the user clicks the visibility button.
 *
 * 2. **handleLogin (Function)**:
 *    - Sends a POST request to the login API (`/login`) with the entered username and password.
 *    - If login is successful (status code 200), it clears the input fields and redirects the user to the Home page with their user ID.
 *    - If login fails, it shows an alert with the error message from the response.
 *
 * useEffect Hook:
 * - Adds a keydown event listener to trigger the login when the Enter key is pressed.
 * - The event listener is cleaned up when the component is unmounted or when the username or password changes.
 *
 * JSX Structure:
 * 1. Displays the company logo and login instructions.
 * 2. Provides input fields for the username and password.
 * 3. Includes a button for toggling password visibility.
 * 4. Contains a login button that calls the `handleLogin` function.
 *
 * Styles:
 * - The component uses CSS classes like `login-page`, `login-container`, `login-input-container`, and others defined in the `LogIn.css` file to style the login page.
 *
 * This component serves as the entry point for users logging into the application, ensuring that only authenticated users can access further functionalities.
 */

