import  { useState, useEffect } from 'react'
import axios from "axios";

export default function useApplicationData() { 
  //changing the state
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
    });

    const setDay = day => setState({ ...state, day });

useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`/api/days`)),
      Promise.resolve(axios.get(`/api/appointments`)),
      Promise.resolve(axios.get(`/api/interviewers`))
    ])
      .then(all => {
        //console.log(all[0].data); // first
        // console.log(all[1].data); // second
        // console.log(all[2].data); // third
        setState(prev => ({
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
        // const [first, second, third] = all;

        //console.log(first, second, third);
      })

      .catch(function(error) {
        // handle error
        console.log(error);
      });
}, []);
    
    //booking interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });
    console.log(id, interview);
    return axios.put(`/api/appointments/${id}`, { interview });
    };
    
    //cancel interview
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

     const appointments = {
      ...state.appointments,
      [id]: appointment
     }
     setState({
      ...state,
      appointments
    });
    
     return axios.delete(`/api/appointments/${id}`)
     
  }
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`/api/days`)),
      Promise.resolve(axios.get(`/api/appointments`)),
      Promise.resolve(axios.get(`/api/interviewers`))
    ])
      .then(all => {
        //console.log(all[0].data); // first
        // console.log(all[1].data); // second
        // console.log(all[2].data); // third
        setState(prev => ({
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
        // const [first, second, third] = all;

        //console.log(first, second, third);
      })

      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }, []);
  return { state, setDay, bookInterview, cancelInterview }
};

