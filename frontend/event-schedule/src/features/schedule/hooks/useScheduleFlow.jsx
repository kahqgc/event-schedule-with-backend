import { useState } from "react";

// manages the schedule UI flow
// 1. selecting and viewing an event (handleSelectEvent)
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
  const getDefaultForm = (event, existing = {}) => {
    return {
      id: existing.id || null,
      name: existing.name || "",
      email: existing.email || "",
      phone: existing.phone || "",
      tickets: existing.tickets || 1,
      sessionTitle: existing.sessionTitle || (event ? event.title : ""),
    };
  };

  const prepareForm = (event, isEditing = false) => {
    if (isEditing && signUpFormData) return; // don't reset when editing existing data
    setSignUpFormData(getDefaultForm(event));
  };

  const closeModalOnly = () => {
    setActiveEvent(null);
    setShowSignUpForm(false);
  };

  const closeAll = () => {
    closeModalOnly();
    setIsSideMenuOpen(false);
  };

  // HANDLER 1: EVENT SELECTION - called when a user clicks an event in schedule table
  // sets the active event and prepare the form for a new registration
  const handleSelectEvent = (event) => {
    setActiveEvent(event);
    setError("");
    setShowSignUpForm(false); //start on info view
    prepareForm(event); //initialize form for a new signup
  };

  //HANDLER 2: SUBMIT FORM - handle sign up form submission (calls createUser when new and updateUser when editing)
  const submitSignUpForm = async (formData) => {
    try {
      if (formData.id) {
        // if the form contains an existing user ID then it's an update
        await updateUser(formData, activeEvent); //update existing
      } else {
        //otherwise, create a new record
        await createUser(formData, activeEvent || {}); //create new
      }

      //on success, close modal and open side menu for log of signed up users for events
      setIsSideMenuOpen(true); //open user list in side menu to confirm success
      setError("");
      closeModalOnly();
      prepareForm(activeEvent); //reset for next time
    } catch (err) {
      //catch network or validation errors
      setError(
        err.message || "Error submitting registration. Please try again."
      );
    }
  };

  //HANDLER 3: EDIT EXISTING USER -  when edit button is hit, open sign up form populated with an existing user's data to edit
  const editUser = (user) => {
    const event = user.eventInfo; //epects backend to attach eventInfo
    setActiveEvent(event); //sets stored eventInfo
    setSignUpFormData(
      getDefaultForm(event, {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      tickets: user.tickets,
      sessionTitle: event.title,
    })); //preload existing user data
    setShowSignUpForm(true); //switch to signUpForm modal
    setIsSideMenuOpen(true); //keep side menu open
  };

  // values and handlers made available to schedule page and child components
  return {
    //state
    activeEvent,
    signUpFormData,
    showSignUpForm,
    isSideMenuOpen,
    error,
    //setters
    setShowSignUpForm,
    setSignUpFormData,
    setError,
    //actions
    handleSelectEvent,
    submitSignUpForm,
    editUser,
    closeAll,
    closeModalOnly,
    prepareForm,
  };
}
