import { useQueryClient } from "@tanstack/react-query";
import { characterKeys } from "./useCharacters";
import { getCharacter } from "../api/rickAndMortyApi";

export const useCharacterPrefetch = () => {
  const queryClient = useQueryClient();

  const prefetchCharacter = async (id: number) => {
    await queryClient.prefetchQuery({
      queryKey: characterKeys.detail(id),
      queryFn: () => getCharacter(id),
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  };

  return { prefetchCharacter };
}; 