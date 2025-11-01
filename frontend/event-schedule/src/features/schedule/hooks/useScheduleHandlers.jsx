import { useState } from "react";

export default function useScheduleHandlers({
  createUser,
  updateUser,
}) {
  const [activeEvent, setActiveEvent] = useState(null);
  const [signUpFormData, setSignUpFormData] = useState(null);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [error, setError] = useState("");

  //1. open sign up form again to edit user
  const editUser = (user) => {
    setActiveEvent({ title: user.sessionTitle });
    setSignUpFormData({ ...user });
    setShowSignUpForm(true);
    setIsSideMenuOpen(true);
  };

  //2. handle sign up form submission
  const submitSignUpForm = async (data) => {
    try {
      if (data.id) {
        await updateUser(data); //PUT handled by useUsers
      } else {
        await createUser(data); //POST handled by useUsers
      }
      //reset form
      setSignUpFormData({
        name: "",
        email: "",
        phone: "",
        tickets: 1,
        sessionTitle: activeEvent.title,
      });
      setActiveEvent(null);
      setShowSignUpForm(false);
      setIsSideMenuOpen(true);
    } catch (err) {
      setError(
        err.message || "Error submitting registration. Please try again."
      );
    }
  };

  //
  const handleSelectEvent = (event) => {
    setActiveEvent(event);
    setSignUpFormData({
      id: null,
      name: "",
      email: "",
      phone: "",
      tickets: 1,
      sessionTitle: event.title,
    });
    setShowSignUpForm(true);
  };

  const closeAll = () => {
    setActiveEvent(null);
    setShowSignUpForm(false);
    setIsSideMenuOpen(false);
  };

  return {
    activeEvent,
    signUpFormData,
    showSignUpForm,
    isSideMenuOpen,
    error,
    setError,
    handleSelectEvent,
    submitSignUpForm,
    editUser,
    closeAll,
    setShowSignUpForm,
    setSignUpFormData,

  };
}
