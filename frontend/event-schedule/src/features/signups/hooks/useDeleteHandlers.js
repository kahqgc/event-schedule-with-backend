import {useState} from 'react';

//manages confimation flow for deleting a sign up
//- open confirmation modal when delete is clicked
//- confirm deletion and call onDeleteUser callback
//- cancel and closes modal

// handler to control deleting a user used in side menu buttons
export default function useDeleteHandlers(onDeleteUser) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  //1. triggers when delete button is clicked
  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setShowConfirm(true); //show confirmation modal
  };

  //2. confirm delete in the confirmation modal
  const confirmDelete = () => {
    if (!selectedUserId) return;
    onDeleteUser(selectedUserId);
    setShowConfirm(false);
    setSelectedUserId(null);
  };

  //3. cancel delete
  const cancelDelete = () => {
    setShowConfirm(false);
    setSelectedUserId(null);
  };

  return {
    selectedUserId,
    showConfirm,
    handleDeleteClick,
    confirmDelete,
    cancelDelete
  }
}
