//FEATURES:
//1. fetch schedule data and builds columns from it
//2. wires stante/handlers from useScheduleFlow
//3. renders EventScheduleTable, EventDetailsModal, EventSideMenu 

// FLOW
// 1. user clicks an event (handleSelectEvent(event)) and opens EventDetailsModal
// 2. user clicks sign up and form appears
// 3. side menu shows all signed up users with edit and delete buttons

// import { masterSchedule } from "../data/scheduleData";
import "../styles/Schedule.css";
import EventDetailsModal from "../modals/EventDetailsModal";
import EventScheduleTable from "../components/EventScheduleTable";
import EventSideMenu from "../../users/modals/EventSideMenu";
import useUsers from "../../users/hooks/useUsers";
import useScheduleData from "../hooks/useScheduleData";
import useScheduleFlow from "../hooks/useScheduleFlow";
import useDeleteHandlers from "../../users/hooks/useDeleteHandlers";

export default function Schedule() {
  /*user feature hooks */
  const { 
    signedUpUsers, 
    createUser, 
    updateUser, 
    deleteUser } = useUsers();

  /*delete button handlers*/  
  const {
    showConfirm, 
    handleDeleteClick, 
    confirmDelete, 
    cancelDelete} = useDeleteHandlers(deleteUser)
  
  /*schedule logic and modal handlers*/
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
    closeModalOnly,
    setShowSignUpForm,
    setSignUpFormData,
    prepareForm
  } = useScheduleFlow({ createUser, updateUser});

  //fetch structured schedule data (by time and stage)
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
      <section className="schedule-container">
        {/*SCHEDULE TABLE*/}
        <EventScheduleTable
          scheduleData={scheduleData}
          stages={stages} //resets signUpFormData when new event is selected
          onSelectEvent={handleSelectEvent}
        />
        {/*EVENT DETAILS / SIGN UP FORM*/}
        {activeEvent /*render pop up only if event is selected*/ && (
          <EventDetailsModal
            activeEvent={activeEvent} /*pass selected event to event details modal*/
            onClose={closeModalOnly}
            signUpFormData={signUpFormData}
            setSignUpFormData={setSignUpFormData}
            submitSignUpForm={submitSignUpForm}
            error={error}
            setError={setError}
            showSignUpForm={showSignUpForm}
            setShowSignUpForm={setShowSignUpForm}
            prepareForm={prepareForm}
          />
        )}
        {/*SIGNED UP USERS SIDE MENU*/}
        {isSideMenuOpen && (
          <EventSideMenu
            onClose={closeAll}
            signedUpUsers={signedUpUsers}
            handleDeleteClick={handleDeleteClick}
            confirmDelete={confirmDelete}
            cancelDelete={cancelDelete}
            showConfirm={showConfirm}
            onEditUser={editUser}
            // setError={setError}
          />
        )}
      </section>
    </>
  );
}
