import { useEffect, useReducer } from 'react'
import axios from "axios";
import reducer, {
  SETDAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";
export default function useApplicationData() {

 /*  const SETDAY = "SETDAY"
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA"
  const SET_INTERVIEW = "SET_INTERVIEW"

  const reducer = (state, action) => {
    switch(action.type) {
      case SETDAY: {
        return { ...state, day: action.day }
      }
      case SET_APPLICATION_DATA: {
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers
        }
      }
      case SET_INTERVIEW: {
        const dayOfAppointment = state.days.find(d => d.appointments.includes(action.id))

        const countSpots = (day) => {
          let numberOfSpots = 0
          day.appointments.forEach(appt => {
            if (!action.appointments[appt].interview) {
              numberOfSpots += 1
            }
          })
          return numberOfSpots
        }

        const day = { ...dayOfAppointment, spots: countSpots(dayOfAppointment) }
        const index = state.days.indexOf(dayOfAppointment)
        
        const days = [...state.days]
        days[index] = day

        return { ...state, appointments: action.appointments, days }
      }
      default: {
        throw new Error(
          `Tried to unsupported action : ${action.type}`
        )
      }
    }
  }
 */
  //state set
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })
  
  
  const setDay = day => dispatch({ type: SETDAY, day });
  

  //Retrieve data and set State
  useEffect(() => {
    const daysPromise = axios.get("/api/days")
    const appointmentsPromise = axios.get("/api/appointments")
    const interviewersPromise = axios.get("/api/interviewers")
    Promise.all([daysPromise, appointmentsPromise, interviewersPromise])
      .then(results => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: results[0].data,
          appointments: results[1].data,
          interviewers: results[2].data
        });
      })
      .catch(err => {
        console.log(err.stack)
      })
  }, [])

  //HTTP request 
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        dispatch({ type: SET_INTERVIEW, appointments, id})
      })
  }
  
  //HTTP request to delete 
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
  
    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        dispatch({ type: SET_INTERVIEW, appointments, id})
      })
  }

  return { state, setDay, bookInterview, cancelInterview }
}