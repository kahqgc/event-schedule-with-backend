import { useState } from "react";
import ConfirmButton from "../buttons/ConfirmButton";
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";
import "./SideMenu.css";
import CloseButton from "../buttons/CloseButton";

export default function SideMenu({
  onClose,
  users,
  onEditUser,
  onDeleteUser
}) {
  const [minimized, setMinimized] = useState(false);

  return (
    <div className={`side-menu ${minimized ? "minimized" : ""}`}>
      {/*buttons at top*/}
      <div className="side-menu-header">
        <button className="minimize" onClick={() => setMinimized(true)}>-</button>
        <button className="maximize" onClick={() => setMinimized(false)}>+</button>
        <CloseButton onClick={onClose} />
      </div>

      {!minimized && (
        <>
          <div className="side-menu-content">
            <h2>Added Events</h2>
            <ul>
              {users.map((user) => (
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
                  <DeleteButton
                    onClick={() => {
                      onDeleteUser(user.id);
                    }}
                  />
                  <EditButton onClick={() => onEditUser(user)} />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
