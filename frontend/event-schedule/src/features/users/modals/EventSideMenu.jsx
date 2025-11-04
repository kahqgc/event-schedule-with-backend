import { useState } from "react";
import "../styles/EventSideMenu.css";
import DeleteButton from "../../../buttons/DeleteButton";
import EditButton from "../../../buttons/EditButton";
import ControlButton from "../../../buttons/ControlButton";
import ConfirmModal from "./ConfirmModal";

// display slide out side menu listing all current event sign ups
// users can see what events theyve registered for and edit or delete item
export default function EventSideMenu({
  onClose, // closes the menu
  signedUpUsers = [], // list users who have signed up
  onEditUser, // opens edit form
  handleDeleteClick, // opens confirmation modal
  confirmDelete,
  cancelDelete,
  showConfirm, // whether to show confirm modal
}) {
  const [minimized, setMinimized] = useState(false);

  return (
    <div className={`side-menu ${minimized ? "minimized" : ""}`}>
      {/*buttons at top*/}
      <div className="side-menu-header">
        <ControlButton onClick={() => setMinimized(true)}>-</ControlButton>
        <ControlButton onClick={() => setMinimized(false)}>+</ControlButton>
        <ControlButton onClick={onClose}>×</ControlButton>
      </div>

      {/*only renders when content not minimized*/}
      {!minimized && (
        <>
          <div className="side-menu-content">
            <h2>Your Current Events</h2>
            {signedUpUsers.length === 0 && <p>No events selected</p>}
            <ul>
              {console.log("signed up users: ", signedUpUsers)}
              {signedUpUsers.map((user) => {
                const event = user.eventInfo;
                return (
                <li key={user.id}>
                  <strong>{event.title}</strong> - {event.time} <br />
                  {user.name && (
                    <>
                    {/*show user details*/}
                      Name: {user.name}
                      <br />
                      Email: {user.email}
                      <br />
                      Phone: {user.phone}
                      <br />
                      Tickets: {user.tickets}
                    </>
                  )}
                  <br />
                  {/*action buttons*/}
                  <DeleteButton onClick={() => handleDeleteClick(user.id)} /> {/*opens confirm modal*/}
                  <EditButton onClick={() => onEditUser(user)} /> {/*preloads form*/}
                </li>
              );
           })}
            </ul>
          </div>
        </>
      )}
      {/*confirmation model shows when deleting*/}
      {showConfirm && (
        <ConfirmModal
          message="Are you sure you want to delete this registration?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}
