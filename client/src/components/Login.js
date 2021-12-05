import React, {useEffect, useState} from 'react';
import './Login.css';
import axios from "axios";

function Login() {
    const googleLogin = () => { //was const not function = () => {
        window.open("http://localhost:8080/auth/google", "_self");
        //window.location.href = "localhost:8080/auth/google";
    }


    return(
        <div className="login-wrapper">
            <div className="login-headers">
                <h1>Hi! It's nice to see you here!</h1>
                <h2>please log in to access web-app.</h2>
                <div className="googleContainer" onClick={googleLogin}>
                    <img src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png' alt="Google Icon" />
                    <p>Login With Google</p>
                </div>
                {/*<LoginButton/>*/}
            </div>
        </div>
      )
}


export default Login;





