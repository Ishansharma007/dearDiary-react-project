
import { useContext, useEffect,useState , useRef } from 'react';
import { useHistory } from 'react-router-dom';
import NoteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(NoteContext);
    let history = useHistory();
    const { notes ,getNotes ,editNote } = context;
    

    useEffect(() => {
        if(localStorage.getItem("token")){
         getNotes()
        }
        else{
            history.push("/login");
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const refClose = useRef()

    const updateNote = (currentNote) => {

        ref.current.click();
        setNote({id: currentNote._id , etitle : currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    }
    
    const [note, setNote] = useState({
        id: "", 
        etitle: "",
        edescription: "",
        etag: ""
    });

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                    <input onChange={onChange} value={note.etitle} minLength={3} required name="etitle" type="text" className="form-control" id="etitle" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                    <input onChange={onChange} value={note.edescription} minLength={3} required name="edescription" type="text" className="form-control" id="edescription" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Tag</label>
                                    <input onChange={onChange} value={note.etag} minLength={3} required name="etag" type="text" className="form-control" id="etag" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length<3 } onClick={handleClick} type="button" className="btn btn-primary" > Update entry </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-2">
                <h4>| Your entries </h4>
                <div className="container mx-1">
                {notes.length===0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return <NoteItem note={note} updateNote={updateNote} key={note.id} />
                })}
            </div>
        </>
    )
}

export default Notes;



