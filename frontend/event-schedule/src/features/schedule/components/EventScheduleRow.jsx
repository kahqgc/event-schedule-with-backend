import EventScheduleCell from "./EventScheduleCell";

//renders a row for a single time slot with one cell for each stage
export default function ScheduleRow({ slot, stages, onSelectEvent }) {

  /*Helper function to find specific session that matches the given stage within the current time slot*/
  function getEvent(stage) {
    return slot.sessions.find((session) => session.stage === stage); /*find the session that matches the current stage name in this time slot similar to react weather data example*/
  }

  return (
    <tr key={slot.time}>
      <th>{slot.time}</th>
      {stages.map((stage) => ( /*map through each stage in stages array to render a cell per stage*/
        <td key={stage}>
          <EventScheduleCell
            stage={stage} /*pass current stage as a prop*/
            getEvent={getEvent} /*function to get the matching session for this stage*/
            onSelectEvent={onSelectEvent} /*handler to selecte this session*/
          />
        </td>
      ))}
    </tr>
  );
}
