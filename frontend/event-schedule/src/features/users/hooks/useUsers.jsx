import { useState } from "react";

// custom hook that manages state and fetch calls
export default function useUsers() {
  const [signedUpUsers, setSignedUpUsers] = useState([]);

// ----------- CREATE (POST) ---------//
// called when a new user signs up for an event
// sends user data (plus event details) to the backend
const createUser = async (user, eventInfo) => {
  try {
    // combine user form data with event they selected
    // this lets the backend know which event this user is signing up for
    const userWithEvent = {...user, eventInfo}; //attach event details to user

    // send combined data to backend to create new record
    const response = await fetch("http://localhost:8080/api/users",
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userWithEvent),
      });
      // if backend responds with an error, step here and throw error to catch
      if (!response.ok) throw new Error("Failed to add user");

      //convert backend JSON response into a JS object
      const savedUser = await response.json();

      //reattached eventInfo
      const userWithEventState = {...savedUser, eventInfo}

      //add new user to state so that side menu updates right away
      setSignedUpUsers((prev)=> [...prev, userWithEventState]);

      //return newly create user to return to parent
      return userWithEventState;
  } catch (err){
    throw new Error(err.message || "Error adding user");
}
}

///// -------------- UPDATE (PUT) --------------- ///
// called when an existing user edits their registration
// sends updated form data to backend and updates state so change appears immediately in side menu
const updateUser = async (user, eventInfo) => {
  try {
    // combine the updated user form data with event info. ensures backend knows which event this registration belongs to
    const userWithEvent = {...user, eventInfo};

      //sends PUT request to update specific user by id
      // backend uses this id to find and replace existing record
    const response = await fetch(`http://localhost:8080/api/users/${user.id}`,{
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(userWithEvent),
    });
    //if response isn't successful, stop and throw an error
    if (!response.ok) throw new Error ("Failed to update user")

      //convert JSON response to JS object
    const updatedUser = await response.json();

    //reattach event info to the updated user for state
    const userWithEventState = {...updatedUser, eventInfo}

    //update local list of signed up users by replacing old version
    setSignedUpUsers((prev)=> prev.map((user) => (user.id === updatedUser.id ? userWithEventState: user))); //if user.id matches updatedUser.id, replace it, if not keep the original

    //return updated user for parent
    return userWithEventState;

  } catch (err){
    throw new Error(err.message || "Error updating user")
  }
}

//------------------DELETE-------------------//
// called when user deletes registration from event
//sends delete request to backend and removes user from state so that side menu updates
const deleteUser = async (userId) => {
  try {
    // send delete request to backend, targetting specific user by ID
    const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
      method: "DELETE",
    });

    //if backend didn't confirm success throw an error
    if (!response.ok) throw new Error("Failed to delete user");

    //update state by removing deleted user so side menu reflects the changes
    setSignedUpUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

  } catch (err) {
    throw new Error(err.message || "Error deleting user");
  }
};
  return {
    signedUpUsers, createUser, updateUser, deleteUser,
};
}
