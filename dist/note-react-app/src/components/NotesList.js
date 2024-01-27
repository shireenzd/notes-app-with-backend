"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Note_1 = __importDefault(require("./Note"));
const constants_1 = require("./shared/constants");
function NotesList({ notes, deleteNote, editNote, sortNotesAsc, sortNotesDesc, selectedCategory, handleCategoryChange, filteredNotes }) {
    const handleClickAsc = (event) => {
        sortNotesAsc();
    };
    const handleClickDesc = (event) => {
        sortNotesDesc();
    };
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
    return (react_1.default.createElement("div", { style: { width: constants_1.minWidth, height: constants_1.minHeight }, className: "NotesList flex flex-col gap-4 bg-white p-10 rounded-3xl shadow-xl overflow-y-auto" },
        react_1.default.createElement("div", { style: sortingStyle },
            react_1.default.createElement("div", null,
                react_1.default.createElement("p", { onClick: handleClickAsc },
                    react_1.default.createElement("b", null, "\u2191")),
                react_1.default.createElement("p", { onClick: handleClickDesc },
                    react_1.default.createElement("b", null, "\u2193"))),
            react_1.default.createElement("select", null,
                react_1.default.createElement("option", { value: "" }, "All"),
                react_1.default.createElement("option", { value: "home" }, "Home"),
                react_1.default.createElement("option", { value: "work" }, "Work"),
                react_1.default.createElement("option", { value: "hobbies" }, "Hobbies"))),
        filteredNotes.map((note) => {
            return (react_1.default.createElement("div", { key: note.id, className: "note-item", style: { backgroundColor: categoryColors[note.category] } },
                react_1.default.createElement(Note_1.default, { key: note.id, note: note, deleteNote: deleteNote, editNote: editNote, noteColor: getNoteColor(note.category) })));
        })));
}
exports.default = NotesList;
