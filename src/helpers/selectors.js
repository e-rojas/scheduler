
export function getAppointmentsForDay(state, day) {
    const result = [];
    const data = state.days.filter(d => d.name === day);
    if (!data[0]) return result;
    for (const i of data[0].appointments) {
        result.push(state.appointments[i]);
    }
    return result;
 
}
  
export function  getInterview(state, interview) {
    if (!interview) {
        return null;
    } else {
        const student = interview.student;
        const interviewer = state.interviewers[interview.interviewer];
        const interviewObj = { student, interviewer };
        return interviewObj;
  }
}
export function getInterviewersForDay(state,day) {
    
    if (state.days.length === 0) {
        return []
      }
      const data = state.days.filter(d => d.name === day)
      if  (data.length === 0) {
        return []
      }
    let result = data[0].interviewers.map(element => state.interviewers[element])
    return result
    
}