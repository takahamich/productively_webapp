// the imports
import { Calendar, dateFnsLocalizer} from 'react-big-calendar' 
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { useState ,useEffect} from "react";
import io from "socket.io-client";
// import DatePicker from "react-datepicker";
// import Task from "./components/Task";
// import events from './events.js';
// import moment from 'moment'
const socket = io('http://localhost:8080');

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

// const events = [
//   {
//     title: "Big Meeting",
//     allDay: true, 
//     start: new Date(2021, 6, 0),
//     end: new Date(2021, 6, 0)
//   },
//   {
//     title: "Vacation",
//     start: new Date(2021, 6, 7),
//     end: new Date(2021, 6, 10)
//   },
// ]

function Calendars({userEmail}){

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

    fetch('http://localhost:8080/tasks')
      .then(res => {
        return res.json()
      })
      .then(data => {
        // console.log("OUR DATA", data)
        // Chnage to correct format
        const parsedData = parse(data, userEmail)
        setAllEvents(parsedData)

      })



  }, [])

  function getDate(date){

    const finalDate = date.split("-")
    
    return new Date(finalDate[0], finalDate[1]-1, finalDate[2], 0, 0, 0)
  }

  function parse(data, userEmail){
    console.log("Hallelujah", userEmail)

    var finalData = []
    data.forEach( (singleData) => {
      if (singleData["creator"] == "ayomide.ajayi2839@gmail.com"){
        console.log("SingleData", singleData)
        var finalSingleData = 
        {
          id: singleData._id,
          title: singleData.taskName,
          start: getDate(singleData.startDate), //new Date(singleData.predictedEndDate),
          end: getDate(singleData.predictedEndDate) //new Date(singleData.startDate)
      }
      finalData.push(finalSingleData)

      }


      //console.log( singleData._id , singleData.taskName ,singleData.predictedEndDate ,singleData.startDate)
     
    })
    return finalData
  }

 


  return (
    <div>
      

    
      { allEvents && <Calendar
      localizer={localizer}
      events={allEvents}
      startAccessor="start"
      endAccessor="end"
      style={{height: '100vh', width: '80vw', padding: 30}}
      />}
    </div>
  )
}


export default Calendars;


// The component you should use instead the one you mentioned.
