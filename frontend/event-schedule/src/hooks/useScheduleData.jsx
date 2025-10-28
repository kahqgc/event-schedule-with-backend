import { useState, useEffect } from "react";

//changes localDatTime format from sql into a readable 9:00AM
function formatEventTime(dateTimeString) {
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

//
function groupEventsByTime(events) {
  return events.reduce((acc, event) => {
    const formattedTime = formatEventTime(event.dateTime);

    //create a session object
    const session = {
      stage: event.stage,
      title: event.title,
      description: event.description,
      host: event.instructor,
      time: formattedTime,
    };

    //if the time doesn't exist yet, create that slot
    if (!acc[formattedTime]) {
      acc[formattedTime] = {
        time: formattedTime,
        sessions: [session],
      };
    } else {
      //if time exists, push new session to timeslot
      acc[formattedTime].sessions.push(session);
    }

    return acc;
  }, {});
}

export default function useScheduleData() {
  const [masterSchedule, setMasterSchedule] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");

        const data = await response.json();
        const grouped = groupEventsByTime(data);

        //converts the grouped object into an array to map over in scheduleTable.jsx
        setMasterSchedule(Object.values(grouped));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return masterSchedule;
}
