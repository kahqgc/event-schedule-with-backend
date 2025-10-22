export default function validateSignUpForm({ name, email, phone, tickets }) {

        /*Validation checks*/
    if (!name.trim() || !email.trim() || !phone.trim()) {
      return "Please fill out all fields!";
    }

    if (!email.includes("@") || !email.includes(".")) {
      return "Please enter a valid email.";
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      return "Please enter a valid 10-digit phone number";
    }
    if (tickets < 1 || tickets > 10) {
        return "Please select between 1 and 10.";
    }
    return null; // No errors
}