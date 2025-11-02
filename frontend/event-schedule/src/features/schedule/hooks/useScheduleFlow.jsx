import { useState } from "react";

// custom react hook that manages the lifecycle of event sign up process form schedule
// 1. selecting and viewing an event (handleSelecteEvent)
// 2. opening and closing the signUpForm
// 3. creating or editting a user sign up
// 4. controlling side menu and modal visibility
export default function useScheduleHandlers({ createUser, updateUser }) {
  // UI STATE
  const [activeEvent, setActiveEvent] = useState(null); //the event currently shown
  const [signUpFormData, setSignUpFormData] = useState(null); //data in the sign-up form for a user
  const [showSignUpForm, setShowSignUpForm] = useState(false); //boolean controlling whether sign up form is visible or event details is
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false); //boolean controlling whether side menu is open
  const [error, setError] = useState("");

  //HELPERS
  const getDefaultForm = (event, existingData = {}) => {
    return {
      id: existingData.id || null,
      name: existingData.name || "",
      email: existingData.email || "",
      phone: existingData.phone || "",
      tickets: existingData.tickets || 1,
      sessionTitle: existingData.sessionTitle || (event ? event.title : ""),
    };
  };

  const prepareForm = (event, isEditing = false) => {
    if (isEditing && signUpFormData) return; // don't reset if editing
    setSignUpFormData(getDefaultForm(event));
  };

  const resetUI = () => {
    setActiveEvent(null);
    setShowSignUpForm(false);
    setIsSideMenuOpen(false);
  };

  // HANDLER 1: EVENT SELECTION - called when a user clicks an event in schedule table
  // sets the selected event and resets the form for a new registration
  const handleSelectEvent = (event) => {
    setActiveEvent(event);
    prepareForm(event); //start fresh signup
    setShowSignUpForm(false); //don't open signUpFormYet
  };

  //HANDLER 2: SUBMIT FORM - handle sign up form submission (calls createUser when new and updateUser when editting)
  const submitSignUpForm = async (data) => {
    try {
      if (data.id) {
        // if the form contains an existing user ID then it's an update
        await updateUser(data, activeEvent); //PUT handled by useUsers
      } else {
        //otherwise, create a new record
        await createUser(data, activeEvent || {}); //POST handled by useUsers
      }
      prepareForm(activeEvent); //reset form
      resetUI(); //reset state
      setIsSideMenuOpen(true); //open user list in side menu to confirm success
      setError("");
    } catch (err) {
      //catch network or validation errors
      setError(
        err.message || "Error submitting registration. Please try again."
      );
    }
  };

  //HANDLER 3: EDIT EXISTING USER -  when edit button is hit, open sign up form populated with an existing user's data to edit
  const editUser = (user) => {
    const event = user.eventInfo;
    setActiveEvent(event); //sets stored eventInfo
    setSignUpFormData(getDefaultForm(event, {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      tickets: user.tickets,
      sessionTitle: event.title,
    })); // keep sessionTitle in sync); //preload existing user data
    setShowSignUpForm(true); //switch to signUpFOrm modal
    setIsSideMenuOpen(true); //keep side menu open
  };

  //HANDLER 4. CLOSES MODALS - closes all modals and forms, resets activeEvent
  const closeAll = resetUI;

  // values and handlers made available to schedule page and child components
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
    prepareForm,
  };
}
