import './RegisterPage.css';
import { useEffect, useState } from 'react';
import React from 'react';
import { addUserToData, validateUser, userDataBase } from '../DataBase/DataBase';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function RegisterPage(params) {

    // const [userData, setUserData] = useState([]);
    // useEffect(async () => {
    //     const res = await fetch('http://localhost:7000/api/Users');
    //     //const data = await res.json();
    // },[])

    // let serverAddress = "localhost:7000";
    // var myServer = "localhost";
    // var myPort = "7000";
    
    // async function postData(usernameOfUser, passwordOfUser, server) {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ "username": usernameOfUser, "password": passwordOfUser, "server": myServer + ":" + myPort })
    //     };

    //     const response = await fetch("http://" + server + "/api/Users", requestOptions);
    //     return response.ok;
    // }

    var serverAddress = "localhost:7000";
     async function postData(usernameOfUser, passwordOfUser, server){

        try{
         await axios.post("http://localhost:7000/api/Users",
          {Username:usernameOfUser, Password:passwordOfUser, ServerAddress:server})
          alert("You have successfully registered! go back to login page");
        }

        catch {
            alert("The user is already exist!");
        }
     } 








    // async function postData(url = '', data = {}) {
    //     // Default options are marked with *
    //     const response = await fetch(url, {
    //       method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //       mode: 'no-cors',
    //       headers: {
    //         'Content-Type': 'application/json'

    //       },
    //       body: JSON.stringify(data) // body data type must match "Content-Type" header
    //     });
    //     return response.json(); // parses JSON response into native JavaScript objects
    //   }


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

            postData(username,password, serverAddress);





            // postData({usernameOfUser: username , passwordOfUser: password})
            // .then (data =>{
            //     console.log(data.json())});

            // if (userDataBase.has(username)) {
            //     if (validateUser(username, password)) {
            //         alert("The user is already exist!");
            //         return;
            //     }
            // }
            // addUserToData(username, password);
            // alert("You have successfully registered! go back to login page");
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