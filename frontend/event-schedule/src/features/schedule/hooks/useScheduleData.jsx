import { useState, useEffect } from "react";
////// still needs commenting //////

//changes SQL localDateTime format into a readable 9:00AM
function formatEventTime(dateTimeString) {
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// grouping events by time into slots
function groupEventsByTime(events) {
  return events.reduce((acc, event) => {
    const formattedTime = formatEventTime(event.dateTime);

    //create a session object
    const eventObj = {
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
        sessions: [eventObj],
      };
    } else {
      //if time exists, push new session to timeslot
      acc[formattedTime].sessions.push(eventObj);
    }

    return acc;
  }, {});
}

//fetches events from backend, groups by time, and retrns an array of timeslots
//[{time: "9:00AM", sessions : [{stage, title, descrip, host, time}] }]
export default function useScheduleData() {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        //ask backend for list of events
        const response = await fetch("http://localhost:8080/api/events");

        //if server respons with an error, stop here and throw error message
        if (!response.ok) throw new Error(`Could not load events by server: ${response.status}`);

        //turns the raw JSON response into a JS array
        const data = await response.json();

        //group events that start at the same time together
        const grouped = groupEventsByTime(data);

        //turn the grouped object into an array and sort it by time. localeCompare() is a string comparison function that compares the time strings directly
        const sortedSlots = Object.values(grouped).sort((a,b)=> a.time.localeCompare(b.time))

        //converts the grouped object into an array to map over in scheduleTable.jsx
        setScheduleData(sortedSlots);

      } catch (error) {
        console.error("Error fetching events:", error);
        setScheduleData([]); // clear data
      }
    };

    fetchEvents();
  }, []);

  return scheduleData;
}
