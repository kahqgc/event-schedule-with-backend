import {useState} from 'react';

export default function useDeleteHandlers(onDeleteUser) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);


  //1. triggers when delete button is clicked
  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setShowConfirm(true);
  };

  //2. triggered when delete is clicked again (confirm delete)
  const confirmDelete = () => {
    if (!selectedUserId) return;
    onDeleteUser(selectedUserId);
    setShowConfirm(false);
    setSelectedUserId(null);
  };

  //3. triggered when cancel button is clicked
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
