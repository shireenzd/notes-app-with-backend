"use strict";
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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT;
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/api/notes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield prisma.note.findMany();
        res.json(notes);
    }
    catch (error) {
        res
            .status(500)
            .send("something went wrong");
    }
}));
app.post('/api/notes/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, priority, category } = req.body;
        if (!content || !priority || !category) {
            throw new Error('Request missing needed data!');
        }
        const note = yield prisma.note.create({
            data: {
                content: content,
                priority: priority,
                category: category
            }
        });
        res.json(note);
    }
    catch (error) {
        console.error('Error creating note:', error);
        res
            .status(500)
            .send("something went wrong");
    }
}));
app.put('/api/notes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, priority, category } = req.body;
    const id = parseInt(req.params.id);
    if (!id || isNaN(id)) {
        return res
            .status(400)
            .send("id must be valid");
    }
    try {
        const updatedNote = yield prisma.note.update({
            where: { id },
            data: {
                content: content,
                priority: priority,
                category: category
            }
        });
        res.json(updatedNote);
    }
    catch (error) {
        res
            .status(500)
            .send("something went wrong");
    }
}));
app.delete('/api/note/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (!id || isNaN(id)) {
        res
            .status(400)
            .send("id must be valid");
    }
    try {
        yield prisma.note.delete({
            where: { id }
        });
        res.status(204).send();
    }
    catch (error) {
        res
            .status(500)
            .send("something went wrong");
    }
}));
app.listen(PORT, () => {
    console.log(`server running on localhost:${PORT}`);
});