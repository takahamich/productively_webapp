import React from 'react';
import './Login.css';
import time from '../time.png'

function Login() {
    const googleLogin = () => { //was const not function = () => {
        window.open("http://localhost:8080/auth/google", "_self");
        //window.location.href = "localhost:8080/auth/google";
    }

    return(
        // <div className="login-wrapper">
        //     <div className="login-headers">
        //         <h1>Hi! It's nice to see you here!</h1>
        //         <h2>please log in to access web-app.</h2>
        //         <div className="googleContainer" onClick={googleLogin}>
        //             <img src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png' alt="Google Icon" />
        //             <p>Login With Google</p>
        //         </div>
        //         {/*<LoginButton/>*/}
        //     </div>
        // </div>

    <div className="main">
        <div className="sub-main">
            <div>
                <div className="imgs">
                    <div className="container-image">
                        <img src={time} alt="temp" className="profile"/>
                    </div>
                </div>
                <div>
                    <h1>Welcome to Productivity!</h1>
                    <div className="googleContainer" onClick={googleLogin}>
                        <img src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png' alt="Google Icon" />
                        <p>Login With Google</p>
                    </div>
                </div>
            </div>

        </div>
    </div>

    )
}


export default Login;

