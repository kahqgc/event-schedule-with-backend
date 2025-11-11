import '../styles/ConfirmModal.css';


// confirmation modal used before deleting a registration
const ConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <p>Are you sure you want to delete this registration?</p>
        <div className="modal-buttons">
          <button className="cancel" onClick={onCancel}>Cancel</button>
          <button className="delete" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;