import { useState } from "react";

export default function useUsers() {
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

// create a new user (POST)
const createUser = async (user) => {
  setLoading(true);
  setError("");
  try {
    const response = await fetch("http://localhost:8080/api/users",
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}` );
      const savedUser = await response.json();
      setUsers((prev)=> [...prev, savedUser]);
      return savedUser;
  } catch (err){
    setError("Error adding user");
    throw err;
  } finally {
    setLoading(false);
  }
}  ;

// update a new user (PUT)
const updateUser = async (user) => {
  setLoading(true);
  setError("");
  try {
    const response = await fetch(`http://localhost:8080/api/users/${user.id}`,{
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error (`HTTP error! Status: ${response.status}`)
    const updatedUser = await response.json();
  
    setUsers((prev)=> prev.map((user) => (user.id === updatedUser.id ? updatedUser: user))); //if user.id matches updatedUser.id, replace it, if not keep the original
    return updatedUser;
  } catch (err){
    setError("Error updating user");
    throw err;
  } finally {
    setLoading(false);
  }
}

//delete a user
const deleteUser = async (userId) => {
  setLoading(true);
  setError("");
  try {
    const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  } catch (err) {
    setError("Error deleting registration");
    throw err;
  } finally {
    setLoading(false)
  }
};
  return {
    users, createUser, updateUser, deleteUser, loading, error,
};
}
