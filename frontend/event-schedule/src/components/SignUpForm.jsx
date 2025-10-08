import SubmitButton from "../buttons/SubmitButton";
import BackButton from "../buttons/BackButton";
import "./SignUpForm.css";

export default function SignUpForm({
  onClose,
  onBack,
  handleSignUp,
  scheduledEvent,
  formData,
  setFormData,
  error,
  setError
}) {

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const {name, email, phone, tickets} = formData;

    /*Validation checks*/
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill out all fields!");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email.");
      return;
    }

    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    if (tickets <1 || tickets>10){
        setError("Please select between 1 and 10.");
        return;
    }

    handleSignUp({...scheduledEvent, ...formData})
};

  return (
    <div className="sign-up-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder="e.g. 000-000-0000"
            required
          />
        </label>
        <label>
            Number of Tickets:
            <input 
                type="number"
                value={formData.tickets}
                onChange={(e)=> setFormData({...formData, tickets: Number(e.target.value)})}
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
  )
};
