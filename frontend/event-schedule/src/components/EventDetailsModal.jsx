import React, { useState } from "react";
import "./EventDetailsModal.css";
import AddANote from "./addANoteComponents/AddANote";
import SignUpForm from "./SignUpForm";
import ControlButton from "../buttons/ControlButton";
import SubmitButton from "../buttons/SubmitButton";

export default function EventDetailsModal({
  activeEvent,
  onClose,
  signUpFormData,
  setSignUpFormData,
  submitSignUpForm,
  error,
  setError,
}) {
  const [showSignUp, setShowSignUp] = useState(false);

  // const eventId =
  //   scheduledEvent.title.toLowerCase(); /*Added to make each saved note unique calling the ID the title of the event*/

  return (
    <>
      {/*only show popUp when sideMenu is not visible*/}
      <div className={"event-details-modal"}>
        <ControlButton onClick={onClose}>×</ControlButton>
        {/*switch between event info and sign up form*/}
        {!showSignUp ? (
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
                setShowSignUp(true)
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
            onBack={() => setShowSignUp(false)}
            onClose={onClose}
            submitSignUpForm={submitSignUpForm}
            onSuccess={() => setShowSignUp(false)}
          
          />
        )}
      </div>
    </>
  );
}
