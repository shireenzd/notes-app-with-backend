"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function Note({ note, editNote, deleteNote, noteColor }) {
    var _a, _b;
    return (<div className="flex gap-[19px]  bg-${noteColor} p-6 rounded-xl justify-between">
      <div className='flex flex-col'>
      <div className="overflow-hidden w-[50px] rounded-full">
        <img className="w-full" src={(_a = note.author) === null || _a === void 0 ? void 0 : _a.profile} alt="profile"/>
      </div>
        <p>{(_b = note.author) === null || _b === void 0 ? void 0 : _b.userName}</p>
        </div>
      <div className="text-start w-full">
        {note.content}
      </div>
      <div className="flex flex-col gap-4">
        <span onClick={() => editNote(note.id)} className="bg-blue-200 cursor-pointer rounded p-1">edit</span>
        <span onClick={() => deleteNote(note.id)} className="bg-red-500 cursor-pointer rounded p-1">delete</span>
      </div>
    </div>);
}
exports.default = Note;
