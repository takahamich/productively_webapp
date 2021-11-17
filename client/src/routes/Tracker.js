import React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";

function Tracker() {
    return (
        <Container>
            <SidebarWrapper>
                <InfoWrapper>
                    <PicWrapper> </PicWrapper>
                    Firstname Lastname
                </InfoWrapper>
                <NavWrapper>
                    <NavElement>
                        <Link to="/" style={linkStyle}>Calendar</Link>
                    </NavElement>
                    <NavElement>
                        <Link to="/tasks" style={linkStyle}>Tasks</Link>
                    </NavElement>
                    <FocusNavElement>
                        <Focus> </Focus>
                        <Link to="/tracker" style={focusLinkStyle}>Goal Tracker</Link>
                    </FocusNavElement>
                    <NavElement>
                        <Link to="/resources" style={linkStyle}>Resources</Link>
                    </NavElement>
                </NavWrapper>
                <LogoutElement>
                    Log Out
                </LogoutElement>
            </SidebarWrapper>
            <TodayWrapper>

                <WrapperHeader>
                    Today
                </WrapperHeader>
                <WrapperHeader>Your Tasks Have Taken</WrapperHeader>
                <TodayMultiplier>1.5x</TodayMultiplier>
                <WrapperHeader>The Amount of Time You Predicted</WrapperHeader>

                <WrapperMessage> Oof. Do you need a day off on Tuesdays?
                    Are you taking a day off at least once a week?</WrapperMessage>

            </TodayWrapper>
            <ThisWeekWrapper>

                <WrapperHeader>
                    This Week
                </WrapperHeader>
                <WrapperHeader>Your Tasks Have Taken</WrapperHeader>
                <ThisWeekMultiplier>2.3x</ThisWeekMultiplier>
                <WrapperHeader>The Amount of Time You Predicted</WrapperHeader>

                <WrapperMessage> Hmm, do you want to add some buffer time
                    in your day, and plan to spend more time on your tasks? </WrapperMessage>

            </ThisWeekWrapper>
        </Container>
    )
}

export default Tracker;

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
    width: 23%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
`

const NavWrapper = styled.div`
    width: 75%;
    height: 100%;
    order: 2;
`

const TodayWrapper = styled.div`
    width: 35%;
    overflow: scroll;
    margin-top: 8em;
    margin-left: 5%;
    padding-right: 2%;
    text-align: center; 
    vertical-align: middle;
    border-right: 2px solid grey;
    height: 75%;
`

const WrapperHeader = styled.div`
    color: #1D3C4A;
    text-align: center; 
    vertical-align: middle;
    padding-top: 2%;
`

const TodayMultiplier = styled.div`
    color: #377F87;
    font-size: 12em;
    text-align: center; 
    text-transform: lowercase;
    vertical-align: middle;
    padding-top: 5%;
    padding-bottom: 5%;
`

const WrapperMessage = styled.div`
    color: #377F87;
    text-align: center; 
    text-transform: none;
    vertical-align: middle;
    padding-top: 15%;
`

const ThisWeekWrapper = styled.div`
    width: 35%;
    overflow: scroll;
    margin-top: 8em;
    margin-left: 5%;
    text-align: center; 
    vertical-align: middle;
    padding-left: 2%;
`

const ThisWeekMultiplier = styled.div`
    color: #F76D6C;
    font-size: 12em;
    text-align: center; 
    text-transform: lowercase;
    vertical-align: middle;
    padding-top: 5%;
    padding-bottom: 5%;
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

const scoreStyle = {
    textDecoration: 'none',
    textAlign: 'center',
    color: '#1D3C4A'
}

const focusLinkStyle = {
    color: '#F6F6F2',
    textDecoration: 'none',
    order: 2,
    marginLeft: '2.7em',
}