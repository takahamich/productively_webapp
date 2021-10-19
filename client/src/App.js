import React from 'react';
import './App.css'
import { useEffect , useState } from "react";
import Login from './components/Login';
import 'react-calendar/dist/Calendar.css';
import Calendars from './components/Calendars.js';
import styled from 'styled-components'
import TaskButton from "./components/TaskButton";
import Task from "./components/Task";


function App() {
  const [token, setToken] = useState();
  const [toggle, setToggle] = useState(false);

  if(!token) {
    return <Login setToken={setToken} />
  }

  // Handle when the user creates the create task button
  function handleOnClick(){
    setToggle(!toggle);
  } 

  return (
  <ParentWrapper>
    <h1>Welcome Home, User</h1>
    <SubParentWrapper selected={toggle}>
      <TopWrapper>
        <CalendarWrapper>
          <Calendars/>
        </CalendarWrapper>
        <ButtonWrapper>
          <TaskButton onClick={handleOnClick}/>
        </ButtonWrapper>
      </TopWrapper>
      {/* <BodyWrapper>
        <CalendarWrapper> 
          <Calendar/>
        </CalendarWrapper>
        <TaskWrapper/>
      </BodyWrapper> */}
      {toggle && <Task onClick={handleOnClick}/>}
    </SubParentWrapper>
  </ParentWrapper>
  )
}

const SubParentWrapper = styled.div`
    // background-color: purple;
    height: 100%;
    width: 100%;
    ${props => props.selected === true && `
        display: flex;
        flex-direction: column;
        justify_content: center;
        width: 81.2%;
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
    height: 100vh;
    width: 100vw;
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
  height: 100px;
  width: 400px;
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
  // background: pink;
  height: 100vh;
  width: 100%
 
`;

export default App;