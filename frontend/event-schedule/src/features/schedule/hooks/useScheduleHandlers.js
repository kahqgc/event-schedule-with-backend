import { useState } from "react";

//bridge between:
// Schedule UI(Event Schedule table and Event Details modal)
// sign-up components (SignUpForm and SideMenu)
// sign-up data layer (useSignups)

//custom hook that handles all event registration flow logic
// 1. selecting and viewing an event (handleSelectEvent)
// 2. toggling between viewing details and form
// 3. submitting or editing a sign up
// 4. keeping side menu and modals in sync

export default function useScheduleHandlers({
  createSignUp,
  updateSignUp,
  ui,
}) {
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

  //prepares blank or prefilled form data when a new event is selected
  // if switching to a new event, resets fields; otherwise keeps existing data
  const prepareForm = (event) => {
    if (!signUpFormData || signUpFormData.eventTitle !== event.title) {
      const newForm = getDefaultForm(event);
      setSignUpFormData(newForm);
      return newForm;
    }
    return signUpFormData;
  }

  //-------------HANDLERS-----------------
  // HANDLER 1: EVENT SELECTION - clicks an event and open details modal
  const handleSelectEvent = (event) => {
    ui.openEventDetails(event); //opens modal
    ui.setError("");
    //only reset form if switching to a different event
    if (!ui.activeEvent || ui.activeEvent.id !== event.id) {
      prepareForm(event);
    } 
  };

  //HANDLER 2: SUBMIT FORM - handler function that decides whether to create or update a signup and then manages ui state
  const submitSignUpForm = async (attendeeData) => {
    try {
      //if form data exists then you're editting so PUT
      if (attendeeData.id) {
        //updating this signup with this new user data that is tied to this event (PUT)
        await updateSignUp(attendeeData.id, attendeeData, ui.activeEvent); ////(/{id}, attendee's info, event selected)
      } else {
        //POST
        const savedSignUp = await createSignUp(attendeeData, ui.activeEvent); //(info from form, event)
        setSignUpFormData((prev) => ({
          ...prev,
          id: savedSignUp.id, // adding newly made id from backend to existing form data state
        }));
      }
      //reset ui state
      ui.setIsSideMenuOpen(true); //open side menu
      ui.setError(""); //clear errors
      ui.setShowSignUpForm(false); //close form
      setSignUpFormData(null); //resets form data
    } catch (err) {
      //catch network or validation errors
      ui.setError(
        err.message || "Error submitting registration. Please try again."
      );
    }
  };

  //HANDLER 3: EDIT EXISTING USER -  edit an existing signup from the side menu
  const editSignUp = (signup) => {
    const event = signup.eventInfo; //event the attendee signed up for
    const attendee = signup.attendee; //attendee info from backend

    ui.openEventDetails(event); //sets stored eventInfo

    setSignUpFormData(
      //build a form for this specific event using the attendee's saved info
      getDefaultForm(event, {
        id: signup.id,
        name: attendee.name,
        email: attendee.email,
        phone: attendee.phone,
        tickets: attendee.tickets,
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
