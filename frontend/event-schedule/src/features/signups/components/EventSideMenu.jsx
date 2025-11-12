import { useState } from "react";
import "../styles/EventSideMenu.css";
import DeleteButton from "../../../buttons/DeleteButton";
import EditButton from "../../../buttons/EditButton";
import ControlButton from "../../../buttons/ControlButton";
import ConfirmModal from "./ConfirmModal";
import { formatEventTime } from "../../schedule/utils/scheduleUtils";

// display slide out side menu listing all current event sign ups
// users can see what events theyve registered for and edit or delete item
export default function EventSideMenu({
  onClose, // closes the menu
  signUps, // list users who have signed up
  editSignUp, // opens edit form
  handleDeleteClick, // opens confirmation modal
  confirmDelete,
  cancelDelete,
  showConfirm, // whether to show confirm modal
}) {
  const [minimized, setMinimized] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");

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
            {signUps.length === 0 && <p>No events selected</p>}
            {showMessage && <p className="success-message">{messageText}</p>}
            <ul>
              {signUps.map((signup) => {
                const attendee = signup.attendee;
                const eventTitle = signup.eventInfo.title;
                const eventTime = signup.eventInfo.dateTime;
                return (
                  <li key={signup.id}>
                    <strong>{eventTitle}</strong>
                    {eventTime && <> — {formatEventTime(eventTime)}</>} <br />
                    {attendee.name && (
                      <>
                        {/*show attendee details*/}
                        Name: {attendee.name}
                        <br />
                        Email: {attendee.email}
                        <br />
                        Phone: {attendee.phone}
                        <br />
                        Tickets: {attendee.tickets}
                      </>
                    )}
                    <br />
                    {/*action buttons*/}
                    <DeleteButton
                      onClick={() => handleDeleteClick(signup.id)}
                    />
                    {/*opens confirm modal*/}
                    <EditButton onClick={() => editSignUp(signup)} />
                    {/*preloads form*/}
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
          onConfirm={() => {
            confirmDelete();
            setMessageText("Registration deleted successfully!");
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 2000);
          }}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}
