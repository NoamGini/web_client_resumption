import './LoginPage.css';
import LoginLogo from './LoginPageImage.png'
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function LoginPage() {


    async function getData(usernameOfUser, passwordOfUser) {

        try {
            var response = await axios.get(
                "http://localhost:7000/api/Users?username=" + usernameOfUser + "&password=" + passwordOfUser,
                { Username: usernameOfUser, Password: passwordOfUser })
            alert("SignIn successfully");
            return response.data;
        }

        catch(error) {
            return error
        }
    }

    let navigate = useNavigate()

    async function validatefields() {
        var username = document.getElementById("Username").value;
        var password = document.getElementById("Password").value;
        if (username.length === 0 || password.length === 0) {
            alert("Please fill all fields properly!");
            return;
        }
        if (password.length < 8) {
            alert("Password too short! Please enter 8 characters or more");
            return;
        } else {

            var currentUser = await getData(username, password);
            if (currentUser.message !== "Request failed with status code 400" ||
                currentUser.message !== "Request failed with status code 404") {
                navigate("ChatPage", { state: currentUser });
                return;
            }
            alert("user doesn't exist");
            navigate("/", { state: currentUser });
            return;
        }
    }

    return (
        <div className="container">
            <div className="image-container"><img src={LoginLogo} alt="" className="logo-img"></img></div>
            <div className="outterBlock">
                <div className="block">
                    <div className="form-floating very-cool-margin">
                        <input type="username" className="form-control" id="Username" placeholder="text" required></input>
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="Password" placeholder="Password" minLength="8" required></input>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-success" onClick={validatefields}> Login </button>
                <div className="register-link">Not registered? <Link to="RegisterPage" className="link-success">Click here</Link> to register.</div>
            </div>
        </div>
    );
}

export default LoginPage;