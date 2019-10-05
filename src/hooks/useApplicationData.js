import  {  useEffect ,useReducer} from 'react'
import axios from "axios";
const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
     return  { ...state, days:action.days, appointments:action.appointments, interviewers:action.interviewers };
      case SET_INTERVIEW: {
          console.log('test', state.days);
          const dayOfAppmt = state.days.find(d => d.appointments.includes(action.id));
         
          const countSpotsOfDay = (day) => {
              let numberOfSpots = 0;
              day.appointments.forEach(appt => {
                  if (!action.appointments[appt].interview) {
                      numberOfSpots += 1;
                  }
              })
              return numberOfSpots
          }
          const day = { ...dayOfAppmt, spots: countSpotsOfDay(dayOfAppmt) };
          const index = state.days.indexOf(dayOfAppmt);
          console.log(index);
          const days = [...state.days];
          days[index] = day;

          return{...state, appointments:action.appointments,days}
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData() { 
  //changing the state
    const [state, dispatch] = useReducer(reducer,{
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
    })
 
//find where the data is being stored for the spots left
//to change that data state when adding a new appnt or deleting in the event.
    const setDay = day => dispatch({ type:SET_DAY, day });

useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`/api/days`)),
      Promise.resolve(axios.get(`/api/appointments`)),
      Promise.resolve(axios.get(`/api/interviewers`))
    ])
      .then(all => {
       
          
          dispatch({
              type: SET_APPLICATION_DATA,
              days: all[0].data,
              appointments: all[1].data,
              interviewers: all[2].data
          });
       
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
    dispatch({
        type: SET_INTERVIEW,
        appointments,
        id

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
     dispatch({
        type: SET_INTERVIEW,
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
        
        dispatch({
            type: SET_APPLICATION_DATA,
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data
        });
       
      })

      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }, []);
  return { state, setDay, bookInterview, cancelInterview }
};

