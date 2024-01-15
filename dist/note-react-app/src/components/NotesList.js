"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Note_1 = __importDefault(require("./Note"));
const constants_1 = require("./shared/constants");
function NotesList({ notes, deleteNote, editNote, 
// sortNotesAsc,
// sortNotesDesc,
// selectedCategory,
// handleCategoryChange,
filteredNotes }) {
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
    const sortingStyle = {
        display: 'flex',
        justifyContent: 'space-around'
    };
    const categoryColors = {
        home: '#FFC0CB',
        work: '#90EE90',
        hobbies: '#ADD8E6',
    };
    const getNoteColor = (category) => categoryColors[category] || 'pink';
    return (<div style={{ width: constants_1.minWidth, height: constants_1.minHeight }} className="NotesList flex flex-col gap-4 bg-white p-10 rounded-3xl shadow-xl overflow-y-auto">
      <div style={sortingStyle}>
        <div>
        {/* <p onClick={handleClickAsc}><b>&uarr;</b></p>
        <p onClick={handleClickDesc}><b>&darr;</b></p> */}
        </div>
        <select>
          <option value="">All</option>
          <option value="home">Home</option>
          <option value="work">Work</option>
          <option value="hobbies">Hobbies</option>
        </select>
      </div>
      {filteredNotes.map((note) => {
            return (<div key={note.id} className="note-item" style={{ backgroundColor: categoryColors[note.category] }}>
        <Note_1.default key={note.id} note={note} deleteNote={deleteNote} editNote={editNote} noteColor={getNoteColor(note.category)}/>
        </div>);
        })}
      </div>);
}
exports.default = NotesList;
