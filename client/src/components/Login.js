import React, { useState } from 'react';
import './Login.css';

function Login() {
    const googleLogin = () => {
        window.open("localhost:8080/auth/google", "");
    }

    return(
        <div className="login-wrapper">
            <div className="login-headers">
                <h1>Hi! It's nice to see you here!</h1>
                <h2>please log in to access web-app.</h2>
                <div className="googleContainer" onClick={googleLogin}>
                    {/*<img src={googleImage} alt="Google Icon" />*/}
                    <p>Login With Google</p>
                </div>
                {/*<LoginButton/>*/}
            </div>
        </div>
      )
}


export default Login;





