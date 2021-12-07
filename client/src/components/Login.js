import React from 'react';
import './Login.css';
import logo from '../m.OOSE_logo.png'
import styled from "styled-components";

function Login() {
    const googleLogin = () => { //was const not function = () => {
        window.open("http://localhost:8080/auth/google", "_self");
        //window.location.href = "localhost:8080/auth/google";
    }

    return(
        <Main>
            <div className="center">
                <img src={logo} alt="mOOSE logo" width={'250px'}/>
                {/*<h1 style={textStyle}>Welcome!</h1>*/}
                <h3 style={smallTextStyle}>Welcome! Please Sign In With Your</h3>
                <h3 style={smallTextStyle}>Google Account To Access Your Dashboard</h3>
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

