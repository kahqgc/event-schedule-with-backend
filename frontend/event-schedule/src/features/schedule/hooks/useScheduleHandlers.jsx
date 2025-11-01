import { useState } from "react";

export default function useScheduleHandlers({
  createUser,
  updateUser,
}) {
  const [activeEvent, setActiveEvent] = useState(null); //controls what event details are shown
  const [signUpFormData, setSignUpFormData] = useState(null); //data in the sign-up form for a user
  const [showSignUpForm, setShowSignUpForm] = useState(false); //boolean controlling whether sign up form is visible or event details is
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);//boolean controlling whether side menu is open 
  const [error, setError] = useState("");

    // HANDLER 1: EVENT SELECTION - called when a user clicks an event in schedule table
  const handleSelectEvent = (event) => {
    setActiveEvent(event);
    setSignUpFormData({ //reset form
      id: null,
      name: "",
      email: "",
      phone: "",
      tickets: 1,
      sessionTitle: event.title,
    });
    setShowSignUpForm(true); //open sign up form for new registration
  };

  //HANDLER 2: SUBMIT FORM - handle sign up form submission (calls createUser when new and update user when editting)
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

    //HANDLER 3: EDIT EXISTING USER -  open sign up form populated with an existing user's data to edit
  const editUser = (user) => {
    setActiveEvent({ title: user.sessionTitle }); //sets current activeEvent in use
    setSignUpFormData({ ...user });
    setShowSignUpForm(true);
    setIsSideMenuOpen(true); //opens side menu
  };

  //HANDLER 4. CLOSES MODALS - closes all modals and forms, resets activeEvent
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
