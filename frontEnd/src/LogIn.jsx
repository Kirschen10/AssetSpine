// LogIn.js
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import "./Modal.css";

const LogIn = () => {
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8081/tbl_users')
        .then(res => res.json())
        .then(data => {
            setUsers(data);
        })
        .catch(err => console.log(err));
    }, []);

    const handleLogin = () => {
        if(username ==='' || password === ''){
            return alert('Must fill username and password');
        }

        const email = users.find((user) => user.email === username);
        if(email){
            const usernamePassword = email.password;
            if(usernamePassword === password){
                setUsername('');
                setPassword('');
                history.push(`/Home/${email.id}`);
            }
            else{
               return alert('Incorrect password');
            }
        }
        else{
            return alert('Username not found');
        }
    };
  return (
    <div
      style={{
        backgroundImage: 'url("/images/Login_BG.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', // Adjust the height as needed
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <table style={{ width: "600px" }}>
        <tbody>
        <tr style={{ textAlign: "center" }}>
            <td colSpan='2' style={{ textAlign: "center" }}>
            <img src={"/images/Logo.png"} alt="Logo" />
            </td>
        </tr>
        <tr style={{ backgroundColor: "#405a67" }}>
            <td colSpan='2'>
                <p style={{ color: "white", fontSize: '20px', textAlign: 'center', lineHeight: '40px' }}>
                    Login to continue
                </p>
            </td>
        </tr>
        <br />
        <tr>
            <td style={{ textAlign: 'right' }}><img src="/images/User_Icon.png"/></td>
            <td><input type="text" width='200px' style={{
                                        width: 'calc(100% - 28px)',
                                        padding: '8px',
                                        boxSizing: 'border-box',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        paddingLeft: '28px',
                                        marginBottom: '10px',
                                    }} placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} /></td>
        </tr>
        <tr>
            <td style={{ textAlign: 'right' }}><img src="/images/Lock_Icon.png"/></td>
            <td>
                <div class="wrapper">
                <input type={showPassword ? 'text' : 'password'} width='200px' style={{
                                        width: 'calc(100% - 28px)',
                                        padding: '8px',
                                        boxSizing: 'border-box',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        paddingLeft: '28px',
                                        marginBottom: '10px',
                                    }} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <button onClick={togglePasswordVisibility} style={{ backgroundColor: 'transparent', border: 'none' }}>
                                        <img src='/images/visible.png' alt='Toggle Password Visibility' width='25px' />
                                    </button>

                                    </div>
                </td>
        </tr>
        <tr>
        <td colSpan="2" style={{ textAlign: 'center' }}>
            <button style={{
                width: 'calc(100% - 108px)',
                height: '40px',  // Adjust the height as needed
                borderRadius: '20px',  // Half of the desired height for rounded edges
                backgroundColor: '#77bd1e',
                color: 'white',  // Text color
                border: 'none',  // Remove the border if not needed
                cursor: 'pointer',  // Add a pointer cursor for better UX
                fontSize: '20px'
            }}
            onClick={handleLogin}>
                Log In
            </button>
        </td>
        </tr>
        </tbody>
    </table>
    </div>
    </div>
  );
};

export default LogIn;
