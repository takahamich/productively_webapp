import React, {useState, useEffect, useContext} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import TaskCard from "../components/TaskCard";
import TaskButton from "../components/TaskButton";
import Task from "../components/Task";
import UpdateTask from "../components/ModifyTask";
//import TaskGroup from '../components/TaskGroup';
import {myContext} from "../Context";
import axios from "axios";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    //const [dates, setDates] = useState(new Set());
    //const [dateArray, setDateArray] = useState([]);
    const [toggle, setToggle] = useState(false);

    const logout = () => {
        axios.get("http://localhost:8080/auth/logout", {
            withCredentials: true
        }).then(res => {
            if (res.data === "done") {
                window.location.href = "/"
            }
        })
    }
    const userObject = useContext(myContext);
    console.log('user object :' + userObject);
    console.log('user object email:' + userObject.email);

    useEffect(() => {
        fetch('http://localhost:8080/myTasks/' + userObject.email)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                setTasks(tasks => [...tasks, data[i]]);
                //setDates(dates => new Set(dates).add(data[i].predictedEndDate));
            }
            //setDateArray([...dates]);
            console.log(tasks);
        })
        .catch(err => setTasks(err.message));
    }, []);



    function handleOnClick(){
        setToggle(!toggle);
    }



    return (
        <Container>
            <SidebarWrapper>
                <InfoWrapper>
                    <PicWrapper>
                        {
                            userObject ? (
                                <img className="ProfilePicture"
                                     src={userObject.picture}
                                     alt="profile picture"/>
                            ) : (
                                <h3>none</h3>
                            )
                        }
                    </PicWrapper>
                    {
                        userObject ? (
                            <h3>{userObject.name}</h3>
                        ) : (
                            <h3>FirstName LastName</h3>
                        )
                    }
                </InfoWrapper>
                <NavWrapper>
                    <NavElement>
                        <Link to="/home" style={linkStyle}>Calendar</Link>
                    </NavElement>
                    <FocusNavElement>
                        <Focus> </Focus>
                        <Link to="/tasks" style={focusLinkStyle}>Tasks</Link>
                    </FocusNavElement>
                    <NavElement>
                        <Link to="/tracker" style={linkStyle}>Goal Tracker</Link>
                    </NavElement>
                    <NavElement>
                        <Link to="/resources" style={linkStyle}>Resources</Link>
                    </NavElement>
                </NavWrapper>
                <LogoutElement>
                    <Link to="/" onClick={logout}>Log Out</Link>
                </LogoutElement>
            </SidebarWrapper>
            <TaskWrapper>
                {/*dateArray.map(d => (<TaskGroup date={d} tasks={tasks.slice(0,4)}/>))*/
                    tasks.map(t => (
                            <TaskCard
                                id={t._id}
                                taskName={t.taskName}
                                deadline={t.predictedEndDate}
                                startDate={t.startDate}
                                startTime={t.startTime}
                                priority={t.priority}
                                difficulty={t.difficulty}
                                predictHours={t.predictedTimeHours}
                                predictMins={t.predictedTimeMinutes}
                            />
                        ))}
            </TaskWrapper>
            <ButtonWrapper>
                <TaskButton onClick={handleOnClick}/>
            </ButtonWrapper>
            {toggle && <Task onClick={handleOnClick}/>}
        </Container>
    )
}

export default Tasks;

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background: #F6F6F2;
    font-family: 'Proxima Nova';
    text-transform: uppercase;
    font-size: 1em;
    display: flex;
    flex-flow: row;
`

const InfoWrapper = styled.div`
    width: 100%;
    order: 1;
    color: #F6F6F2;
    margin: 2em 0 3em 0;
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
`

const PicWrapper = styled.div`
    height: 75px;
    width: 75px;
    border-radius: 50%;
    background: #F6F6F2;
    margin: 1.5em;
`

const SidebarWrapper = styled.div`
    background: #377F87;
    left: 0;
    height: 100vh;
    width: 25vw;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
`

const NavWrapper = styled.div`
    width: 75%;
    height: 100%;
    order: 2;
`

const TaskWrapper = styled.div`
    width: 77%;
    overflow: scroll;
    margin-top: 8em;
    margin-left: 5%;
`

const ButtonWrapper = styled.div`
    margin-top: auto;
    margin-right: 1em;
    margin-bottom: 1em;
`

const NavElement = styled.div`
    text_decoration: none;
    margin: 2.5em 0 2.5em 3em;
`

const FocusNavElement = styled(NavElement)`
    display: flex;
    margin: 2.5em 0 2.5em 0;
    padding: 0;
`

const Focus = styled.div`
    height: 1.25em;
    width: 5px;
    order: 1;
    background: #F6F6F2;
    left: 0,
`

const LogoutElement = styled.div`
    order: 3;
    color: #F6F6F2;
    margin: 2.5em 0 2.5em 3em;
`

const linkStyle = {
    textDecoration: 'none',
    color: '#BADFE7'
}

const focusLinkStyle = {
    color: '#F6F6F2',
    textDecoration: 'none',
    order: 2,
    marginLeft: '2.7em',
}