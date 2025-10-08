import React, { useState } from "react";
import "./PopUp.css";
import AddANote from "./AddANote";
import SignUpButton from "../buttons/SignUpButton";
import SignUpForm from "./SignUpForm";
import SideMenu from "./SideMenu";

export default function PopUp({
  scheduledEvent,
  onClose,
  signedUpSessions,
  setSignedUpSessions,
}) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [editSessionIndex, setEditSessionIndex] = useState(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tickets: 1,
  });

  // const eventId =
  //   scheduledEvent.title.toLowerCase(); /*Added to make each saved note unique calling the ID the title of the event*/

  const handleSignUp = (signUpData) => {
    const fullSignUp = {
      ...signUpData,
      title: scheduledEvent.title
    }

    if (editSessionIndex !== null) {
        const updated = [...signedUpSessions];
      updated[editSessionIndex] = fullSignUp;
      setSignedUpSessions(updated);
      setEditSessionIndex(null);

    } else {
      const isAdded = signedUpSessions.some((sess) => sess.title === scheduledEvent.title);
      if (isAdded) {
        setError("You've already added this event!");
        return;
      }
      setSignedUpSessions((prev) => [...prev, fullSignUp]);
    } 

    setShowSignUp(false);
    setFormData({ name: "", email: "", phone: "", tickets: 1 });
    setError("");
  };

  const handleEditSessionIndex = (index) => {
    const sessionToEdit = signedUpSessions[index];
    setFormData({
      name: sessionToEdit.name,
      email: sessionToEdit.email,
      phone: sessionToEdit.phone,
      tickets: sessionToEdit.tickets || 1,
    })
    setEditSessionIndex(index);
    setShowSignUp(true);
    setError("")
  }

  return (
    <>
      {/*only show popUp when sideMenu is not visible*/}
      <div className={"pop-up-box"}>
        <button className="X" onClick={onClose}>
          X
        </button>
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
            handleSignUp={handleSignUp}
            formData={formData}
            setFormData={setFormData}
            error={error}
            setError={setError}
            onBack={() => setShowSignUp(false)}
            onClose={onClose}
          />
        )}
      </div>
      <SideMenu
        signedUpSessions={signedUpSessions}
        setSignedUpSessions={setSignedUpSessions}
        handleEditSessionIndex={handleEditSessionIndex}
        formData={formData}
        onClose={onClose}
      />
    </>
  );
}
