import SubmitButton from "../../../buttons/SubmitButton";
import BackButton from "../../../buttons/BackButton";
import "../styles/SignUpForm.css";
import validateSignUpForm from "../utils/validateSignUpForm";


/* THE SIGN UP FORM
- lets  users register for a selected event or edit an existing registration
- collects name, email, phone, and ticket count
- when submitted, it validates the input and calls submitSignUpForm from parent
*/

export default function SignUpForm({
  onBack,// called when user hits back button
  activeEvent, //current event user is signing up for
  signUpFormData, //current form state (name, email, phone, tickets)
  setSignUpFormData,
  error,
  setError,
  submitSignUpForm, //function from useScheduleFlow to create or update user
  onSuccess //called when submission succeeds
}) {
  // handles when user clicks submit on form
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    setError(""); // clear any previous 

    // 1. validate user input
    const validationError = validateSignUpForm(signUpFormData);
    if (validationError) {
      setError(validationError);
      return; // stop if validation fails
    }
    try {
      //2. if validation passes, pause here until submitSignUpForm sends data to backend
      await submitSignUpForm({ ...signUpFormData, eventTitle: activeEvent.title });

      //3. if submission works, close the form and show confirmation
      onSuccess(); //only runs if onSuccess was passed in
    } catch (err){
      setError(err.message || "Error saving registration, please try again.");
    }
  };

  return (
    <div className="sign-up-form">
      <h2>Sign Up</h2>
      <form id="sign-up-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            id="name"
            autoComplete="name"
            type="text"
            value={signUpFormData.name}
            onChange={(e) => setSignUpFormData({ ...signUpFormData, name: e.target.value })}
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
              setSignUpFormData({ ...signUpFormData, email: e.target.value })
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
              setSignUpFormData({ ...signUpFormData, phone: e.target.value })
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
              setSignUpFormData({ ...signUpFormData, tickets: Number(e.target.value) })
            }
            min="1"
            max="10"
            required
          />
        </label>
        <div className="form-buttons">
          <SubmitButton label="Submit" type="submit"/>
          <BackButton onClick={onBack} />
        </div>
      </form>
      {/*if there is an error, show it below the form*/}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
