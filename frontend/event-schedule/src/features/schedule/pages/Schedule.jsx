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
import EventSideMenu from "../../signups/components/EventSideMenu";
import useSignUps from "../../signups/hooks/useSignUps";
import useScheduleData from "../hooks/useScheduleData";
import useScheduleFlow from "../hooks/useScheduleFlow";
import useDeleteHandlers from "../../signups/hooks/useDeleteHandlers";
import useScheduleUI from "../hooks/useScheduleUI";

export default function Schedule() {
  /*user feature hooks */
  const { signUps, createSignUp, updateSignUp, deleteSignUp } = useSignUps();

  // custom schedule hooks
  const ui = useScheduleUI();
  const flow = useScheduleFlow({ createSignUp, updateSignUp, ui });

  /*delete button handlers*/
  const { showConfirm, handleDeleteClick, confirmDelete, cancelDelete } =
    useDeleteHandlers(deleteSignUp);

  //fetch structured schedule data (by time and stage)
  const scheduleData = useScheduleData();

  //dynamically build an array of stage names from scheduleData.jsx
  const stages = scheduleData.reduce((acc, slot) => {
    slot.events.forEach((event) => {
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
          onSelectEvent={flow.handleSelectEvent}
        />
        {/*EVENT DETAILS / SIGN UP FORM*/}
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
            editSignUp={flow.editSignUp}
            signUps={signUps}
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
