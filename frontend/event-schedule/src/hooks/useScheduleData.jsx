import { useState, useEffect } from "react";

export default function useScheduleData(){
    const [masterSchedule, setMasterSchedule] = useState([]);
    
      useEffect(() => {
        const fetchEvents = async () => {
          try {
            const response = await fetch("http://localhost:8080/api/events");
            if (!response.ok) throw new Error("Failed to fetch events");
            const data = await response.json();
    
            const groupedByTime = {};
    
            data.forEach(event => {
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

  return masterSchedule;
}