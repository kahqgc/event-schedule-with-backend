import ScheduleRow from "../components/ScheduleRow";
import PopUp from "../components/PopUp";
// import { masterSchedule } from "../data/scheduleData";
import { useState, useEffect } from "react";
import "./Schedule.css";

export default function Schedule() {
  const [masterSchedule, setMasterSchedule] = useState([]);
  const [scheduledEvent, setScheduledEvent] = useState(null); /*indicates no scheduled event selected */
  const [signedUpSessions, setSignedUpSessions] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();

        const groupedByTime = {};

        data.forEach(event => {
          //convert time
          // const timeLabel = new Date(event.dateTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
          const time = event.dateTime;
          const session = {
            stage: event.stage,
            title: event.title,
            description: event.description,
            host: event.instructor,
            time: time
          };

          if (!groupedByTime[time]) {
            groupedByTime[time] ={
              time: time,
              sessions: [session]
            };
          } else {
            groupedByTime[time].sessions.push(session);
          }
        });
        const scheduleArray = Object.values(groupedByTime);
        setMasterSchedule(scheduleArray);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  //dynamically build an array of stage names from scheduleData.jsx
  const stages = masterSchedule.reduce((acc, slot) => {
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
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Time</th>
              {stages.map((stage) => (
                <th key={stage}>
                  {stage}
                </th> /*render a table header for each stage*/
              ))}
            </tr>
          </thead>
          <tbody>
            {masterSchedule.map((slot) => {
              /*map through each time slot object in masterSchedule array to render a row*/
              return (
                <ScheduleRow
                  key={slot.time} //unique ID based on time which is how the rows will lay on the page
                  slot={slot} /*passing the full slot object  */
                  stages={stages} /*pass new stages array made by .reduce and .forEach*/
                  setScheduledEvent={setScheduledEvent} //send setter to update selected session in parent
                />
              );
            })}
          </tbody>
        </table>
        {scheduledEvent /*render pop up only if event is selected*/ && (
          <PopUp
            scheduledEvent={scheduledEvent} /*pass selected event ot pop up modal*/
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
