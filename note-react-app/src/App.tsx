import React, { useState ,useEffect} from "react";
import "./App.css";
import NotesList from "./components/NotesList";
import AddNoteForm from "./components/AddNoteForm";
import Register from "./components/Register";

interface Note {
  id: number;
  content: string;
  priority: number;
  category: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([
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

  const [noteBeingEdited, setNoteBeingEdited] = useState<Note | {}>({});


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

  async function addNote(note: Note) {
    try {
      // Validate the note object
      if (!note || !note.content || !note.priority || !note.category) {
        console.error('Invalid note object:', note);
        return;
      }
  
      if ('id' in note && note.id) {
        // If the note has an ID, it means it's an existing note, so perform an edit
        editNote(note.id, note);
      } else {
        // If there's no ID, it's a new note, so add it
        const response = await fetch("http://localhost:5000/api/notes/create", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(note),
        });
        setNoteBeingEdited({});
  
        if (response.ok) {
          const newNote = await response.json();
          setNotes((prevNotes) => [...prevNotes, newNote]);
          console.log("added note");
        } else {
          console.error('Error adding the note:', response.status, response.statusText);
        }
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
  
  

 

  async function editNote(noteID: number, updatedData: any) {
    try {
      // Send a PUT request to update the note on the server, including the ID
      const response = await fetch(`http://localhost:5000/api/notes/${noteID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updatedData,
          id: noteID, // Add the ID to the request body
        }),
      });
  
      if (response.ok) {
        // If the update request is successful, update the local state
        const updatedNote = await response.json();
  
        // Remove the edited note from the list
        const updatedNotes = notes.filter((note: any) => note.id !== noteID);
        setNotes(updatedNotes);
  
        // Set the edited note as the noteBeingEdited
        setNoteBeingEdited(updatedNote);
  
        console.log('Note updated successfully');
      } else {
        console.error('Error updating note:', response.status, response.statusText);
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
  
  
  function handleNoteFormSubmit(editedNote: Note) {
    if ('id' in noteBeingEdited) {
      // If the edited note has an ID, it means it already exists, so update it
      editNote(noteBeingEdited.id, editedNote);
      addNote( editedNote)
      setNoteBeingEdited({});
    } else {
      // If there's no ID, it's a new note, so add it
      addNote(editedNote);
    }
    // Clear the noteBeingEdited state
    
  }
  
  
  
  

  function sortNotesAsc() {
    const sortedNotes = [...notes];
  
    sortedNotes.sort((a:any , b:any) => {
  
      return a - b;
    });
  
    setNotes(sortedNotes);
  }
  
  function sortNotesDesc() {
    const sortedNotes = [...notes];
  
    sortedNotes.sort((a:any, b:any) => {
      return b - a;
    });
  
    setNotes(sortedNotes);
  }

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event:any) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
  };


  const filteredNotes = selectedCategory
    ? notes.filter((note) => note.category === selectedCategory)
    : notes;


   
  return (
    <>
    <div className="App flex justify-center items-center h-screen gap-[2rem] bg-[var(--accent-light)]">
      <NotesList
        deleteNote={deleteNote}
        editNote={editNote}
        notes={notes}
        sortNotesAsc={sortNotesAsc}
        sortNotesDesc={sortNotesDesc} selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} 
        filteredNotes={filteredNotes}   
           />
      <AddNoteForm noteBeingEdited={noteBeingEdited} addNote={handleNoteFormSubmit} />
    </div>
    <div>
      <Register/>
    </div>
    </>
  );
  }

export default App;
