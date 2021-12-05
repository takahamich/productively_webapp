
import React, { useContext, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {myContext} from "../Context";




function Tracker() {
    const myCurrentDate = new Date();
    // const date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate();
    const date = (myCurrentDate.getMonth()+1) + '/' + myCurrentDate.getDate() + '/' + myCurrentDate.getFullYear();
    // var time = myCurrentDate.getHours() + ":" + myCurrentDate.getMinutes()
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var day = days[myCurrentDate.getDay()];
    const userObject = useContext(myContext);


    var myPastDate1 = new Date(myCurrentDate);
    myPastDate1.setDate(myPastDate1.getDate() - 6)
    var day1 = days[myPastDate1.getDay()];
    const date1 = (myPastDate1.getMonth()+1) + '/' + myPastDate1.getDate() + '/' + myPastDate1.getFullYear();


    const [productiveScore, setProductiveScore] = useState()
    const [productiveComment, setProductiveComment] = useState()

    const [productiveWeekScore, setProductiveWeekScore] = useState()
    const [productiveWeekComment, setProductiveWeekComment] = useState()

    //This could be more efficient but using this way for now
    const [productiveWeekMondayScore, setProductiveWeekMondayScore] = useState()
    const [productiveWeekTuesdayScore, setProductiveWeekTuesdayScore] = useState()
    const [productiveWeekWednesdayScore, setProductiveWeekWednesdayScore] = useState()
    const [productiveWeekThursdayScore, setProductiveWeekThursdayScore] = useState()
    const [productiveWeekFridayScore, setProductiveWeekFridayScore] = useState()
    const [productiveWeekSaturdayScore, setProductiveWeekSaturdayScore] = useState()
    const [productiveWeekSundayScore, setProductiveWeekSundayScore] = useState()




    useEffect(() => {
        productivityDayScore({"credentials": 'creator'})
        productivityWeekScore({"credentials": 'creator'})
    }, [])


    async function productivityDayScore(credentials) {
        const response = await fetch("http://localhost:8080/goalTracker", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        response.json().then(data => {
            setProductiveScore(data[0])
            setProductiveComment(data[1])

        })
    }


    async function productivityWeekScore(credentials) {
        const response = await fetch("http://localhost:8080/goalTrackerWeek", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        response.json().then(data => {
            console.log("checking data", data)
            processData(data)

        })
    }


    function processData(data){
        if (data.length === 1) {
            console.log("IN HERE")
            setProductiveWeekMondayScore("N/A")
            setProductiveWeekTuesdayScore("N/A")
            setProductiveWeekWednesdayScore("N/A")
            setProductiveWeekThursdayScore("N/A")
            setProductiveWeekFridayScore("N/A")
            setProductiveWeekSaturdayScore("N/A")
            setProductiveWeekSundayScore("N/A")
            setProductiveWeekScore(0)
            setProductiveWeekComment(data[0])
        }
        else{
            setProductiveWeekMondayScore(data[0])
            setProductiveWeekTuesdayScore(data[1])
            setProductiveWeekWednesdayScore(data[2])
            setProductiveWeekThursdayScore(data[3])
            setProductiveWeekFridayScore(data[4])
            setProductiveWeekSaturdayScore(data[5])
            setProductiveWeekSundayScore(data[6])
            console.log(data[7], 'data')
            setProductiveWeekScore(data[7][0])
            setProductiveWeekComment(data[7][1])

        }

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

                {date && <WrapperHeader>
                    Today: {date}
                </WrapperHeader>}
                <WrapperHeader>Your Tasks Have Taken</WrapperHeader>
                <TodayMultiplier> {productiveScore}x </TodayMultiplier>
                <WrapperHeader>less than the Amount of Time You Predicted</WrapperHeader>
                <WrapperMessage> {productiveComment}</WrapperMessage>
            </TodayWrapper>
            <ThisWeekWrapper>
                <WrapperHeader>
                    This Week: {day1}, {date1} - {day}, {date}
                </WrapperHeader>
                <WrapperHeader>Your Tasks Have Taken</WrapperHeader>
                <ThisWeekMultiplier>{productiveWeekScore}x</ThisWeekMultiplier>
                <WrapperHeader>less than the Amount of Time You Predicted</WrapperHeader>
                <WrapperMessage> {productiveWeekComment} </WrapperMessage>




                <WrapperMessage>
                    <h2>Summary:</h2>
                    <li> On Monday, you were  {productiveWeekMondayScore}x, less productive than anticipated. </li>
                    <li> On Tuesday, you were {productiveWeekTuesdayScore}x, less productive than anticipated. </li>
                    <li> On Wednesday, you were {productiveWeekWednesdayScore}x, less productive than anticipated. </li>
                    <li> On Thursday, you were {productiveWeekThursdayScore}x, less productive than anticipated.</li>
                    <li> On Friday, you were  {productiveWeekFridayScore}x, less productive than anticipated. </li>
                    <li> On Saturday, you were  {productiveWeekSaturdayScore}x, less productive than anticipated. </li>
                    <li> On Sunday, you were  {productiveWeekSundayScore}x, less productive than anticipated. </li>


                </WrapperMessage>
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

const dropdownStyle = {
    background: '#fff',
    border: 'none',
    padding: '10px',
    width: '100%',
    margin: '0.25em 0 0.25em 0',
    color: '#1B3D4A',
    fontFamily: 'Proxima Nova',
    fontSize: '1em',
    textTransform: 'uppercase',
    borderRadius: '25px'
}

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



// check if each data in finalData array is completed.
// get the total number of tasks, find the percentage completed.
// If all the tasks are completed then productivity score is 100
// If 50% of the tasks are completed then productivity score is 50
//get all the tasks from the database for that user - Shaina
// get expected time
// get the actual time it took to complete the task [time stamp the user marks as completed] - Michiko