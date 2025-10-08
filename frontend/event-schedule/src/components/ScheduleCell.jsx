export default function ScheduleCell({ setScheduledEvent, getSession, stage }) {
  const session =
    getSession(
      stage
    ); /*find the session that corresponds with particular stage and timeslot */
  return (
    <button
      onClick={() => {
        setScheduledEvent(
          session
        ); /*update parent with selected session */
      }}
    >
      {session ? session.title : ""}
    </button>
  );
}
