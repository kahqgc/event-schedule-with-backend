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
    console.error("Error adding user", err);
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
  
    setUsers((prev)=> prev.map((u) => (u.id === updatedUser.id ? updatedUser: u)));
    return updatedUser;
  } catch (err){
    console.error("Error updating user: ", err);
    setError("Error updating user");
    throw err;
  } finally {
    setLoading(false);
  }
}

//delete (CRUD - delete user information)
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
  } catch (error) {
    console.error("Error deleting registration:", error);
    setError("Error deleting registration");
  } finally {
    setLoading(false)
  }
};
  return {
    users, createUser, updateUser, deleteUser, loading, error,
};
}
