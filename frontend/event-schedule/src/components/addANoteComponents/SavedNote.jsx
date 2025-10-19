import EditButton from "../../buttons/EditButton"

export default function SavedNote({ savedNote, category, handleEdit }){

    return(
           (<div className="saved-note" >
                            <p><strong>Note:</strong>{savedNote}</p> 
                            <p><strong>Reminder Type:</strong>{category}</p>
                            <EditButton onClick={handleEdit} />
                        </div>)
                    )}