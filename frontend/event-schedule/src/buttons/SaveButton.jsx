import "./Button.css";

export default function SaveButton({ handleSave }) {
  return (
    <button type="submit" className="save" onClick={handleSave}>
      Save Note
    </button>
  );
}


//reusable button component that triggers handle save when clicked