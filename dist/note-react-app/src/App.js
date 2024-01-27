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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./App.css");
const NotesList_1 = __importDefault(require("./components/NotesList"));
const AddNoteForm_1 = __importDefault(require("./components/AddNoteForm"));
const Register_1 = __importDefault(require("./components/Register"));
const store_1 = require("./components/store");
function App() {
    const [notes, setNotes] = (0, react_1.useState)([
        {
            id: 1,
            content: "Buy groceries",
            priority: 2,
            category: "home",
        }
    ]);
    const [noteBeingEdited, setNoteBeingEdited] = (0, react_1.useState)({});
    const { token, } = (0, store_1.useNotesStore)();
    (0, react_1.useEffect)(() => {
        const fetchNotes = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("http://localhost:5000/api/notes", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const notes = yield response.json();
                setNotes(notes);
                console.log("restored");
            }
            catch (error) {
                console.log(error);
            }
        });
        fetchNotes();
    }, []);
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
    function addNote(note) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate the note object
                if (!note || !note.content || !note.priority || !note.category) {
                    console.error('Invalid note object:', note);
                    return;
                }
                if ('id' in note && note.id) {
                    editNote(note.id, note);
                }
                else {
                    console.log('Token:', token);
                    if (!token) {
                        console.error('Token not available!');
                        return;
                    }
                    const response = yield fetch("http://localhost:5000/api/notes/create", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify(note),
                    });
                    setNoteBeingEdited({});
                    if (response.ok) {
                        const newNote = yield response.json();
                        setNotes((prevNotes) => [...prevNotes, newNote]);
                        console.log("added note");
                    }
                    else {
                        console.error('Error adding the note:', response.status, response.statusText);
                    }
                }
            }
            catch (error) {
                console.error('Fetch error:', error);
            }
        });
    }
    function editNote(noteID, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`http://localhost:5000/api/notes/${noteID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(Object.assign(Object.assign({}, updatedData), { id: noteID })),
                });
                if (response.ok) {
                    const updatedNote = yield response.json();
                    const updatedNotes = notes.filter((note) => note.id !== noteID);
                    setNotes(updatedNotes);
                    setNoteBeingEdited(updatedNote);
                    console.log('Note updated successfully');
                }
                else {
                    console.error('Error updating note:', response.status, response.statusText);
                }
            }
            catch (error) {
                console.error('Fetch error:', error);
            }
        });
    }
    function deleteNote(noteID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`http://localhost:5000/api/note/${noteID}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    const updatedNotes = notes.filter((note) => note.id !== noteID);
                    setNotes(updatedNotes);
                    localStorage.setItem('notes', JSON.stringify(updatedNotes));
                    console.log('Note deleted successfully');
                }
                else {
                    console.error('Error deleting the note:', response.status, response.statusText);
                }
            }
            catch (error) {
                console.error('Fetch error:', error);
            }
        });
    }
    const fetchNotes = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:5000/api/notes");
            const notes = yield response.json();
            setNotes(notes);
            console.log("Notes updated");
        }
        catch (error) {
            console.log(error);
        }
    });
    const handleNoteFormSubmit = (editedNote) => __awaiter(this, void 0, void 0, function* () {
        if ('id' in noteBeingEdited) {
            yield editNote(noteBeingEdited.id, editedNote);
            setNoteBeingEdited({});
            fetchNotes();
        }
        else {
            addNote(editedNote);
        }
    });
    function sortNotesAsc() {
        const sortedNotes = [...notes];
        sortedNotes.sort((a, b) => {
            return a - b;
        });
        setNotes(sortedNotes);
    }
    function sortNotesDesc() {
        const sortedNotes = [...notes];
        sortedNotes.sort((a, b) => {
            return b - a;
        });
        setNotes(sortedNotes);
    }
    const [selectedCategory, setSelectedCategory] = (0, react_1.useState)('');
    const handleCategoryChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCategory(selectedValue);
    };
    const filteredNotes = selectedCategory
        ? notes.filter((note) => note.category === selectedCategory)
        : notes;
    return (react_1.default.createElement(react_1.default.Fragment, null, token ? (react_1.default.createElement("div", { className: "App flex justify-center items-center h-screen gap-[2rem] bg-[var(--accent-light)]" },
        react_1.default.createElement(NotesList_1.default, { deleteNote: deleteNote, editNote: editNote, notes: notes, sortNotesAsc: sortNotesAsc, sortNotesDesc: sortNotesDesc, selectedCategory: selectedCategory, handleCategoryChange: handleCategoryChange, filteredNotes: filteredNotes }),
        react_1.default.createElement(AddNoteForm_1.default, { noteBeingEdited: noteBeingEdited, addNote: handleNoteFormSubmit })))
        :
            (react_1.default.createElement("div", null,
                react_1.default.createElement(Register_1.default, null)))));
}
exports.default = App;
