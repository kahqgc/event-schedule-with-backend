import SubmitButton from "../buttons/SubmitButton";
import BackButton from "../buttons/BackButton";
import "./SignUpForm.css";
import validateSignUpForm from "./utils/validateSignUpForm";

export default function SignUpForm({
  onClose,
  onBack,
  scheduledEvent,
  formData,
  setFormData,
  error,
  setError,
  handleSignUp
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateSignUpForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      await handleSignUp({ ...formData, sessionTitle: scheduledEvent.title });
    } catch (err) {
      console.error("error saving user: ", err);
      setError("error saving user");
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
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </label>
        <label>
          Email:
          <input
            id="email"
            autoComplete="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
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
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
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
            value={formData.tickets}
            onChange={(e) =>
              setFormData({ ...formData, tickets: Number(e.target.value) })
            }
            min="1"
            max="10"
            required
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <div className="form-buttons">
          <SubmitButton />
          <BackButton onClick={onBack} />
        </div>
        <button type="button" className="X" onClick={onClose}>
          X
        </button>
      </form>
    </div>
  );
}
