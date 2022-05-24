import './LoginPage.css';
import LoginLogo from './LoginPageImage.png'
import React from 'react';
import { validateUser, userDataBase } from '../DataBase/DataBase';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function LoginPage() {


    async function getData(usernameOfUser, passwordOfUser){

        try{
         await axios.get(
             "http://localhost:7000/api/Users?username="+ usernameOfUser + "&password=" + passwordOfUser,
          {Username:usernameOfUser, Password:passwordOfUser})
          alert("SignIn successfully");
        }

        catch {
            alert("user doesn't exist");
        }
     } 

    let navigate = useNavigate()

    function validatefields() {
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
           
                getData(username,password);
              navigate("ChatPage", { state: userDataBase.get(username) });
            
            // if (userDataBase.has(username)) {
            //     if (validateUser(username, password)) {
            //         alert("SignIn successfully");
            //         navigate("ChatPage", { state: userDataBase.get(username) });
            //         return;
            //     }

            // }
            // alert("user doesn't exist");
            // return;
        }
    }

    return (
        <div className="container">
            <div className="image-container"><img src={LoginLogo} className="logo-img"></img></div>
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