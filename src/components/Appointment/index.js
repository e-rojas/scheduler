import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //delete appmt
  function deleteAppointment() {
    transition(DELETING);
    Promise.resolve(props.cancelInterview(props.id))
      .then(() => transition(EMPTY)).catch((err) => { console.log(err); })
  }
 

//save appmt
  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    Promise.resolve(props.bookInterview(props.id, interview))
      .then(() => transition(SHOW))
      .catch(err => console.log(err));
   /*  props.bookInterview(props.id, interview); // wasnt showing the loading transition!!
    transition(SHOW); */
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={()=>transition(CONFIRM)}
          id={props.id}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === DELETING && (
        <Status message="Deleting" />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={deleteAppointment}
          onCancel={() => back()}
        />
      )}
    </article>
  );
}
