import "./Button.css";

export default function EditButton({ onClick }) {
    return (
        <button type="button" className="edit" onClick={onClick} >
            Edit
        </button>
    )
}

//reusable button component that triggers handleEdit when clicked