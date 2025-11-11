//FEATURES:
//1. fetch schedule data and builds columns from it
//2. wires state/handlers from useScheduleHandlers and useScheduleUI
//3. renders EventScheduleTable, EventDetailsModal, EventSideMenu

// FLOW
// 1. user clicks an event (handleSelectEvent(event)) and opens EventDetailsModal
// 2. user clicks sign up and form appears
// 3. side menu shows all sign ups with edit and delete buttons

import "../styles/Schedule.css";
import EventDetailsModal from "../modals/EventDetailsModal";
import EventScheduleTable from "../components/EventScheduleTable";
import EventSideMenu from "../../signups/components/EventSideMenu";
import useSignUps from "../../signups/hooks/useSignUps";
import useScheduleData from "../hooks/useScheduleData";
import useScheduleHandlers from "../hooks/useScheduleHandlers";
import useDeleteHandlers from "../../signups/hooks/useDeleteHandlers";
import useScheduleUI from "../hooks/useScheduleUI";

export default function Schedule() {
  /*signups feature hooks */
  const { signUps, createSignUp, updateSignUp, deleteSignUp } = useSignUps();

  // custom ui hooks - defining ui and passing into schedule handlers
  const ui = useScheduleUI();
  const handlers = useScheduleHandlers({ createSignUp, updateSignUp, ui });

  /*delete button handlers*/
  const { showConfirm, handleDeleteClick, confirmDelete, cancelDelete } =
    useDeleteHandlers(deleteSignUp);

  //fetch structured schedule data (by time and stage)
  const scheduleData = useScheduleData();

  //dynamically build an array of stage names from scheduleData.jsx
  const stages = scheduleData.reduce((acc, timeSlot) => {
    timeSlot.events.forEach((event) => {
      if (!acc.includes(event.stage)) {
        acc.push(event.stage);
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
          onSelectEvent={handlers.handleSelectEvent}
        />
        {/*SIGNED UP USERS SIDE MENU*/}
        {ui.isSideMenuOpen && (
          <EventSideMenu
            onClose={ui.closeAll}
            editSignUp={handlers.editSignUp}
            signUps={signUps} // from useSignUps
            // delete handlers
            handleDeleteClick={handleDeleteClick}
            confirmDelete={confirmDelete}
            cancelDelete={cancelDelete}
            showConfirm={showConfirm}
          />
        )}
      </section>
      {/*EVENT DETAILS / SIGN UP FORM*/}
      {ui.activeEvent /*render pop up only if event is selected*/ && (
        <EventDetailsModal
          activeEvent={ui.activeEvent}
          onClose={ui.closeModalOnly}
          showSignUpForm={ui.showSignUpForm}
          setShowSignUpForm={ui.setShowSignUpForm}
          error={ui.error}
          setError={ui.setError}
          signUpFormData={handlers.signUpFormData}
          setSignUpFormData={handlers.setSignUpFormData}
          submitSignUpForm={handlers.submitSignUpForm}
          prepareForm={handlers.prepareForm}
        />
      )}
    </>
  );
}
