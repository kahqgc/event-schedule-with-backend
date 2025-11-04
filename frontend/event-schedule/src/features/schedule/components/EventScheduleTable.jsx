import EventScheduleRow from "./EventScheduleRow";

// RENDERS THE EVENT SCHEDULE TABLE //
//scheduleData: array of time slots with session objects [{time: string , sessions: [{stage, title, descrip, host, time}] }]
// stages: string [] an array of stage names (table columns)

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
                  /*map through each time slot object in scheduleData array to render a row*/
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