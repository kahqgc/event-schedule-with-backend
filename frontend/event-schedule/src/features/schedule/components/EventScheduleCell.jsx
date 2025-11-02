//renders a single table cell button for the session at this stage and this time
export default function EventScheduleCell({ onSelectEvent, getEvent, stage }) {
  const event =
    getEvent(
      stage
    ); /*find the session that corresponds with particular stage and timeslot */
  return (
    <button
      onClick={() => {
        onSelectEvent(event); /*update parent with selected session */
      }}
    >
      {event ? event.title : ""} {/*show title if event exists*/}
    </button>
  );
}
