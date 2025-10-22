import { useState } from "react";

export default function useSideMenuActions(signedUpSessions, setSignedUpSessions) {
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (signedUpSessions.length === 0){
      alert("no events selected");
      return;
    }
    setLoading(true);
    setError("");

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
      console.error("Error saving events:", error);
      setError("Error saving events");
    } finally {
      setLoading(false);
    }
};
return {
    loading,
    error,
    handleConfirm,
};
}
