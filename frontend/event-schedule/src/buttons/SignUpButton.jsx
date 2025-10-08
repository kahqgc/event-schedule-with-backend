import "./Button.css";

export default function SignUpButton({ handleSignUp }) {
  return (
    <button 
        type="button" 
        className="signup" 
        onClick={handleSignUp}>
      Sign Up
    </button>
  );
}