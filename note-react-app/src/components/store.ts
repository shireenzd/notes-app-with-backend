import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface NotesStore {
  token: string;
  setToken: (token: string) => void;
}


export const useNotesStore = create<NotesStore>(
  // @ts-ignore
  persist(
    (set) => ({
      token: "",
      setToken: (token: string) =>
        set((state) => ({
          token: token,
        })),
    }),
    {
      name: "notes-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);