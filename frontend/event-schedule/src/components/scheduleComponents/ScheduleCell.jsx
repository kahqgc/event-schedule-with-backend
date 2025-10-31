export default function ScheduleCell({ selectEvent, getEvent, stage }) {
  const event =
    getEvent(
      stage
    ); /*find the session that corresponds with particular stage and timeslot */
  return (
    <button
      onClick={() => {
        selectEvent(
          event
        ); /*update parent with selected session */
      }}
    >
      {event ? event.title : ""}
    </button>
  );
}
