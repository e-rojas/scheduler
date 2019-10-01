import React, { useState } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
// data
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "4pm"
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Jon Macklain",
      interviewer: { 
        id: 3, 
        name: "Robert Bundabi", 
        avatar: "https://i.imgur.com/T2WwVfS.png" }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Tony",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
];
export default function Application(props) {
  const [day, setDay] = useState("Monday");


  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 3
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0
    }
  ];

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
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map(a => <Appointment key={a.id} {...a} />)}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
