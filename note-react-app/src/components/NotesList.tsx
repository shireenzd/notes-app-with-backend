import React from "react";
import Note from "./Note";
import { minHeight, minWidth } from "./shared/constants";
import { AnyARecord } from "dns";

function NotesList({
  notes,
  deleteNote,
  editNote,
  // sortNotesAsc,
  // sortNotesDesc,
  // selectedCategory,
  // handleCategoryChange,
  filteredNotes
}: {
  notes: Array<any>;
  deleteNote: Function;
  editNote: Function;
  // sortNotesAsc: Function;
  // sortNotesDesc: Function;
  // selectedCategory: string;
  // handleCategoryChange: Function;
  filteredNotes: any
}) {
  // const handleClickAsc: React.MouseEventHandler<HTMLParagraphElement> = (
  //   event
  // ) => {
  //   sortNotesAsc();
  // };
  // const handleClickDesc: React.MouseEventHandler<HTMLParagraphElement> = (
  //   event
  // ) => {
  //   sortNotesDesc();
  // };

  const sortingStyle={
    display:'flex',
    justifyContent:'space-around'
  }
 
  type CategoryColors = {
    [key: string]: string;
  };

  const categoryColors: CategoryColors = {
    home: '#FFC0CB',
    work: '#90EE90',
    hobbies: '#ADD8E6',
  };

  const getNoteColor = (category: string) => categoryColors[category] || 'pink';



  return (
    <div
      style={{ width: minWidth, height: minHeight }}
      className="NotesList flex flex-col gap-4 bg-white p-10 rounded-3xl shadow-xl overflow-y-auto"
    >
      <div style={sortingStyle}>
        <div>
        {/* <p onClick={handleClickAsc}><b>&uarr;</b></p>
        <p onClick={handleClickDesc}><b>&darr;</b></p> */}
        </div>
        <select >
          <option value="">All</option>
          <option value="home">Home</option>
          <option value="work">Work</option>
          <option value="hobbies">Hobbies</option>
        </select>
      </div>
      {filteredNotes.map((note:any) => {
          return (
            <div
              key={note.id}
              className="note-item"
              style={{ backgroundColor: categoryColors[note.category] }}
            >
        <Note key={note.id} note={note} deleteNote={deleteNote} editNote={editNote}  noteColor={getNoteColor(note.category)}/>
        </div>
      )}
      )}
      </div>
  )
}

export default NotesList;
