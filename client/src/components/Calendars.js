
import { Calendar, dateFnsLocalizer} from 'react-big-calendar' 
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, {useState, useEffect, useContext} from "react";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import events from './events.js';
import {myContext} from "../Context";


// const socket = io('http://localhost:8080', { transports: ['websocket', 'polling', 'flashsocket'] });
const locales = {
  "en-US": require("date-fns/locale/en-US")
  }

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})



function Calendars({userEmail}){
  const myCurrentDate = new Date();
  const date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate();
  const newCurrentDate = "Current Date and Time: "+date;
  console.log("today", newCurrentDate)
  const DnDCalendar = withDragAndDrop(Calendar);

  const userObject = useContext(myContext);
  console.log('user object :' + userObject);
  console.log(userEmail);

  // const [newEvent, setNewEvent] = useState({
  //   title: "",
  //   start: "",
  //   end:""
  // })

  const [allEvents, setAllEvents] = useState(null)

  function handleAddEvent(){
    setAllEvents([...allEvents])
  }

  useEffect(() => {
    console.log("use effect")
    fetch('http://localhost:8080/myTasks/' + userObject.email)
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log("OUR DATA", data)
        const parsedData = parse(data)
        setAllEvents(parsedData)
      })
  }, [])

  function getDate(date){

    const finalDate = date.split("-")
    
    return new Date(finalDate[0], finalDate[1]-1, finalDate[2], 0, 0, 0)
  }

  function parse(data){
   

    var finalData = []
    data.forEach((singleData) => {
      // if (singleData["creator"] === "ayomide.ajayi2839@gmail.com"){
        // console.log("SingleData", singleData)
        var finalSingleData = 
        {
          id: singleData._id,
          title: singleData.taskName,
          start: getDate(singleData.startDate), //new Date(singleData.predictedEndDate),
          end: getDate(singleData.predictedEndDate), //new Date(singleData.startDate)
          priority: singleData.priority
       

      }
      finalData.push(finalSingleData)

      // }

      //console.log( singleData._id , singleData.taskName ,singleData.predictedEndDate ,singleData.startDate)
     
    })
    return finalData
  }
  return (
    <div>
      { allEvents && <DnDCalendar
      localizer={localizer}
      events={allEvents}
      startAccessor="start"
      endAccessor="end"
      style={{height: '100vh', width: '77vw', padding: 30, color: "black"}}
      eventPropGetter={
        (events) => {
          let newStyle = {
            backgroundColor: "lightgrey",
            color: 'black',
            borderRadius: "0px",
            border: "none"
          };
          if (events.priority == "1"){
            newStyle.backgroundColor = '#6FB3B8';
          } else if (events.priority == "2"){
            newStyle.backgroundColor = '#E8C067';
          } else {
            newStyle.backgroundColor = '#E07A7A';
          }
          return {
            className: "",
            style: newStyle
          };
        }
      }
  
      />}
    </div>
  )
}


export default Calendars;


// The component you should use instead the one you mentioned.
