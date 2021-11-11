import React from 'react';
import './App.css'
import {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import 'react-calendar/dist/Calendar.css';
import Calendars from './components/Calendars.js';
import styled from 'styled-components'
import TaskButton from "./components/TaskButton";
import Task from "./components/Task";
import { loadGoogleScript } from './GoogleLogin';
import logo from './logo.svg'
const googleClientId = '844612426523-iqc51n1du6su4dome75g0n7p35ru5k7j.apps.googleusercontent.com'

export let creator = "";

function App() {
    const [toggle, setToggle] = useState(false);

    //LOGIN FUNCTIONALITY
    const [gapi, setGapi] = useState();
    const [googleAuth, setGoogleAuth] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState('');
    const [userId, setId] = useState(); //might be able to pass this in to post tasks to specific user
    const [userEmail, setEmail] = useState('');

    creator = userEmail;

    const onSuccess = (googleUser) => { // (Ref. 7)
        setIsLoggedIn(true);
        const profile = googleUser.getBasicProfile();
        setName(profile.getName());
        setId(profile.getId());
        setEmail(profile.getEmail());

        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());

        // The ID token you need to pass to your backend:
        const id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);

        const newUser = {
            googleId: id_token,
            name: profile.getName(),
            email: profile.getEmail(),
        }

        fetch('http://localhost:8080/signedin', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            console.log(response.text);
        }).catch(err => {
            console.log(err);
        });


        alert("Your profile info has successfully been posted!");
    };

    const onFailure = () => {
        setIsLoggedIn(false);
    }

    const logOut = () => { // (Ref. 8)
        (async() => {
            await googleAuth.signOut();
            setIsLoggedIn(false);
            renderSigninButton(gapi);
        })();
    };

    const renderSigninButton = (_gapi) => { // (Ref. 6)
        _gapi.signin2.render('google-signin', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': onSuccess,
            'onfailure': onFailure
        });
    }


    useEffect(() => {

        // Window.gapi is available at this point
        window.onGoogleScriptLoad = () => { // (Ref. 1)

            const _gapi = window.gapi; // (Ref. 2)
            setGapi(_gapi);

            _gapi.load('auth2', () => { // (Ref. 3)
                (async () => {
                    const _googleAuth = await _gapi.auth2.init({ // (Ref. 4)
                        client_id: googleClientId
                    });
                    setGoogleAuth(_googleAuth); // (Ref. 5)
                    renderSigninButton(_gapi); // (Ref. 6)
                })();
            });
        }

        // Ensure everything is set before loading the script
        loadGoogleScript(); // (Ref. 9)

    }, []);
    //END
  // Handle when the user creates the create task button
  function handleOnClick(){
      setToggle(!toggle);
  }


  return (
      <div className="App">
          <div className="head">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>'App Name'</h2>
              <h3>the best time-management web application</h3>
          </div>
          {!isLoggedIn &&
          <div id="google-signin"></div>
          }

          {isLoggedIn &&
              <ParentWrapper>
                  <h1>Welcome Home, {name}</h1>
                  <button className='btn-primary' onClick={logOut}>Log Out</button>
                  <SubParentWrapper selected={toggle}>
                      <TopWrapper>
                        <CalendarWrapper>
                            <Calendars/>
                        </CalendarWrapper>
                          <ButtonWrapper>
                              <TaskButton onClick={handleOnClick}/>
                          </ButtonWrapper>
                          <ButtonWrapper>
                              <button>View my Tasks</button>
                          </ButtonWrapper>
                      </TopWrapper>
                  {/*<BodyWrapper>
                    <CalendarWrapper>
                    <Calendar/>
                    </CalendarWrapper>
                    <TaskWrapper/>
                    </BodyWrapper> */}
                  </SubParentWrapper>
                  {toggle && <Task onClick={handleOnClick}/>}
              </ParentWrapper>
              }

      </div>
  )
}

const SubParentWrapper = styled.div`
    // background-color: purple;
    height: 100vh;
    width: 100vw;
    ${props => props.selected === true && `
        display: flex;
        flex-direction: column;
        justify_content: center;
        width: 80vw;
        padding:0px;
        overflow-y: hidden;
        overflow-x: hidden;
        // background-color: red;
    `}
`
// const SubParentWrapper2 = styled.div`
//     display: flex;
//     flex-direction: row;
//     height: 100vh;
//     width: 80vw;
// `;
const ParentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify_content: center;
    // height: 100vh;
    // width: 100vw;
    padding:0px;
    overflow-y: hidden;
    overflow-x: hidden;
    // background: pink;
`;


const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  // background: blue;
  flex-grow:1;
  
`;

const ButtonWrapper = styled.div`
  // background: red;
  max-height: 100px;
  max-width: 400px;
  padding: 10px;
  padding-right: 10px;
`;


// const BodyWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   // background: yellow;
//   height: 100vh;
//   width: 100vw;
// `;

const CalendarWrapper = styled.div`
  display: flex;
  flex-grow:1;
 
`;

export default App;