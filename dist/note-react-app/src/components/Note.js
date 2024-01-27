"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function Note({ note, editNote, deleteNote, noteColor }) {
    return (react_1.default.createElement("div", { className: "flex gap-[19px]  bg-${noteColor} p-6 rounded-xl justify-between " },
        react_1.default.createElement("div", { className: "text-start w-full" }, note.content),
        react_1.default.createElement("div", { className: "flex flex-col gap-4" },
            react_1.default.createElement("span", { onClick: () => editNote(note.id), className: "bg-blue-200 cursor-pointer rounded p-1" }, "edit"),
            react_1.default.createElement("span", { onClick: () => deleteNote(note.id), className: "bg-red-500 cursor-pointer rounded p-1" }, "delete"))));
}
exports.default = Note;
