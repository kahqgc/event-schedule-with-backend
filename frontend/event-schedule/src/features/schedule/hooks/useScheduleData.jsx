import { useState, useEffect } from "react";
import { groupEventsByTime, sortedSlotsByTime } from "../utils/scheduleUtils";

//custom hook that fetches and updates state
//fetches events from backend, groups by time, sorts time slots in chronological order, and returns an array of timeslots
//each slot is grouped by their start time: [{time: "9:00AM", sessions : [{stage, title, descrip, host, time}] }]
export default function useScheduleData() {
  const [scheduleData, setScheduleData] = useState([]);

  //fetch events on mount
  useEffect(() => {
    async function fetchEvents() {
      try {
        //ask backend for list of events
        const response = await fetch("http://localhost:8080/api/events");

        //if server respons with an error, stop here and throw error message
        if (!response.ok)
          throw new Error(
            `Could not load events by server: ${response.status}`
          );

        //turns the raw JSON response into a JS array
        const data = await response.json();

        //format backend date into cleaner frontend event object
        const formattedEvents = data.map((event) => ({
          id: event.id,
          title: event.title,
          description: event.description,
          host: event.host,
          dateTime: event.dateTime,
          stage: event.stage,
        }));

        //group events that start at the same time together
        const grouped = groupEventsByTime(formattedEvents);

        //turn the grouped object into an array and sort it by time. localeCompare() is a string comparison function that compares the time strings directly
        const sorted = sortedSlotsByTime(grouped);
        setScheduleData(sorted);
      } catch (err) {
        console.error("Error fetching events:", err);
        setScheduleData([]);
      }
    }

    fetchEvents();
  }, []);

  return scheduleData;
}
