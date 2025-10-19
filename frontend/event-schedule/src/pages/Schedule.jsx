import ScheduleRow from "../components/scheduleComponents/ScheduleRow";
import PopUp from "../components/PopUp";
// import { masterSchedule } from "../data/scheduleData";
import { useState } from "react";
import "./Schedule.css";
import useScheduleData from "../hooks/useScheduleData";
import ScheduleTable from "../components/scheduleComponents/ScheduleTable";

export default function Schedule() {
  const [scheduledEvent, setScheduledEvent] = useState(null); /*indicates no scheduled event selected */
  const [signedUpSessions, setSignedUpSessions] = useState([]);

  //hook to fetch and structure schedule data
  const masterSchedule = useScheduleData();

  //dynamically build an array of stage names from scheduleData.jsx
  const stages = (masterSchedule || []).reduce((acc, slot) => {
    slot.sessions.forEach((session) => {
      if (!acc.includes(session.stage)) {
        acc.push(session.stage);
      }
    });
    return acc;
  }, []);

  return (
    <>
      <h2 className="schedule-heading">Event Times</h2>
      <section className="schedule-container">
        <ScheduleTable
          masterSchedule={masterSchedule}
          stages={stages}
          setScheduledEvent={setScheduledEvent}
        />
        {scheduledEvent /*render pop up only if event is selected*/ && (
          <PopUp
            scheduledEvent={
              scheduledEvent
            } /*pass selected event ot pop up modal*/
            onClose={() => setScheduledEvent(null)}
            signedUpSessions={signedUpSessions}
            setSignedUpSessions={setSignedUpSessions}
          />
        )}
      </section>
    </>
  );
}

/*https://www.youtube.com/watch?v=Gy4G68WoHq4&t=781s how I learned to create a pop up box using useState */
