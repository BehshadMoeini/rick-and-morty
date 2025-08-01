import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Character } from "../api/rickAndMortyApi";

interface FavoritesState {
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (character) => {
        set((state) => ({
          favorites: [...state.favorites, character],
        }));
      },

      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((char) => char.id !== id),
        }));
      },

      isFavorite: (id) => {
        return get().favorites.some((char) => char.id === id);
      },
    }),
    {
      name: "rick-and-morty-favorites",
    }
  )
);
