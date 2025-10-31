import "./Button.css";

export default function SubmitButton({label="Submit", type="submit", onClick}) {
  return (
    <button
      type={type} // allows this to react to the onSubmit event
      className="submit"
      onClick={onClick}
       >
      {label}
    </button>
  );
}
