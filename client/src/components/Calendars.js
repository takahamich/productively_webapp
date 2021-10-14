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
      style={{ height: 1000, width: 1400, padding:20}}
      />
    </div>
  )
}


export default Calendars;


// The component you should use instead the one you mentioned.
