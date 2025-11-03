import SubmitButton from "../../../buttons/SubmitButton";
import BackButton from "../../../buttons/BackButton";
import "../styles/SignUpForm.css";
import validateSignUpForm from "../utils/validateSignUpForm";

export default function SignUpForm({
  onBack,
  activeEvent,
  signUpFormData,
  setSignUpFormData,
  error,
  setError,
  submitSignUpForm,
  onSuccess
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateSignUpForm(signUpFormData);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      await submitSignUpForm({ ...signUpFormData, eventTitle: activeEvent.title });
      onSuccess?.(); //closes form on success
    } catch (err){
      setError(err.message || "Error saving user, please try again.");
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
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
