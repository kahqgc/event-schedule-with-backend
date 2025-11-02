import EventScheduleRow from "./EventScheduleRow";

//renders the event schedule table
//scheduleData: array of time slots with session objects
// stages: an array of stage names (table columns)
// onSelectEvent: callback when session is clicked

export default function EventScheduleTable({ scheduleData = [], stages = [], onSelectEvent }) {
    return(
    <table className="schedule-table">
              <thead>
                <tr>
                  <th>Time</th>
                  {/*render column for each stage*/}
                  {stages.map((stage) => (
                    <th key={stage}>
                      {stage}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/*render a time slot for each row*/}
                {scheduleData.map((slot) => {
                  /*map through each time slot object in masterSchedule array to render a row*/
                  return (
                    <EventScheduleRow
                      key={slot.time} //unique ID based on time which is how the rows will lay on the page
                      slot={slot} /*passing the full slot object  */
                      stages={stages} /*pass new stages array for column rendering*/
                      onSelectEvent={onSelectEvent} //send handler to child
                    />
                  );
                })}
              </tbody>
            </table>
    )
}