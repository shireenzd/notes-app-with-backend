"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const constants_1 = require("./shared/constants");
function AddNoteForm({ addNote, noteBeingEdited }) {
    const [noteContent, setNoteContent] = (0, react_1.useState)('');
    const [notePriority, setNotePriority] = (0, react_1.useState)('');
    const [noteCategory, setNoteCategory] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        if (noteBeingEdited) {
            setNoteContent(noteBeingEdited.content || '');
            setNotePriority(noteBeingEdited.priority || '');
            setNoteCategory(noteBeingEdited.category || '');
        }
    }, [noteBeingEdited]);
    const handleContentChange = (event) => {
        setNoteContent(event.target.value);
    };
    const handlePriorityChange = (event) => {
        // Parse the value as an integer or keep it as an empty string
        setNotePriority(event.target.value === '' ? '' : parseInt(event.target.value, 10));
    };
    const handleCategoryChange = (event) => {
        setNoteCategory(event.target.value);
    };
    const handleSubmit = () => {
        const newNote = {
            content: noteContent,
            priority: notePriority,
            category: noteCategory,
        };
        addNote(newNote);
        // Clear form fields after submitting the note
        setNoteContent('');
        setNotePriority('');
        setNoteCategory('');
    };
    return (<form style={{ width: constants_1.minWidth, height: constants_1.minHeight }} className="Form flex flex-col gap-4 bg-white p-10 rounded-3xl shadow-xl">
      <div className="flex flex-col text-start">
        <label htmlFor="note-content">Content</label>
        <textarea className="border-[1px] p-2 rounded border-black" name="note-content" id="note-content" onChange={handleContentChange} value={noteContent}></textarea>
      </div>
      <div className="flex flex-col text-start">
        <label htmlFor="note-priority">Priority</label>
        {[1, 2, 3, 4, 5].map((priority) => {
            return (<span key={priority} className="flex gap-4 items-center">
              <input type="radio" name="priority" id={priority.toString()} // Convert priority to string for IDs
             value={priority} checked={notePriority === priority} onChange={handlePriorityChange}/>
              <label htmlFor={priority.toString()}>{priority}</label>
            </span>);
        })}
      </div>

      <div className="flex flex-col justify-start text-start">
        <label htmlFor="note-category">Category</label>
        <select name="note-category" id="note-category" onChange={handleCategoryChange} value={noteCategory}>
          <option value="">Select Category</option>
          <option value="home">home</option>
          <option value="hobbies">hobbies</option>
          <option value="work">work</option>
        </select>
      </div>

      <button type="button" className="bg-green-300" onClick={handleSubmit}>
  {noteBeingEdited && 'id' in noteBeingEdited ? 'Edit Note' : 'Add Note'}
    </button>

    </form>);
}
exports.default = AddNoteForm;
