import ScheduleCell from "./ScheduleCell";

export default function ScheduleRow({ slot, stages, setScheduledEvent }) {
  /*Helper function to find specific session that matches the given stage within the current time slot*/
  function getSession(stage) {
    return slot.sessions.find((session) => session.stage === stage); /*find the session that matches the current stage name in this time slot similar to react weather data example*/
  }

  return (
    <tr key={slot.time}>
      <th>{slot.time}</th>
      {stages.map((stage) => ( /*map through each stage in stages array to render a cell per stage*/
        <td key={stage}>
          <ScheduleCell
            stage={stage} /*pass current stage as a prop*/
            getSession={getSession} /*function to get the matching session for this stage*/
            setScheduledEvent={setScheduledEvent} /*setter to update selected session*/
          />
        </td>
      ))}
    </tr>
  );
}
