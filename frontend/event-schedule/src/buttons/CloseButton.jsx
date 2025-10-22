import "./Button.css";

export default function CloseButton({ onClick }) {
  return (
    <button className="close" onClick={onClick}>
      X
    </button>
  );
}
