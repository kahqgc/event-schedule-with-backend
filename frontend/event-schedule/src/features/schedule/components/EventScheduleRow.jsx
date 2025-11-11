import EventScheduleCell from "./EventScheduleCell";

//renders a row for a single time slot with one cell per stage
export default function ScheduleRow({ timeSlot, stages, onSelectEvent }) {

  /*Helper function - for this timeslot, get this event for a stage*/
  function getEventForStage(stage) {
    return timeSlot.events.find((event) => event.stage === stage); /*find the event that matches the current stage name in this time slot similar to react weather data example*/
  }

  return (
    <tr key={timeSlot.time}>
      <th>{timeSlot.time}</th>
      {stages.map((stage) => ( /*map through each stage in stages array to render a cell per stage*/
        <td key={stage}>
          <EventScheduleCell
            stage={stage} /*pass current stage as a prop*/
            getEventForStage={getEventForStage} /*function to get the matching event for this stage*/
            onSelectEvent={onSelectEvent}
          />
        </td>
      ))}
    </tr>
  );
}
