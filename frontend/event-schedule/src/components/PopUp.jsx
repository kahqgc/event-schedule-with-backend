import React, { useState } from "react";
import "./PopUp.css";
import AddANote from "./addANoteComponents/AddANote";
import SignUpButton from "../buttons/SignUpButton";
import SignUpForm from "./SignUpForm";
import SideMenu from "./SideMenu";
import CloseButton from "../buttons/CloseButton";
import useUsers from "../hooks/useUsers";

export default function PopUp({
  scheduledEvent,
  onClose,
}) {
  const {users, createUser, updateUser, deleteUser} = useUsers();
  const [showSignUp, setShowSignUp] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    tickets: 1,
    sessionTitle: scheduledEvent.title,
  });

  const startEditUser = (user) => {
    setFormData({ ...user });
    setEditUser(user.id);
    setShowSignUp(true);
  };

  const submitForm = async (data) => {
    setError("");
    try {
        if (editUser){
          await updateUser(data); //PUT handled by useUsers
          alert("user updated successfully");
        } else {
          await createUser(data); //POST handled by useUsers
          alert("user added successfully");
        }
        setShowSignUp(false);
        setEditUser(null);
        setFormData({name: "", email: "", phone: "", tickets: 1, sessionTitle: scheduledEvent.title})
    } catch (err) {
      console.error("error saving user:", err);
      setError("error saving user");
    }
  };

  // const eventId =
  //   scheduledEvent.title.toLowerCase(); /*Added to make each saved note unique calling the ID the title of the event*/

  return (
    <>
      {/*only show popUp when sideMenu is not visible*/}
      <div className={"pop-up-box"}>
        <CloseButton onClick={onClose} />
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
            handleSignUp={submitForm}
          />
        )}
      </div>
      <SideMenu
        onClose={onClose}
        users={users}
        onEditUser={startEditUser}
        onDeleteUser={deleteUser}
      />
    </>
  );
}
