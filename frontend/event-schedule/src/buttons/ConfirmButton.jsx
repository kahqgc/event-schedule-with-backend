import "./Button.css";

export default function ConfirmButton({ onClick, loading }) {
  return (
    <button
      type="button"
      className="confirm"
      onClick={onClick}
    >
      {loading ? "Saving..." : "Confirm All"}
    </button>
  );
}