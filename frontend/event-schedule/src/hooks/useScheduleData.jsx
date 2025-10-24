import { useState, useEffect } from "react";

export default function useScheduleData(){
    const [masterSchedule, setMasterSchedule] = useState([]);
    
      useEffect(() => {
        //CRUD - get/read events from backend
        const fetchEvents = async () => {
          try {
            const response = await fetch("http://localhost:8080/api/events");
            if (!response.ok) throw new Error("Failed to fetch events");
            const data = await response.json();
    
            const groupedByTime = {};
    
            data.forEach(event => {
              const time = event.dateTime;
              const date = new Date(time);
              const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              const session = {
                stage: event.stage,
                title: event.title,
                description: event.description,
                host: event.instructor,
                time: formattedTime,
              };

              if (!groupedByTime[formattedTime]) {
                groupedByTime[formattedTime] = {
                  time: formattedTime,
                  sessions: [session]
                };
              } else {
                groupedByTime[formattedTime].sessions.push(session);
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

  return masterSchedule;
}