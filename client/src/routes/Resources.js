import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {myContext} from "../Context";

function Resources() {
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

    return (
        <Container>
            <SidebarWrapper>
                <InfoWrapper>
                    <PicWrapper>
                        {
                            userObject ? (
                                <PicStyle
                                    src={userObject.picture}
                                    alt="profile picture"/>
                            ) : (
                                <h3>none</h3>
                            )
                        }
                    </PicWrapper>
                    {
                        userObject ? (
                            <p>{userObject.name}</p>
                        ) : (
                            <p>FirstName LastName</p>
                        )
                    }
                </InfoWrapper>
                <NavWrapper>
                    <NavElement>
                        <Link to="/home" style={linkStyle}>Calendar</Link>
                    </NavElement>
                    <NavElement>
                        <Link to="/tasks" style={linkStyle}>Tasks</Link>
                    </NavElement>
                    <NavElement>
                        <Link to="/tracker" style={linkStyle}>Goal Tracker</Link>
                    </NavElement>
                    <FocusNavElement>
                        <Focus> </Focus>
                        <Link to="/resources" style={focusLinkStyle}>Resources</Link>
                    </FocusNavElement>
                </NavWrapper>
                <LogoutElement>
                    <Link to="/" style={logoutStyle} onClick={logout}>Log Out</Link>
                </LogoutElement>
            </SidebarWrapper>
            <MainWrapper>
                <Category>
                    The Method Behind Our Site
                </Category>
                <a href="https://blog.usejournal.com/calendar-in-stead-of-to-do-lists-9ada86a512dd"
                      style={resourceLinkStyle}>Scheduling Multiplier</a>
                <ResourceDescription>The article that started it all: tips for reshaping how to get things done.</ResourceDescription>

                <Category>
                    For More
                </Category>
                <a href="https://www.coursera.org/learn/learning-how-to-learn"
                   style={resourceLinkStyle}>Learning How to Learn, Course by Barbara Oakley</a>
                <ResourceDescription>The secrets behind learning, procrastination, creativity, getting things done, and more.</ResourceDescription>
                <a href="https://fsou1.github.io/2020/06/12/Learning_how_to_learn/"
                   style={resourceLinkStyle}>Learning How to Learn, Summary #1</a>
                <ResourceDescription>A brief summary of Dr. Oakley's course above.</ResourceDescription>
                <a href="https://medium.com/learn-love-code/learnings-from-learning-how-to-learn-19d149920dc4"
                   style={resourceLinkStyle}>Learning How to Learn, Summary #2</a>
                <ResourceDescription>Another brief summary of Dr. Oakley's course above.</ResourceDescription>
                <a href="https://www.lifehack.org/878293/effective-to-do-list"
                   style={resourceLinkStyle}>Strategies for To Do Lists</a>
                <ResourceDescription>How to turn "do" into "done".</ResourceDescription>
            </MainWrapper>
        </Container>
    )
}

export default Resources;

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
    min-width: 23vw;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
`

const NavWrapper = styled.div`
    width: 75%;
    height: 100%;
    order: 2;
`

const MainWrapper = styled.div`
    width: 77%;
    overflow: scroll;
    margin-top: 8em;
    margin-left: 5%;
`

const Category = styled.div`
    color: #1D3C4A;
    font-size: 1.5em;
    text-align: left; 
    text-transform: bold;
    vertical-align: middle;
    padding-top: 2%;
    padding-bottom: 2%;
    margin-bottom: 2%;
    border-bottom: 2px solid grey;
    width:85%;
`

const ResourceDescription = styled.div`
    color: #D3D3D3;
    text-align: left; 
    vertical-align: middle;
    padding-top: 0.25%;
    padding-bottom: 2%;
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

const logoutStyle = {
    color: '#F6F6F2',
    textDecoration: 'none',
}

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

const resourceLinkStyle = {
    textDecoration: 'none',
    color: '#41b5a9'
}

const PicStyle = styled.img`
    height: 75px;
    width: 75px;
    border-radius: 50%;
`