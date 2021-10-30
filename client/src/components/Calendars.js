// the imports
import { Calendar, momentLocalizer  } from 'react-big-calendar' 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from './events.js';
import moment from 'moment'

function Calendars(){
  const localizer = momentLocalizer(moment)
  return (
    <div>
      <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{height: '100vh', width: '80vw', padding: 30}}
      />
    </div>
  )
}


export default Calendars;


// The component you should use instead the one you mentioned.
