import ScheduleRow from "./ScheduleRow";

export default function ScheduleTable({ masterSchedule = [], stages = [], setScheduledEvent }) {
    return(
    <table className="schedule-table">
              <thead>
                <tr>
                  <th>Time</th>
                  {stages.map((stage) => (
                    <th key={stage}>
                      {stage}
                    </th> /*render a table header for each stage*/
                  ))}
                </tr>
              </thead>
              <tbody>
                {masterSchedule.map((slot) => {
                  /*map through each time slot object in masterSchedule array to render a row*/
                  return (
                    <ScheduleRow
                      key={slot.time} //unique ID based on time which is how the rows will lay on the page
                      slot={slot} /*passing the full slot object  */
                      stages={stages} /*pass new stages array made by .reduce and .forEach*/
                      setScheduledEvent={setScheduledEvent} //send setter to update selected session in parent
                    />
                  );
                })}
              </tbody>
            </table>
    )
}