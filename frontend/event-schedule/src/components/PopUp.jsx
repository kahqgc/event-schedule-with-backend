import React, { useState} from "react";
import "./PopUp.css";
import AddANote from "./addANoteComponents/AddANote";
import SignUpButton from "../buttons/SignUpButton";
import SignUpForm from "./SignUpForm";
import ControlButton from "../buttons/ControlButton";

export default function PopUp({
  scheduledEvent,
  onClose,
  formData,
  setFormData,
  handleSignUp
}) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [error, setError] = useState("");

  // const eventId =
  //   scheduledEvent.title.toLowerCase(); /*Added to make each saved note unique calling the ID the title of the event*/

  return (
    <>
      {/*only show popUp when sideMenu is not visible*/}
      <div className={"pop-up-box"}>
        <ControlButton onClick={onClose}>×</ControlButton>
        {/*switch between event info and sign up form*/}
        {!showSignUp ? (
          <>
            <h1>{scheduledEvent.title}</h1>
            <p>{scheduledEvent.description}</p>
            <ul>
              <li>{scheduledEvent.host}</li>
              <li>{scheduledEvent.time}</li>
            </ul>
            {/* <AddANote eventId={eventId} /> */}
            <SignUpButton handleSignUp={() => setShowSignUp(true)} />
          </>
        ) : (
          <SignUpForm
            scheduledEvent={scheduledEvent}
            formData={formData}
            setFormData={setFormData}
            error={error}
            setError={setError}
            onBack={() => setShowSignUp(false)}
            onClose={onClose}
            handleSignUp={handleSignUp}
            onSuccess={onClose}
          />
        )}
      </div>
    </>
  );
}
