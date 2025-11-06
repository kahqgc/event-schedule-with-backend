import { useState } from "react";

//custom hook that handles all event registration flow logic
// 1. selecting and viewing an event (handleSelectEvent)
// 2. toggling between viewing details
// 3. submitting or editing a sign up
// 4. keeping side menu and modals in sync

export default function useScheduleFlow({ createSignUp, updateSignUp, ui }) {
  const [signUpFormData, setSignUpFormData] = useState(null);

  //------------- HELPERS ---------------
  //create default template for form fields
  const getDefaultForm = (event, existing = {}) => {
    return {
      id: existing.id || null,
      name: existing.name || "",
      email: existing.email || "",
      phone: existing.phone || "",
      tickets: existing.tickets || 1,
      eventTitle: existing.eventTitle || (event ? event.title : ""),
    };
  };

  //prepares blank form data when a new event is selected
  const prepareForm = (event) => {
    const newForm = getDefaultForm(event);
    setSignUpFormData(newForm);
    return newForm;
  };

  //-------------HANDLERS-----------------
  // HANDLER 1: EVENT SELECTION - clicks an event and open details modal
  const handleSelectEvent = (event) => {
    ui.openEventDetails(event); //opens modal
    ui.setError("");
    prepareForm(event); //prepare blank form for this event
  };

  //HANDLER 2: SUBMIT FORM - submits form data to create or update signup
  const submitSignUpForm = async (formData) => {
    try {
      //if form data exists then you're editting so PUT
      if (formData.id) {
        //updating this signup with this new user data that is tied to this event (PUT)
        await updateSignUp(formData.id, formData, ui.activeEvent); ////(/{id}, body, event context)
      } else {
        //POST
        const savedSignUp = await createSignUp(formData, ui.activeEvent); //(info from form, event)
        setSignUpFormData((prev) => ({
          ...prev,
          id: savedSignUp.id || savedSignUp.signupId,
        }));
      }

        //reset ui state
      ui.setIsSideMenuOpen(true);
      ui.setError("");
      ui.setShowSignUpForm(false);
      prepareForm(ui.activeEvent);
    } catch (err) {
      //catch network or validation errors
      ui.setError(
        err.message || "Error submitting registration. Please try again."
      );
    }
  };

  //HANDLER 3: EDIT EXISTING USER -  edit an existing signup from the side menu
  const editSignUp = (signup) => {
    const event = signup.eventInfo; //expects backend to attach eventInfo
    const attendee = signup.attendee; //expects backend to attach user

    ui.openEventDetails(event); //sets stored eventInfo

    setSignUpFormData(
      //build a form for this specific event using the attendee's saved info
      getDefaultForm(event, {
        id: signup.id,
        name: attendee.name,
        email: attendee.email,
        phone: attendee.phone,
        tickets: attendee.tickets,
        eventTitle: event.title,
      })
    ); //preload existing attendee data
    ui.setShowSignUpForm(true);
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
    editSignUp,
    prepareForm,
  };
}
