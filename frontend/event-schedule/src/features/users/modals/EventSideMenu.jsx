import { useState } from "react";
import "../styles/EventSideMenu.css";
import DeleteButton from "../../../buttons/DeleteButton";
import EditButton from "../../../buttons/EditButton";
import ControlButton from "../../../buttons/ControlButton";
import ConfirmModal from "./ConfirmModal";

export default function EventSideMenu({
  onClose,
  signedUpUsers = [],
  onEditUser,
  handleDeleteClick,
  confirmDelete,
  cancelDelete,
  showConfirm,
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

      {!minimized && (
        <>
          <div className="side-menu-content">
            <h2>Your Current Events</h2>
            {signedUpUsers.length === 0 && <p>No events selected</p>}
            <ul>
              {signedUpUsers.map((user) => (
                <li key={user.id}>
                  <strong>{user.sessionTitle}</strong> - {user.time} <br />
                  {user.name && (
                    <>
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
                  <DeleteButton onClick={() => handleDeleteClick(user.id)} />
                  <EditButton onClick={() => onEditUser(user)} />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
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
