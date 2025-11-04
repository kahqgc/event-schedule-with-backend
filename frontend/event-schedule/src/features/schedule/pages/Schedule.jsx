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
import useScheduleUI from "../hooks/useScheduleUI";

export default function Schedule() {
  /*user feature hooks */
  const { signedUpUsers, createUser, updateUser, deleteUser } = useUsers();

  // custom schedule hooks
  const ui = useScheduleUI();
  const flow = useScheduleFlow({ createUser, updateUser, ui });

  /*delete button handlers*/
  const { showConfirm, handleDeleteClick, confirmDelete, cancelDelete } =
    useDeleteHandlers(deleteUser);

  /*schedule logic and modal handlers*/
  // const {
  //   activeEvent,
  //   signUpFormData,
  //   showSignUpForm,
  //   isSideMenuOpen,
  //   error,
  //   setError,
  //   handleSelectEvent,
  //   submitSignUpForm,
  //   editUser,
  //   closeAll,
  //   closeModalOnly,
  //   setShowSignUpForm,
  //   setSignUpFormData,
  //   prepareForm
  // } = useScheduleFlow({ createUser, updateUser});

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
          onSelectEvent={flow.handleSelectEvent}
        />
        {/*EVENT DETAILS / SIGN UP FORM*/}
        {console.log("Schedule render: ", flow.signUpFormData)}
        {ui.activeEvent /*render pop up only if event is selected*/ && (
          <EventDetailsModal
            activeEvent={ui.activeEvent}
            onClose={ui.closeModalOnly}
            showSignUpForm={ui.showSignUpForm}
            setShowSignUpForm={ui.setShowSignUpForm}
            error={ui.error}
            setError={ui.setError}
            signUpFormData={flow.signUpFormData}
            setSignUpFormData={flow.setSignUpFormData}
            submitSignUpForm={flow.submitSignUpForm}
            prepareForm={flow.prepareForm}
          />
        )}
        {/*SIGNED UP USERS SIDE MENU*/}
        {ui.isSideMenuOpen && (
          <EventSideMenu
            onClose={ui.closeAll}
            onEditUser={flow.editUser}
            signedUpUsers={signedUpUsers}
            handleDeleteClick={handleDeleteClick}
            confirmDelete={confirmDelete}
            cancelDelete={cancelDelete}
            showConfirm={showConfirm}
          />
        )}
      </section>
    </>
  );
}
