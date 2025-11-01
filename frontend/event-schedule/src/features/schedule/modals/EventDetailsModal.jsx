// import React, { useEffect } from "react";
import "../styles/EventDetailsModal.css";
import AddANote from "../../notes/AddANote";
import SignUpForm from "../../users/components/SignUpForm";
import ControlButton from "../../../buttons/ControlButton";
import SubmitButton from "../../../buttons/SubmitButton";

export default function EventDetailsModal({
  activeEvent,
  onClose,
  signUpFormData,
  setSignUpFormData,
  submitSignUpForm,
  showSignUpForm,
  setShowSignUpForm,
  error,
  setError,
}) {

  // const eventId =
  //   scheduledEvent.title.toLowerCase(); /*Added to make each saved note unique calling the ID the title of the event*/

  return (
    <>
      {/*only show popUp when sideMenu is not visible*/}
      <div className={"event-details-modal"}>
        <ControlButton onClick={onClose}>×</ControlButton>
        {/*switch between event info and sign up form*/}
        {!showSignUpForm ? (
          <>
            <h1>{activeEvent.title}</h1>
            <p>{activeEvent.description}</p>
            <ul>
              <li>{activeEvent.host}</li>
              <li>{activeEvent.time}</li>
            </ul>
            {/* <AddANote eventId={eventId} /> */}
            <SubmitButton
              label="Sign Up"
              type="button"
              onClick={() => {
                setError("");
                setShowSignUpForm(true)
              }}
            />
          </>
        ) : (
          <SignUpForm
            activeEvent={activeEvent}
            signUpFormData={signUpFormData}
            setSignUpFormData={setSignUpFormData}
            error={error}
            setError={setError}
            onBack={() => setShowSignUpForm(false)}
            onClose={onClose}
            submitSignUpForm={submitSignUpForm}
            onSuccess={() => setShowSignUpForm(false)}
          
          />
        )}
      </div>
    </>
  );
}
