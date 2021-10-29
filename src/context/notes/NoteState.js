
import { useState,useContext } from "react";

import NoteContext from "./noteContext";
import alertContext from "../alerts/alertContext";

const NoteState = (props) => {

    const context = useContext(alertContext);
    const { showAlert } = context;
    

    const host = "http://localhost:8000";
    const initialNotes = [];
    const [notes, setNotes] = useState(initialNotes);


     //Api call to get all notes
 
     const getNotes = async () => {

     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    });

    const allNotes = await response.json(); // parses JSON response into native JavaScript objects
    setNotes(allNotes);    
    }

    //Add new note

    const addNote = async (title, description, tag) => {
        

        //Api call

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });

        const json = await response.json(); // parses JSON response into native JavaScript objects

        console.log(json); 
        
        setNotes(notes.concat(json));

        showAlert("Added note successfully", "success")

    }

    //Edit notes

    const editNote = async (id, title, description, tag) => {

        //Api call

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });

       const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));
        // loop logic to edit notes

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (newNotes[index]._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
        showAlert("Updated note successfully", "success")
    }



    //Delete notes

    const deleteNote = async (id) => {

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        console.log(`Note with Id ${id} has been deleted`);
        let newNotes = notes.filter((note) => {
            return id !== note._id
        });
        setNotes(newNotes);
        console.log(response);
        showAlert("Deleted note successfully", "danger")
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;