import React, { useContext} from 'react'
import noteContext from '../contexts/noteContext';
import alertContext from '../contexts/alertContext';


const NoteItem = (props) => {
    const { note, updateNote} = props;

    const context = useContext(noteContext);
    const { deleteNote } = context;
 
    const contextAlert = useContext(alertContext);
    const {showAlert} = contextAlert;


  

    const handleDeleteNote = () => {
        if (window.confirm("Are you sure to delete the note?")){
            deleteNote(note._id);
            showAlert("The note was deleted Successfully!", "warning")
        }
    }

   

    // const handleEditNote = () => {
    //     showEditWindow();
    //     console.log("setting the state of " + note._id)
    //     console.log("Edit button presses");
    // }

 

    return (
        
        <div>
            

            <div className="card">
                
                <div className="card-header">
                    {note.tag}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="d-flex justify-content-around">
                        <i className="fa-solid fa-trash-can" onClick={handleDeleteNote}></i>
                        <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>

                    </div>

                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
        </div>
    )
}

export default NoteItem;