// the imports
import { Calendar, dateFnsLocalizer} from 'react-big-calendar' 
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { useState } from "react";
import DatePicker from "react-datepicker";
// import Task from "./components/Task";
// import events from './events.js';
// import moment from 'moment'

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

const events = [
  {
    title: "Big Meeting",
    allDay: true, 
    start: new Date(2021, 6, 0),
    end: new Date(2021, 6, 0)
  },
  {
    title: "Vacation",
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10)
  },
]

function Calendars(){
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end:""
  })

  const [allEvents, setAllEvents] = useState(events)

  function handleAddEvent(){
    setAllEvents([...allEvents, newEvent])
  }

  // const localizer = momentLocalizer(moment)

  return (
    <div>

    
      <Calendar
      localizer={localizer}
      events={allEvents}
      startAccessor="start"
      endAccessor="end"
      style={{height: '100vh', width: '80vw', padding: 30}}
      />
    </div>
  )
}


export default Calendars;


// The component you should use instead the one you mentioned.
