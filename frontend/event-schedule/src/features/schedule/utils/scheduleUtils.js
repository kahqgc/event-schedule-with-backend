//changes SQL localDateTime format into a readable 9:00AM
export function formatEventTime(dateTimeString) {
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
}

// grouping events by time into slots
// backend data:   [{ dateTime, stage, title, description, instructor }]
// transformed by front end: [{ time: "9:00 AM", events: [{ stage, title, description, host, time }] }]
export function groupEventsByTime(events) {

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
  );
  
  const grouped = sortedEvents.reduce((acc, event) => {
    const formattedTime = formatEventTime(event.dateTime);

    //create a event object
    const eventObj = {
      id: event.id,
      stage: event.stage,
      title: event.title,
      description: event.description,
      host: event.host,
      time: formattedTime,
    };

    //if the time doesn't exist yet, create that slot
    if (!acc[formattedTime]) {
      acc[formattedTime] = {
        time: formattedTime,
        events: [eventObj],
      };
    } else {
      //if time exists, push new event to timeslot
      acc[formattedTime].events.push(eventObj);
    }

    return acc;
  }, {});

 return Object.values(grouped);
}
