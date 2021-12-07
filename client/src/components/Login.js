import React from 'react';
import './Login.css';
import time from '../time.png'
import styled from "styled-components";

function Login() {
    const googleLogin = () => { //was const not function = () => {
        window.open("http://localhost:8080/auth/google", "_self");
        //window.location.href = "localhost:8080/auth/google";
    }

    return(
        <Main>
            <div className="center">
                <h1 style={textStyle}>Welcome!</h1>
                <h3 style={smallTextStyle}>Please Sign In With Your Google Account </h3>
                <h3 style={smallTextStyle}>To Access Your Dashboard </h3>
                <div className="button" onClick={googleLogin}>
                    <img src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png' alt="Google Icon" />
                    <p>Login With Google</p>
                </div>
            </div>
        </Main>

    )
}


export default Login;

const Main = styled.div`
    height: 100vh;
    width: 100vw;
    background: #377F87;
    font-family: 'Proxima Nova';
    text-transform: uppercase;
    text-align: center;
    font-size: 1em;
    display: flex;
    flex-flow: column;
`

const textStyle = {
    textDecoration: 'none',
    color: '#F6F6F2'
}

const smallTextStyle = {
    textDecoration: 'none',
    color: '#BADFE7'
}

