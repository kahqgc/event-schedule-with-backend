import { useState } from "react";
import ConfirmButton from "../buttons/ConfirmButton";
import DeleteButton from "../buttons/DeleteButton";
import "./SideMenu.css";
import EditButton from "../buttons/EditButton";


export default function SideMenu({ signedUpSessions, setSignedUpSessions, handleEditSessionIndex, onClose }) {
  const [minimized, setMinimized] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (signedUpSessions.length === 0){
      alert("no events selected");
      return;
    }
    setLoading(true);

    try {
      for (const session of signedUpSessions){
        const backend = {
          name: session.name || "",
          email: session.email || "",
          phone: session.phone || "",
          tickets: session.tickets || 1,
          sessionTitle: session.title || ""
        };

      const response = await fetch("http://localhost:8080/api/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backend),
      });
       console.log("Response received:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const savedUser = await response.json();
      console.log("User Saved: ", savedUser);
      alert("You're On The List! See You There!");
      setSignedUpSessions([]);
    }
    } catch (error) {
      console.log("Error saving events:", error);
      alert("Error saving events");
    } finally {
      setLoading(false);
    }
  };
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
                    }}/> 
                    <EditButton onClick={()=> handleEditSessionIndex(index)}/>
                  </li>
                ))}
              </ul>
          </div>
          <div className="side-menu-footer">
          <ConfirmButton
            onClick={handleConfirm}
            loading={loading}
          />
          </div>
        </>
      )}
    </div>
  );
}
