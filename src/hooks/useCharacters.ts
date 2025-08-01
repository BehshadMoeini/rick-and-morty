import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getCharacters,
  getCharacter,
  getMultipleCharacters,
} from "../api/rickAndMortyApi";
import type { Character, CharacterFilters } from "../api/rickAndMortyApi";

export const characterKeys = {
  all: ["characters"] as const,
  lists: () => [...characterKeys.all, "list"] as const,
  list: (filters: CharacterFilters | undefined) =>
    [...characterKeys.lists(), { filters }] as const,
  details: () => [...characterKeys.all, "detail"] as const,
  detail: (id: number) => [...characterKeys.details(), id] as const,
  multiple: (ids: number[]) => [...characterKeys.all, "multiple", ids] as const,
};

export const useCharacters = (filters?: CharacterFilters) => {
  return useInfiniteQuery({
    queryKey: characterKeys.list(filters),
    queryFn: ({ pageParam = 1 }) => getCharacters(pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.info.next || undefined;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes("not found")) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useCharacter = (id: number) => {
  return useQuery({
    queryKey: characterKeys.detail(id),
    queryFn: () => getCharacter(id),
    enabled: !!id && id > 0,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes("not found")) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useMultipleCharacters = (ids: number[]) => {
  return useQuery({
    queryKey: characterKeys.multiple(ids),
    queryFn: () => getMultipleCharacters(ids),
    enabled: ids.length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: (failureCount) => {
      return failureCount < 2;
    },
  });
};

export const flattenCharactersResults = (
  data:
    | {
        pages: {
          results: Character[];
        }[];
      }
    | undefined
): Character[] => {
  return data?.pages?.flatMap((page) => page.results) || [];
};
