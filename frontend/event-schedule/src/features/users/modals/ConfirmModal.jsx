import '../styles/ConfirmModal.css';


// confirmation modal used before deleting a registration
const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="edit" onClick={onCancel}>Cancel</button>
          <button className="cancel" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;