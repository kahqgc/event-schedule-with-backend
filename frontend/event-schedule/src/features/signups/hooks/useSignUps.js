import { useState } from "react";

// custom hook that is a bridge between sign up form UI and backend DB
// handles all CRUD operations for user sign ups:
// create new sign up (POST), update existing sign up (PUT), delete sign up (DELETE)
// manages state and fetch calls
//stores a list of signups in state
export default function useUsers() {
  const [signUps, setSignUps] = useState([]);

  // ----------- CREATE (POST) ---------//
  // called when a new user signs up for an event
  // sends user data (plus event details) to the backend
  const createSignUp = async (attendeeData, eventInfo) => {
    try {
      //package both pieces of data (user and event) into one object
      //matches backend SignupRequestDTO
      const signUpData = {
        eventInfoId: eventInfo.id,
        attendee: attendeeData,
      }; //attach event details to user

      // send combined data to backend to create new signup in database
      const response = await fetch("http://localhost:8080/api/signups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData),
      });
      // if backend responds with an error, step here and throw error to catch
      if (!response.ok) throw new Error("Failed to sign up");

      //convert backend JSON response into a JS object
      const savedSignUp = await response.json();

      //add new signups to signUps array so that side menu updates right away
      setSignUps((prev) => [...prev, savedSignUp]);

      //return newly created user to parent
      return savedSignUp;
    } catch (err) {
      throw new Error(err.message || "Error signing up");
    }
  };

  ///// -------------- UPDATE (PUT) --------------- ///
  // called when an existing attendee edits their registration
  // sends updated form data to backend
  // updates state so change appears immediately in side menu
  const updateSignUp = async (signUpId, attendeeData, eventInfo) => {
    try {
      // combine the updated attendee form data with event info. ensures backend knows which event this registration belongs to
      const updatedData = {
        eventInfoId: eventInfo.id,
        attendee: attendeeData,
      };

      //sends PUT request to update specific user by id
      // backend uses this id to find and replace existing record
      const response = await fetch(
        `http://localhost:8080/api/signups/${signUpId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );
      //if response isn't successful, stop and throw an error
      if (!response.ok) throw new Error("Failed to update signup");

      //convert JSON response to JS object
      const updatedSignUp = await response.json();

      //update local list of signed up users by replacing old version
      setSignUps((prev) =>
        prev.map((signup) =>
          signup.id === updatedSignUp.id ? updatedSignUp : signup
        )
      ); //if user.id matches updatedUser.id, replace it, if not keep the original

      //return updated user for parent
      return updatedSignUp;
    } catch (err) {
      throw new Error(err.message || "Error updating signup");
    }
  };

  //------------------DELETE-------------------//
  // called when user deletes registration from event
  //sends delete request to backend and removes user from state so that side menu updates
  const deleteSignUp = async (signUpId) => {
    try {
      // send delete request to backend, targetting by sign up ID
      const response = await fetch(
        `http://localhost:8080/api/signups/${signUpId}`,
        {
          method: "DELETE",
        }
      );

      //if backend didn't confirm success throw an error
      if (!response.ok) throw new Error("Failed to delete signup");

      //update state by removing deleted user so side menu reflects the changes
      setSignUps((prev) => prev.filter((signup) => signup.id !== signUpId));
    } catch (err) {
      throw new Error(err.message || "Error deleting signup");
    }
  };
  return {
    signUps,
    createSignUp,
    updateSignUp,
    deleteSignUp,
  };
}
