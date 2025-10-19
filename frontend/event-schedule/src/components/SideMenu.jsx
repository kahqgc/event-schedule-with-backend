import { useState } from "react";
import ConfirmButton from "../buttons/ConfirmButton";
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";
import useSideMenuActions from "../hooks/useSideMenuActions";
import "./SideMenu.css";

export default function SideMenu({
  signedUpSessions,
  setSignedUpSessions,
  handleEditSessionIndex,
  onClose,
}) {
  const [minimized, setMinimized] = useState(false);
  const { loading, error, handleConfirm } = useSideMenuActions(
    signedUpSessions,
    setSignedUpSessions
  );
  return (
    <div className={`side-menu ${minimized ? "minimized" : ""}`}>
      {/*buttons at top*/}
      <div className="side-menu-header">
        <button onClick={() => setMinimized(true)}>-</button>
        <button onClick={() => setMinimized(false)}>+</button>
        <button className="close" onClick={onClose}>
          X
        </button>
      </div>

      {!minimized && (
        <>
          <div className="side-menu-content">
            <h2>Added Events</h2>
            <ul>
              {signedUpSessions.map((session, index) => (
                <li key={index}>
                  <strong>{session.title}</strong> - {session.time} <br />
                  {session.name && (
                    <>
                      Name: {session.name}
                      <br />
                      Email: {session.email}
                      <br />
                      Phone: {session.phone}
                      <br />
                      Tickets: {session.tickets}
                    </>
                  )}
                  <br />
                  <DeleteButton
                    onClick={() => {
                      const updated = [...signedUpSessions]; //make copy of array
                      updated.splice(index, 1);
                      setSignedUpSessions(updated);
                    }}
                  />
                  <EditButton onClick={() => handleEditSessionIndex(index)} />
                </li>
              ))}
            </ul>
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="side-menu-footer">
            <ConfirmButton onClick={handleConfirm} loading={loading} />
          </div>
        </>
      )}
    </div>
  );
}
