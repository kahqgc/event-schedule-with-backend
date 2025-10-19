import { useState } from "react";

export default function useSignUpForm(
  scheduledEvent,
  signedUpSessions,
  setSignedUpSessions
) {
  const [editSessionIndex, setEditSessionIndex] = useState(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tickets: 1,
  });
  const handleSignUp = (signUpData) => {
    const fullSignUp = {
      ...signUpData,
      title: scheduledEvent.title,
    };

    if (editSessionIndex !== null) {
      const updated = [...signedUpSessions];
      updated[editSessionIndex] = fullSignUp;
      setSignedUpSessions(updated);
      setEditSessionIndex(null);
    } else {
      const isAdded = signedUpSessions.some(
        (sess) => sess.title === scheduledEvent.title
      );
      if (isAdded) {
        setError("You've already added this event!");
        return;
      }
      setSignedUpSessions((prev) => [...prev, fullSignUp]);
    }

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
    });
    setEditSessionIndex(index);
    setError("");
  };
  return {
    formData,
    setFormData,
    error,
    setError,
    handleSignUp,
    handleEditSessionIndex,
  };
}
