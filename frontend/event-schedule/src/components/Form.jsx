import SaveButton from "../buttons/SaveButton";

export default function Form({
  handleSave,
  textArea,
  handleTextAreaChange,
  error,
  category,
  handleCategoryChange,
}) {
  return (
    <form>
      <label htmlFor="note">Note: </label>
      <textarea
        id="note" //connect label to text area
        value={textArea} // binds textArea state to the value of <textarea>, keeps content in text area when toggling between save and edit
        onChange={handleTextAreaChange}
        placeholder="Write your notes here"
      />

      <label htmlFor="category">What kind of reminder is this?</label>
      <select
        id="category" //connect label to dropdown
        value={
          category
        } /*keeps content in dropdown when toggling between save and edit*/
        onChange={handleCategoryChange}
      >
        <option value="" disabled>
          --Select a Category--
        </option>
        <option value="Packing Reminder">Packing Reminder</option>
        <option value="Past Experience">Past Experience</option>
        <option value="Schedule Concern">Schedule Concern</option>
        <option value="Other">Other:</option>
      </select>
      {error && <p className="error-message">{error}</p>}
      <SaveButton handleSave={handleSave} />
    </form>
  );
}
