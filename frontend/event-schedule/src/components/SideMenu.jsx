import { useState } from "react";
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";
import "./SideMenu.css";
import CloseButton from "../buttons/CloseButton";
import ConfirmModal from "./ConfirmModal";

export default function SideMenu({ onClose, users, onEditUser, onDeleteUser }) {
  const [minimized, setMinimized] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    onDeleteUser(selectedUserId);
    setShowConfirm(false);
    setSelectedUserId(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setSelectedUserId(null);
  };

  return (
    <div className={`side-menu ${minimized ? "minimized" : ""}`}>
      {/*buttons at top*/}
      <div className="side-menu-header">
        <button className="minimize" onClick={() => setMinimized(true)}>
          -
        </button>
        <button className="maximize" onClick={() => setMinimized(false)}>
          +
        </button>
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
