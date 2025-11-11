import {useState} from 'react';
import { formatEventTime } from "../utils/scheduleUtils";

//manages all UI state for schedule
//- which event is currently open
//- whether sign up form is showing
//- whether side menu is open
//- error messages
export default function useScheduleUI() {
  // UI STATE
  const [activeEvent, setActiveEvent] = useState(null); //the event currently shown
  const [showSignUpForm, setShowSignUpForm] = useState(false); //toggle for showing sign up form vs event details
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false); //toggle for side menu
  const [error, setError] = useState("");

    //------------- ACTIONS ----------------
    // open event details modal for a specific event
  const openEventDetails = (event) => {
  const formattedEvent = {
      ...event,
      time: event.time || formatEventTime(event.dateTime),
  }
    setActiveEvent((prev) => {
      if (prev && prev.id === formattedEvent.id) return prev; //no change
      return formattedEvent;
    });
    setShowSignUpForm(false);
  };

  // close only the event modal
  const closeModalOnly = () => {
    setActiveEvent(null);
    setShowSignUpForm(false);
  };

  // close both modal and side menu
  const closeAll = () => {
    closeModalOnly();
    setIsSideMenuOpen(false);
  };

  return {
    //state
    activeEvent,
    showSignUpForm,
    isSideMenuOpen,
    error,

    //setters
    setError,
    setIsSideMenuOpen,
    setShowSignUpForm,

    //actions
    openEventDetails,
    closeModalOnly,
    closeAll,
  }
}
