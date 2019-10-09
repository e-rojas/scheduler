import { useEffect, useReducer } from 'react'
import axios from "axios";
import reducer, {
  SETDAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";
export default function useApplicationData() {


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