import './RegisterPage.css';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function RegisterPage(params) {

    var serverAddress = "localhost:7000";
    async function postData(usernameOfUser, passwordOfUser, server) {

        try {
            await axios.post("http://localhost:7000/api/Users",
                { Username: usernameOfUser, Password: passwordOfUser, Server: server })
            alert("You have successfully registered! go back to login page");
        }

        catch {
            alert("The user is already exist!");
        }
    }

    function validatePassword(e) {
        e.preventDefault();
        var username = document.getElementById("Username").value;
        var password = document.getElementById("Password1").value;
        var confirm_password = document.getElementById("Password2").value;

        if (username.length === 0 || password.length === 0
            || confirm_password.length === 0) {
            alert("Please fill all fields properly!");
            return;
        }

        if (password.length < 8 && confirm_password.length < 8) {
            alert("Password too short! Please enter 8 characters or more");
            return;
        }

        if (password !== confirm_password) {
            alert("Passwords Don't Match");
            return;

        }

        else {
            postData(username, password, serverAddress);
        }
        return;
    }

    return (
        <form>
            <div className="container">
                <div className="outterBlock">
                    <div className="block1">
                        <div className="form-floating very-cool-margin">
                            <input type="username" className="form-control" id="Username" placeholder="text" ></input>
                            <label htmlFor="floatingInput">Username</label>
                        </div>

                        <div className="form-floating very-cool-margin">
                            <input type="password" className="form-control" id="Password1" placeholder="Password" minLength="8" ></input>
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="Password2" placeholder="Password" minLength="8"></input>
                            <label htmlFor="floatingPassword">Confirm password</label>
                        </div>
                    </div>
                    <button type="sumbit" className="btn btn-success" onClick={validatePassword}> Register </button>
                    <div className="register-link">Already registered? <Link to="/" className="link-success">Click here</Link> to login.</div>
                </div>
            </div>
        </form>
    );
}


export default RegisterPage;