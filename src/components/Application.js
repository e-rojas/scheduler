import React, { useState, useEffect } from "react";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "helpers/selectors";

// import { getInterview } from "helpers/selectors";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";

const axios = require("axios");

export default function Application(props) {
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
    return axios
      .put(`/api/appointments/${id}`, { interview });
      
     
  }

  const [state, setState] = useState({
    day: "",
    days: [],
    appointments: {
      "1": {
        id: 1,
        time: "12pm",
        interview: null
      }
    },
    interviewers: {}
  });
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewersForDay = getInterviewersForDay(state, state.day);
  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersForDay}
        bookInterview={bookInterview}
      />
    );
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
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        {appointments.map(a => (
          <Appointment key={a.id} {...a} />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
