import { useState,useEffect } from 'react'
import { getEvents } from '../utils/backend.utils'
function Events() {
    const [events,setevents]= useState([])
    useEffect(()=>{
       getEvents().then(events=>setevents(events.data)).catch(e=>console.log(e))
    },[])
  return (
    <div className='mt-12 w-3/4 mx-auto' >
      
        {(events.length > 0 )? <ul> {events.map(event=>{
            return(
                <li key={event._id} className='shadow-xl p-4 max-w-50  text-center border-4 border-l-teal-600 rounded-lg'>{event.eventBody}</li>
            )
        })}
      </ul> : <p className=' text-center text-2xl text-teal-600 '>🤷‍♂️ No New Events 🤷‍♂️</p>}
    </div>
  )
}

export default Events
