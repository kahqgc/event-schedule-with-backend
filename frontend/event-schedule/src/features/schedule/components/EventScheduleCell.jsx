//renders a single table cell button for the given stage and timeslot

// click button and onSelectedEvent(session) opens details
export default function EventScheduleCell({ onSelectEvent, getEventForStage, stage }) {
  const event =
    getEventForStage(stage); /*find the session matching this stage */

  return (
    <button
      type="button"
      // check to see if event exists before calling handler
      /* if it does it calls the parent handlers and passes the event's data up so the modal can display the details*/
      onClick={() => { event && onSelectEvent(event);
      }}
      disabled={!event}
    >
      {event ? event.title : ""} {/*show title if event exists*/}
    </button>
  );
}
