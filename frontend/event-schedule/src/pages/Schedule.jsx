// import { masterSchedule } from "../data/scheduleData";
import { useState } from "react";
import "./Schedule.css";
import PopUp from "../components/PopUp";
import useScheduleData from "../hooks/useScheduleData";
import ScheduleTable from "../components/scheduleComponents/ScheduleTable";
import useUsers from "../hooks/useUsers";
import SideMenu from "../components/SideMenu";

export default function Schedule() {
  const [scheduledEvent, setScheduledEvent] = useState(null); /*indicates no scheduled event selected */
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const { users, createUser, updateUser, deleteUser } = useUsers();
  //hook to fetch and structure schedule data
  const masterSchedule = useScheduleData();

  //dynamically build an array of stage names from scheduleData.jsx
  const stages = (masterSchedule || []).reduce((acc, slot) => {
    slot.sessions.forEach((session) => {
      if (!acc.includes(session.stage)) {
        acc.push(session.stage);
      }
    });
    return acc;
  }, []);

  //open popUp for EDITING user
  const startEditUser = (user) => {
    setScheduledEvent({ title: user.sessionTitle });
    setFormData({ ...user });
    setSideMenuOpen(true);
  };

  const submitForm = async (data) => {
    try {
      if (data.id) {
        await updateUser(data); //PUT handled by useUsers
        alert("user updated successfully");
      } else {
        await createUser(data); //POST handled by useUsers
      }
        setFormData({
        name: "",
        email: "",
        phone: "",
        tickets: 1,
        sessionTitle: scheduledEvent.title,
      });
      setSideMenuOpen(true);
    } catch (err){
      console.error(err);
    }
  };

  return (
    <>
      <h2 className="schedule-heading">Event Times</h2>
      <section className="schedule-container">
        <ScheduleTable
          masterSchedule={masterSchedule}
          stages={stages}
          setScheduledEvent={(event) => {
            setScheduledEvent(event);
            setFormData({
              id: null,
              name: "",
              email: "",
              phone: "",
              tickets: 1,
              sessionTitle: event.title,
            });
          }}
        />
        {scheduledEvent /*render pop up only if event is selected*/ && (
          <PopUp
            scheduledEvent={scheduledEvent} /*pass selected event ot pop up modal*/
            onClose={() => setScheduledEvent(null)}
            formData={formData}
            setFormData={setFormData}
            submitForm={submitForm}
            handleSignUp={submitForm}
          />
        )}
        {sideMenuOpen && (
          <SideMenu
            onClose={() => setSideMenuOpen(false)}
            users={users}
            onDeleteUser={deleteUser}
            onEditUser={startEditUser}
          />
        )}
      </section>
    </>
  );
}

/*https://www.youtube.com/watch?v=Gy4G68WoHq4&t=781s how I learned to create a pop up box using useState */
