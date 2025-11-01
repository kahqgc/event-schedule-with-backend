// import { masterSchedule } from "../data/scheduleData";
import { useState } from "react";
import "./Schedule.css";
import EventDetailsModal from "../modals/EventDetailsModal";
import EventScheduleTable from "../components/EventScheduleTable";
import EventSideMenu from "../../users/modals/EventSideMenu";
import useUsers from "../../users/hooks/useUsers";
import useScheduleData from "../hooks/useScheduleData";

export default function Schedule() {
  const [activeEvent, setActiveEvent] =
    useState(null); /*indicates no scheduled event selected */
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [signUpFormData, setSignUpFormData] = useState(null);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [error, setError] = useState("");

  const { signedUpUsers, createUser, updateUser, deleteUser } = useUsers();
  //hook to fetch and structure schedule data
  const scheduleData = useScheduleData();

  //dynamically build an array of stage names from scheduleData.jsx
  const stages = scheduleData.reduce((acc, slot) => {
    slot.sessions.forEach((session) => {
      if (!acc.includes(session.stage)) {
        acc.push(session.stage);
      }
    });
    return acc;
  }, []);

  //open popUp for EDITING user
  const editUser = (user) => {
    setActiveEvent({ title: user.sessionTitle });
    setSignUpFormData({ ...user });
    setShowSignUpForm(true);
    setIsSideMenuOpen(true);
  };

  const submitSignUpForm = async (data) => {
    try {
      if (data.id) {
        await updateUser(data); //PUT handled by useUsers
      } else {
        await createUser(data); //POST handled by useUsers
      }
      setSignUpFormData({
        name: "",
        email: "",
        phone: "",
        tickets: 1,
        sessionTitle: activeEvent.title,
      });
      setActiveEvent(null);
      setShowSignUpForm(false);
      setIsSideMenuOpen(true);
    } catch (err) {
      setError(
        err.message || "Error submitting registration. Please try again."
      );
    }
  };

  const handleSelectEvent = (event) => {
    setActiveEvent(event);
    setSignUpFormData({
      id: null,
      name: "",
      email: "",
      phone: "",
      tickets: 1,
      sessionTitle: event.title,
    });
    setShowSignUpForm(true);
  };

  return (
    <>
      <h2 className="schedule-heading">Event Times</h2>
      {error && <p className="error-message">{error}</p>}
      <section className="schedule-container">
        <EventScheduleTable
          scheduleData={scheduleData}
          stages={stages}
          //resets signUpFormData when new event is selected
          selectEvent={handleSelectEvent}
        />
        {activeEvent /*render pop up only if event is selected*/ && (
          <EventDetailsModal
            activeEvent={
              activeEvent
            } /*pass selected event to event details modal*/
            onClose={() => {
              setActiveEvent(null);
              setShowSignUpForm(false);
            }}
            signUpFormData={signUpFormData}
            setSignUpFormData={setSignUpFormData}
            submitSignUpForm={submitSignUpForm}
            error={error}
            setError={setError}
            showSignUpForm={showSignUpForm}
            setShowSignUpForm={setShowSignUpForm}
          />
        )}
        {isSideMenuOpen && (
          <EventSideMenu
            onClose={() => setIsSideMenuOpen(false)}
            signedUpUsers={signedUpUsers}
            onDeleteUser={deleteUser}
            onEditUser={editUser}
            setError={setError}
          />
        )}
      </section>
    </>
  );
}

/*https://www.youtube.com/watch?v=Gy4G68WoHq4&t=781s how I learned to create a pop up box using useState */
