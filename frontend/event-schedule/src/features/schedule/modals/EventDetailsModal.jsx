import "../styles/EventDetailsModal.css";
import AddANote from "../../notes/AddANote";
import SignUpForm from "../../signups/components/SignUpForm";
import ControlButton from "../../../buttons/ControlButton";
import SubmitButton from "../../../buttons/SubmitButton";
import { useState } from "react";

//modal that displays details for a selected event
// allows for toggling between event info view and sign-up form view
export default function EventDetailsModal({
  activeEvent, //current selected event object
  onClose, // callback to close modal
  signUpFormData, //data for sign up form
  setSignUpFormData, 
  submitSignUpForm, //handler to submit form
  showSignUpForm, // boolean to toggle form v. info view
  setShowSignUpForm,
  prepareForm, //populate form for new sign up
  error,
  setError,
}) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  
  if (!activeEvent) return null;
  // const eventId =
  //   scheduledEvent.title.toLowerCase(); /*Added to make each saved note unique calling the ID the title of the event*/
  return (
    <>
      <div className={"event-details-modal"}>
        {/*close button*/}
        <ControlButton onClick={onClose}>×</ControlButton>
        {/*switch between event details and sign up form*/}
        {!showSignUpForm ? (
          <>
            <h1>{activeEvent.title}</h1>
            <p>{activeEvent.description}</p>
            <ul>
              <li>{activeEvent.host}</li>
              <li>{activeEvent.time}</li>
            </ul>
            {/*optional local storage notes component*/}
            {/* <AddANote eventId={eventId} /> */}
            <SubmitButton
              label="Sign Up"
              type="button"
              onClick={() => {
                setError("");
                prepareForm(activeEvent);
                setShowSignUpForm(true);
              }}
            />
          </>
        ) : (
          <SignUpForm
            activeEvent={activeEvent} //event associated with form
            signUpFormData={signUpFormData} //current form data
            setSignUpFormData={setSignUpFormData} 
            error={error}
            setError={setError}
            onBack={() => setShowSignUpForm(false)} //switch back to event info
            submitSignUpForm={submitSignUpForm} //submit handler
            onSuccess={() => {
              const message = signUpFormData.id
                ? "Registration updated successfully!"
                : "Registration created successfully!";
              setConfirmationMessage(message);
              setShowConfirmation(true);
              setTimeout(() => setShowConfirmation(false), 2000);
              setShowSignUpForm(false);
            }}
          />
          
        )}
        {showConfirmation && (<p className="success-message">{confirmationMessage}</p>)}
      </div>
    </>
  );
}
