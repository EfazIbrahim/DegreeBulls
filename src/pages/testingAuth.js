import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';
import { auth, db } from '../firebase/firebase.js';
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import logo from '../assets/logo.png';

function Auth() {
    const navigate = useNavigate();
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [role, setRole] = useState('student'); // Default role is 'student'

    const capitalize = (role) => {
        switch(role) {
            case 'student':
                return "Student";
            case 'advisor':
                return "Advisor";
            case 'staff':
                return "Staff";
            case 'instructor':
                return "Instructor";	
            case 'admin':
                return "admin";
            default:
                return "Invalid Role";
        }
    };

    const handleNavigation = async () => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            if (result.user) {
                const userID = result.user.uid;
                const userRef = doc(db, capitalize(role), userID);
                try {
                    const user = await getDoc(userRef);
                    if (user.exists()) {
                        navigate(`/${role}`);
                    } else {
                        alert("User does not exist in the database");
                    }
                } catch (docError) {
                    console.error("Error fetching user document:", docError);
                    alert("Failed to verify user");
                }
            }
        } catch (error) {
            console.error("Authentication failed:", error);
            alert("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="auth">
            <img className="auth-logo" src={logo} alt="Degree Bulls Logo"/>
            <div className="auth-option">
                <label className="auth-label">Email:   </label>
                <input
                    className="auth-searchbar"
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email" 
                    required 
                />
            </div>
            <div className="auth-option">
                <label className="auth-label">Password:   </label>
                <input
                    className="auth-searchbar"
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter your password" 
                    required 
                />
            </div>
            <div className="auth-option">
                <label className="auth-label">Role:   </label>
                <select className="auth-select" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="student">Student</option>
                    <option value="advisor">Advisor</option>
                    <option value="staff">Staff</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button className="auth-button" onClick={handleNavigation}>Log In</button>
        </div>
    );
}

export default Auth;