import { useState } from "react";

//custom hook that manages UI state

// manages the schedule UI flow
// 1. selecting and viewing an event (handleSelectEvent)
// 2. opening and closing the signUpForm
// 3. creating or editting a user sign up
// 4. controlling side menu and modal visibility
export default function useScheduleFlow({ createUser, updateUser, ui }) {
  // UI STATE
  const [signUpFormData, setSignUpFormData] = useState(null);

  //HELPERS
  //create default template for form fields
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

  // initialize new blank form for selected event
  const prepareForm = (event) => {
    const newForm = getDefaultForm(event);
    setSignUpFormData(newForm);
    return newForm;
  };

  // HANDLER 1: EVENT SELECTION - called when a user clicks an event in schedule table
  // sets the active event and prepare the form for a new registration
  const handleSelectEvent = (event) => {
    ui.openEventDetails(event); //opens modal and hides sign up form
    ui.setError("");
    prepareForm(event); //prepare blank form for this event
  };

  //HANDLER 2: SUBMIT FORM - handle sign up form submission (calls createUser when new and updateUser when editing)
  const submitSignUpForm = async (formData) => {
    try {
      if (formData.id) {
        // if the form contains an existing user ID then it's an update
        await updateUser(formData, ui.activeEvent); //update existing
      } else {
        //otherwise, create a new record
        await createUser(formData, ui.activeEvent || {}); //create new
      }

      //on success, close modal and open side menu for log of signed up users for events
      ui.setIsSideMenuOpen(true); //open user list in side menu to confirm success
      ui.setError("");
      ui.setShowSignUpForm(false);
      prepareForm(ui.activeEvent); //reset for next time
    } catch (err) {
      //catch network or validation errors
      ui.setError(
        err.message || "Error submitting registration. Please try again."
      );
    }
  };

  //HANDLER 3: EDIT EXISTING USER -  when edit button is hit, open sign up form populated with an existing user's data to edit
  const editUser = (user) => {
    const event = user.eventInfo; //epects backend to attach eventInfo
    ui.openEventDetails(event); //sets stored eventInfo
    setSignUpFormData(
      getDefaultForm(event, {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      tickets: user.tickets,
      sessionTitle: event.title,
    })); //preload existing user data
    ui.openSignUpForm(true); //switch to signUpForm modal
    ui.setIsSideMenuOpen(true); //keep side menu open
  };

  // values and handlers made available to schedule page and child components
  return {
    signUpFormData,
    //setters
    setSignUpFormData,
    //actions
    handleSelectEvent,
    submitSignUpForm,
    editUser,
    prepareForm,
  };
}
