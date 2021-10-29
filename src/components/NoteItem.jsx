
import {useContext} from 'react';
import NoteContext from '../context/notes/noteContext';

const NoteItem = (props) => {

    const {note, updateNote} = props ;
    const context = useContext(NoteContext);
    const {deleteNote} = context;

    return (
        <div className="col-md-3">
        <div className="card my-2" >
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <h6 className="card-subtitle mb-2 ">{note.tag}</h6>
                <p className="card-text">{note.description}</p>
                <i onClick={()=> updateNote(note)} className="fas fa-edit mx-2"></i>
                <i onClick={()=> deleteNote(note._id)}  className="fas fa-minus-circle mx-2"></i>
            </div>
        </div>
        </div>

    )
}

export default NoteItem;
