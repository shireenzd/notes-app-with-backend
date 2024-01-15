import React, { useState ,useEffect} from "react";
import "./App.css";
import NotesList from "./components/NotesList";
import AddNoteForm from "./components/AddNoteForm";
const { v4: uuidv4 } = require('uuid');

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: "Buy groceries",
      priority: 2,
      category: "home",
      // author: {
      //   userName: "shireen",
      //   profile:"/profile-pic.webp"
      // },
    },
    {
      id: 2,
      content: "Note 2",
      priority: 1,
      category: "hobbies",
      // author: {
      //   userName: "shireen",
      //   profile:"/profile-pic.webp"
      // },
    },
  ]);

  const [noteBeingEdited, setNoteBeingEdited] = useState({});


  useEffect(()=>{
    const fetchNotes =async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes")
        const notes = await response.json()
        setNotes(notes)
        console.log("restored")
      } catch (error) {
        console.log(error)
      }
    }
    fetchNotes()
  },[])

  async function addNote(note:any) {
    try {
      // Validate the note object
      if (!note || !note.content || !note.priority || !note.category) {
        console.error('Invalid note object:', note);
        return;
      }
  
      const response = await fetch("http://localhost:5000/api/notes/create", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
});
  
      if (response.ok) {
        const newNote = await response.json();
        setNotes((prevNotes) => [...prevNotes, newNote]);
        console.log("added note");
      } else {
        console.error('Error adding the note:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
  

 

  async function editNote(noteID: number) {
    try {
      // Find the note to edit in the current notes state
      let noteToEdit = notes.find((note) => note.id === noteID);
  
      // If the note is found, send a PUT request to update it
      if (noteToEdit) {
        const response = await fetch(`http://localhost:5000/api/notes/${noteID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Provide updated fields here, for example:
            content: 'Updated content',
            priority: 'Updated priority',
            category: 'Updated category',
          }),
        });
  
        if (response.ok) {
          // If the update request is successful, update the state
          const updatedNotes = notes.map((note) =>
            note.id === noteID ? { ...note, content: 'Updated content', priority:  Number('Updated priority'), category: 'Updated category' } : note
          );
          setNotes(updatedNotes);
          console.log('Note updated successfully');
        } else {
          console.error('Error updating note:', response.status, response.statusText);
        }
      } else {
        console.error('Note not found for editing');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
  

  async function deleteNote(noteID: number) {
    try {
      // Send a DELETE request to delete the note
      const response = await fetch(`http://localhost:5000/api/note/${noteID}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // If the delete request is successful, update the state and local storage
        const updatedNotes = notes.filter((note: any) => note.id !== noteID);
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        console.log('Note deleted successfully');
      } else {
        console.error('Error deleting the note:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
  
  
  

  // function sortNotesAsc() {
  //   const sortedNotes = [...notes];
  
  //   sortedNotes.sort((a, b) => {
  //     // Extract numerical parts of priority and compare
  //     const priorityA = parseInt(a.priority.split('-')[1]);
  //     const priorityB = parseInt(b.priority.split('-')[1]);
  
  //     return priorityA - priorityB;
  //   });
  
  //   setNotes(sortedNotes);
  // }
  
  // function sortNotesDesc() {
  //   const sortedNotes = [...notes];
  
  //   sortedNotes.sort((a, b) => {
  //     // Extract numerical parts of priority and compare
  //     const priorityA = parseInt(a.priority.split('-')[1]);
  //     const priorityB = parseInt(b.priority.split('-')[1]);
  
  //     return priorityB - priorityA;
  //   });
  
  //   setNotes(sortedNotes);
  // }

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event:any) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
  };


  const filteredNotes = selectedCategory
    ? notes.filter((note) => note.category === selectedCategory)
    : notes;


   
  return (
    <div className="App flex justify-center items-center h-screen gap-[2rem] bg-[var(--accent-light)]">
      <NotesList
        deleteNote={deleteNote}
        editNote={editNote}
        notes={notes}
        // sortNotesAsc={sortNotesAsc}
        // sortNotesDesc={sortNotesDesc} selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} 
        filteredNotes={filteredNotes}   
           />
      <AddNoteForm noteBeingEdited={noteBeingEdited} addNote={addNote}/>
    </div>
  );
  }

export default App;
