// import { masterSchedule } from "../data/scheduleData";
import "../styles/Schedule.css";
import EventDetailsModal from "../modals/EventDetailsModal";
import EventScheduleTable from "../components/EventScheduleTable";
import EventSideMenu from "../../users/modals/EventSideMenu";
import useUsers from "../../users/hooks/useUsers";
import useScheduleData from "../hooks/useScheduleData";
import useScheduleHandlers from "../hooks/useScheduleHandlers";
import useDeleteHandlers from "../hooks/useDeleteHandlers";

export default function Schedule() {
  const { 
    signedUpUsers, 
    createUser, 
    updateUser, 
    deleteUser } = useUsers();

  const {
    showConfirm, 
    handleDeleteClick, 
    confirmDelete, 
    cancelDelete} = useDeleteHandlers(deleteUser)
  
  const {
    activeEvent,
    signUpFormData,
    showSignUpForm,
    isSideMenuOpen,
    error,
    setError,
    handleSelectEvent,
    submitSignUpForm,
    editUser,
    closeAll,
    setShowSignUpForm,
    setSignUpFormData,
  } = useScheduleHandlers({ createUser, updateUser});
  
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
            onClose={closeAll}
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
            onClose={closeAll}
            signedUpUsers={signedUpUsers}
            handleDeleteClick={handleDeleteClick}
            confirmDelete={confirmDelete}
            cancelDelete={cancelDelete}
            showConfirm={showConfirm}
            onEditUser={editUser}
            setError={setError}
          />
        )}
      </section>
    </>
  );
}

/*https://www.youtube.com/watch?v=Gy4G68WoHq4&t=781s how I learned to create a pop up box using useState */
