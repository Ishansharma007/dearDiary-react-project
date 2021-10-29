
import { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext';

const AddNote = () => {

    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({
        id: "",
        title: "",
        description: "",
        tag: ""
    });


    const handleClick = (e) => {
        
        e.preventDefault();
        addNote(note.title, note.description, note.tag);

        setNote({
            id: "",
            title: "",
            description: "",
            tag: ""
        });
    }

    const onChange = (e) => {
        
        setNote({...note, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <h4 className="my-3">| Add an entry </h4>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input onChange={onChange} value={note.title} minLength={3} required name ="title" type="text" className="form-control" id="title" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input onChange={onChange} value={note.description} minLength={3} required name ="description" type="text" className="form-control" id="description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Tag</label>
                    <input onChange={onChange} value={note.tag} minLength={3} required name ="tag" type="text" className="form-control" id="tag" />
                </div>
                <button disabled={note.title.length<3 || note.description.length<3 } type="submit" onClick={handleClick} className="btn btn-danger">Add entry</button>
            </form>
        </div>
    )
}

export default AddNote
