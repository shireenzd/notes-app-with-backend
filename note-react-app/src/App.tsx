import React, { useState, useEffect } from "react";
import "./App.css";
import NotesList from "./components/NotesList";
import AddNoteForm from "./components/AddNoteForm";
import Register from "./components/Register";
import { useNotesStore } from "./components/store";

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
    }
  ]);

  const [noteBeingEdited, setNoteBeingEdited] = useState<Note | {}>({});
  const {
    token,
  } = useNotesStore()



  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const notes = await response.json()
        setNotes(notes)
        console.log("restored")
      } catch (error) {
        console.log(error)
      }
    }
    fetchNotes()
  }, [])


  // useEffect(() => {
  //   const fetchToken = async () => {
  //     try {
  //       // Perform user login (replace with your actual login logic)
  //       const response = await fetch("http://localhost:5000/api/login", {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           username: 'exampleUser',
  //           password: 'examplePassword',
  //         }),
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log(data)
  //         setToken(data.token); // Assuming your token is in the 'token' property of the response
  //         console.log(data)
  //       } else {
  //         console.error('Login failed:', response.status, response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching token:', error);
  //     }
  //   };

  //   fetchToken();
  // }, []);


  async function addNote(note: Note) {
    try {
      // Validate the note object
      if (!note || !note.content || !note.priority || !note.category) {
        console.error('Invalid note object:', note);
        return;
      }

      if ('id' in note && note.id) {
        editNote(note.id, note);
      } else {
        console.log('Token:', token);

        if (!token) {
          console.error('Token not available!');
          return;
        }
        const response = await fetch("http://localhost:5000/api/notes/create", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
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

      const response = await fetch(`http://localhost:5000/api/notes/${noteID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updatedData,
          id: noteID,
        }),
      });

      if (response.ok) {

        const updatedNote = await response.json();

        const updatedNotes = notes.filter((note: any) => note.id !== noteID);
        setNotes(updatedNotes);
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
      const response = await fetch(`http://localhost:5000/api/note/${noteID}`, {
        method: 'DELETE',
      });

      if (response.ok) {

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


  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/notes");
      const notes = await response.json();
      setNotes(notes);
      console.log("Notes updated");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNoteFormSubmit = async (editedNote: Note) => {
    if ('id' in noteBeingEdited) {
      await editNote(noteBeingEdited.id, editedNote);
      setNoteBeingEdited({});
      fetchNotes()

    } else {
      addNote(editedNote);
    }
  };


  function sortNotesAsc() {
    const sortedNotes = [...notes];

    sortedNotes.sort((a: any, b: any) => {

      return a - b;
    });

    setNotes(sortedNotes);
  }

  function sortNotesDesc() {
    const sortedNotes = [...notes];

    sortedNotes.sort((a: any, b: any) => {
      return b - a;
    });

    setNotes(sortedNotes);
  }

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event: any) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
  };


  const filteredNotes = selectedCategory
    ? notes.filter((note) => note.category === selectedCategory)
    : notes;



  return (
    <>
      {token ? (
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
        </div>)
        :
        (<div>
          <Register />
        </div>)
      }
    </>
  );
}

export default App;
