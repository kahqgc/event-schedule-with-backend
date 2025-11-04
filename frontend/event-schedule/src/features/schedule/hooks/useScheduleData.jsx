import { useState, useEffect } from "react";
import { groupEventsByTime, sortedSlotsByTime } from "../utils/scheduleUtils";

//custom hook that fetches and updates state
//fetches events from backend, groups by time, sorts time slots in chronological order, and returns an array of timeslots
//[{time: "9:00AM", sessions : [{stage, title, descrip, host, time}] }]
export default function useScheduleData() {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
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
        const sorted = sortedSlotsByTime(grouped);

        //converts the grouped object into an array to map over in scheduleTable.jsx
        setScheduleData(sorted);

      } catch (error) {
        console.error("Error fetching events:", error);
        setScheduleData([]); // clear data
      }
    };

    fetchEvents();
  }, []);

  return scheduleData;
}
