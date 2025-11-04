import {useState} from 'react';

export default function useScheduleUI() {
  // UI STATE
  const [activeEvent, setActiveEvent] = useState(null); //the event currently shown
  const [showSignUpForm, setShowSignUpForm] = useState(false); //boolean controlling whether sign up form is visible or event details is
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false); //boolean controlling whether side menu is open
  const [error, setError] = useState("");

  const openEventDetails = (event) => {
    setActiveEvent(event);
    setShowSignUpForm(false);
  };

  const closeModalOnly = () => {
    setActiveEvent(null);
    setShowSignUpForm(false);
  };

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
