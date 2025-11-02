import { useState } from "react";

export default function useUsers() {
  const [signedUpUsers, setSignedUpUsers] = useState([]);

// create a new user (POST)
const createUser = async (user, eventInfo) => {
  try {
    const userWithEvent = {...user, eventInfo}; //attach full event info
    const response = await fetch("http://localhost:8080/api/users",
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userWithEvent),
      });
      if (!response.ok) throw new Error("Failed to add user");

      const savedUser = await response.json();
      const userWithEventState = {...savedUser, eventInfo}
      setSignedUpUsers((prev)=> [...prev, userWithEventState]);
      return userWithEventState;
  } catch (err){
    throw new Error(err.message || "Error adding user");
}
}

// update a new user (PUT)
const updateUser = async (user, eventInfo) => {
  try {
    const userWithEvent = {...user, eventInfo}; //attach full event info
    const response = await fetch(`http://localhost:8080/api/users/${user.id}`,{
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(userWithEvent),
    });
    if (!response.ok) throw new Error ("Failed to update user")

    const updatedUser = await response.json();
    const userWithEventState = {...updatedUser, eventInfo}
    setSignedUpUsers((prev)=> prev.map((user) => (user.id === updatedUser.id ? userWithEventState: user))); //if user.id matches updatedUser.id, replace it, if not keep the original
    return userWithEventState;
  } catch (err){
    throw new Error(err.message || "Error updating user")
  }
}

//delete a user
const deleteUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete user");
    setSignedUpUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  } catch (err) {
    throw new Error(err.message || "Error deleting user");
  }
};
  return {
    signedUpUsers, createUser, updateUser, deleteUser,
};
}
