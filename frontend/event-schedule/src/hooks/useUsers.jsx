import { useState } from "react";

export default function useUsers() {
 const [loading, setLoading] = useState(false);
  const [signedUpUsers, setSignedUpUsers] = useState([]);

// create a new user (POST)
const createUser = async (user) => {
  setLoading(true);
  try {
    const response = await fetch("http://localhost:8080/api/users",
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error("Failed to add user");
      const savedUser = await response.json();
      setSignedUpUsers((prev)=> [...prev, savedUser]);
      return savedUser;
  } catch (err){
    throw new Error(err.message || "Error adding user");
  } finally {
    setLoading(false);
  }
}  ;

// update a new user (PUT)
const updateUser = async (user) => {
  setLoading(true);
  try {
    const response = await fetch(`http://localhost:8080/api/users/${user.id}`,{
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error ("Failed to update user")
    const updatedUser = await response.json();
  
    setSignedUpUsers((prev)=> prev.map((user) => (user.id === updatedUser.id ? updatedUser: user))); //if user.id matches updatedUser.id, replace it, if not keep the original
    return updatedUser;
  } catch (err){
    throw new Error(err.message || "Error updating user")
  } finally {
    setLoading(false);
  }
}

//delete a user
const deleteUser = async (userId) => {
  setLoading(true);
  try {
    const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    setSignedUpUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  } catch (err) {
    throw new Error(err.message || "Error deleting user");
  } finally {
    setLoading(false)
  }
};
  return {
    signedUpUsers, createUser, updateUser, deleteUser, loading,
};
}
