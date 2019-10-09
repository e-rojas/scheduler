

export const SETDAY = "SETDAY"
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA"
export const SET_INTERVIEW = "SET_INTERVIEW"

export default function reducer(state, action) {
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