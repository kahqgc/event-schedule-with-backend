import "./Button.css";

export default function SubmitButton() {
  return (
    <button
      type="submit" // allows this to react to the onSubmit event
      className="submit" >
      Submit
    </button>
  );
}
