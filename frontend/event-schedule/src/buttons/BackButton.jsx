import "./Button.css";

export default function BackButton({ onClick }) {
  return (
    <button className="back" type="button" onClick={onClick}>
      Back
    </button>
  );
}