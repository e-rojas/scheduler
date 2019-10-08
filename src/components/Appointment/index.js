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
  const EDIT = "EDIT";
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE'
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  //delete appmt
  function deleteAppointment() {
    transition(DELETING);
    Promise.resolve(props.cancelInterview(props.id))
      .then(() => transition(EMPTY)).catch((err) => { console.log(err); })
      .catch(err => transition(ERROR_DELETE, true))
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
      .catch(error => transition(ERROR_SAVE, true));
   
   /*  props.bookInterview(props.id, interview); // wasnt showing the loading transition!!
    transition(SHOW); */
  }
 

  return (
    <article className="appointment"  data-testid="appointment" >
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={()=>transition(CONFIRM)}
          id={props.id}
          onEdit={() => transition(EDIT)}
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
      {mode === EDIT && (
         <Form 
           name={props.interview.student}
           interviewer={props.interview.interviewer.id}
           interviewers={props.interviewers}
           onCancel = {() => back()}
           onSave = {save}
         />
       )}
      
    </article>
  );
}
