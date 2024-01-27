"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNotesStore = void 0;
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
exports.useNotesStore = (0, zustand_1.create)(
// @ts-ignore
(0, middleware_1.persist)((set) => ({
    token: "",
    setToken: (token) => set((state) => ({
        token: token,
    })),
}), {
    name: "notes-storage",
    storage: (0, middleware_1.createJSONStorage)(() => localStorage),
}));
