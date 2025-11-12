import SubmitButton from "../../../buttons/SubmitButton";
import BackButton from "../../../buttons/BackButton";
import "../styles/SignUpForm.css";
import validateSignUpForm from "../utils/validateSignUpForm";

/* THE SIGN UP FORM
- lets  users register for a selected event or edit an existing registration
- collects name, email, phone, and ticket count
- when submitted, it validates the input and calls saveSignUp from parent
*/

export default function SignUpForm({
  onBack, // called when user hits back button
  activeEvent, //current event user is signing up for
  signUpFormData, //current form state (name, email, phone, tickets)
  setSignUpFormData,
  error,
  setError,
  saveSignUp, //function from useScheduleFlow to create or update user
  onSuccess, //called when submission succeeds
}) {


  // handles when user clicks submit on form
  const handleSubmit = async (err) => {
    err.preventDefault(); // prevent page reload
    setError(""); // clear any previous

    // 1. validate user input
    const validationError = validateSignUpForm(signUpFormData);
    if (validationError) {
      setError(validationError);
      return; // stop if validation fails
    }
    try {
      const signUpFormWithEvent = {
        ...signUpFormData,
        eventTitle: activeEvent.title,
      };
      //2. if validation passes, pause here until saveSignUp (logic) sends data to backend
      await saveSignUp(signUpFormWithEvent);
      //3. if submission succeeds, call onSuccess to close form
      onSuccess && onSuccess(signUpFormWithEvent);
    } catch (err) {
      setError(err.message || "Error saving registration, please try again.");
    }
  };

  return (
    <div className="sign-up-form">
      <h2>{signUpFormData.id ? "Edit Registration" : "Sign Up"}</h2>
      <form id="sign-up-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            id="name"
            autoComplete="name"
            type="text"
            value={signUpFormData.name}
            onChange={(e) =>
              setSignUpFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
        </label>
        <label>
          Email:
          <input
            id="email"
            autoComplete="email"
            type="email"
            value={signUpFormData.email}
            onChange={(e) =>
              setSignUpFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            id="phone"
            autoComplete="tel"
            type="tel"
            value={signUpFormData.phone}
            onChange={(e) =>
              setSignUpFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            placeholder="e.g. 000-000-0000"
            required
          />
        </label>
        <label>
          Number of Tickets:
          <input
            id="tickets"
            autoComplete="tickets"
            type="number"
            value={signUpFormData.tickets}
            onChange={(e) =>
              setSignUpFormData((prev) => ({...prev, tickets: Number(e.target.value) }))
            }
            min="1"
            max="10"
            required
          />
        </label>
        <div className="form-buttons">
          <SubmitButton label="Submit" type="submit" />
          <BackButton onClick={onBack} />
        </div>
      </form>
      {/*if there is an error, show it below the form*/}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
