import {useState } from "react";

import noteContext from "./noteContext";

const NoteState = (props) =>{
    const host = "http://localhost:5000";
    const intialNotes = [ {
      "_id": "64a2626beb48e2ea4fd88f19",
      "userId": "648940a9cfa2745c2423c8c1",
      "title": "MyTitle3",
      "description": "Mydescription",
      "tag": "general",
      "date": "2023-07-03T05:53:47.699Z",
      "__v": 0
    }];
    const [notes, setNotes] = useState(intialNotes);

    const fetchAllNotes = async () =>{
         //API call
         const url = host + "/api/notes/all-notes";
         const response = await fetch(url, {
             method: "GET",
             headers: {
               "Content-Type": "application/json",
               "auth-token": localStorage.getItem('authToken')
             }
          });
        const fnotes = await response.json(); // parses JSON response into native JavaScript objects
        setNotes(notes.concat(fnotes))
    }

    const addNote = async (title, description, tag) =>{
        //API call
        const url = host + "/api/notes/note";
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('authToken')
            },
            body: JSON.stringify({"title": title, "description": description, "tag": tag}), // body data type must match "Content-Type" header
          });

          const mynote = await response.json();
          setNotes(notes.concat(mynote));
    }
    const deleteNote = async (id) =>{
            //API call
            const url = host + "/api/notes/note/" + id;
            await fetch(url, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem('authToken')
                } });
        const updatedNotes = notes.filter((note)=>{ return note._id !== id});
        setNotes(updatedNotes);
    }
    const editNote = async (id, title, tag, description) =>{
        
        //API call
        const url = host + "/api/notes/note/" + id;
        await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('authToken')
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({"title": title, "description": description, "tag": tag}), // body data type must match "Content-Type" header
          });
        
          //changing note on the cliet side
        for (let index = 0; index < notes.length; index++) {
            const note = notes[index];
            if(note._id === id){
                notes[index].title = title;
                notes[index].tag = tag;
                notes[index].description = description;
            }
        }
        const newNotes = JSON.parse(JSON.stringify(notes));
        setNotes(newNotes);
    }

    return(
        <noteContext.Provider value = {{notes, addNote, deleteNote, editNote, fetchAllNotes}}>
            {props.children}
        </noteContext.Provider>
    )   
}

export default NoteState;
