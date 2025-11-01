import {useState} from 'react';

export default function useDeleteHandlers(onDeleteUser) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);


  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (!selectedUserId) return;
    onDeleteUser(selectedUserId);
    setShowConfirm(false);
    setSelectedUserId(null);
  };

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
