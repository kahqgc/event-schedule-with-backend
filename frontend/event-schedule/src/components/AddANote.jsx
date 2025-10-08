import Form from "./Form";
import SavedNote from "./SavedNote";
import { useState, useEffect } from "react";
import "./AddANote.css";

export default function AddANote({ eventId }) {
  const [textArea, setTextArea] = useState("");
  const [category, setCategory] = useState("");
  const [save, setSave] = useState(false);
  const [savedNote, setSavedNote] = useState("");
  const [error, setError] = useState("");

  const handleTextAreaChange = (event) => {
    setTextArea(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleEdit = (event) => {
    event.preventDefault(); /*stops unwanted form submission*/
    setSave(false); //switch view from savedNote back to form
  };

  const handleSave = (event) => {
    event.preventDefault(); /*stops unwanted form submission*/
    if (!textArea) {
      setError("Error: Please enter a note before saving!");
    } else if (textArea.length > 300) {
      setError("Error: Text cannot exceed 300 characters");
    } else if (!category) {
      setError("Please select a category!");
    } else {
      setError(""); //clears error messages
      setSave(true); //change state to true for a save to show SavedNote component
      setSavedNote(textArea); //storing textArea as a saved note
      localStorage.setItem(
        `note-${eventId}`,
        textArea
      ); /*setting a key value pair .setItem(key, value) of the user input and storing it locally*/
      localStorage.setItem(`category-${eventId}`, category);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem(
      `note-${eventId}`
    ); /*retrieving saved note and category from local storage based on eventId changes*/
    const savedCategory = localStorage.getItem(`category-${eventId}`);
    if (saved) {
      setSavedNote(saved);
      setTextArea(saved); // fill text area with existing saved note so user still sees saved note if they come back
      setSave(true); //allows saved note to appear in the saved-note div based on ternary
    }

    if (savedCategory) {
      setCategory(savedCategory);
    }
  }, [eventId]); /*run when eventID changes*/

  return (
    <div className="add-a-note-box">
      <h2>Leave a Personal Note for This Event</h2>
      {!save ? (
        <Form
          textArea={textArea}
          category={category}
          handleTextAreaChange={handleTextAreaChange}
          handleCategoryChange={handleCategoryChange}
          handleSave={handleSave}
          error={error}
        />
      ) : (
        <SavedNote
          savedNote={savedNote}
          category={category}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
}

// https://meenumatharu.medium.com/a-practical-guide-to-using-local-storage-in-web-and-react-js-6d163a000c3a how to set local storage for a form
//https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
