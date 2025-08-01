import axios from "axios";
import { 
  GET_CHARACTERS_QUERY, 
  GET_CHARACTER_QUERY, 
  createMultipleCharactersQuery 
} from "./queries";

const GRAPHQL_API = "https://rickandmortyapi.com/graphql";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    dimension?: string;
  };
  location: {
    name: string;
    dimension?: string;
  };
  image: string;
  episode: Episode[];
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date?: string;
  episode: string;
}

export interface Info {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface CharacterResponse {
  characters: {
    info: Info;
    results: Character[];
  };
}

export interface SingleCharacterResponse {
  character: Character;
}

export type CharacterFilters = {
  name?: string;
  status?: "alive" | "dead" | "unknown";
  species?: string;
  type?: string;
  gender?: "female" | "male" | "genderless" | "unknown";
};

export const graphqlClient = axios.create({
  baseURL: GRAPHQL_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCharacters = async (
  page = 1,
  filters?: CharacterFilters
): Promise<CharacterResponse["characters"]> => {
  try {
    const response = await graphqlClient.post("", {
      query: GET_CHARACTERS_QUERY,
      variables: {
        page,
        filter: filters,
      },
    });

    if (response.data.errors) {
      const errorMessage = response.data.errors
        .map((e: { message: string }) => e.message)
        .join(", ");
      throw new Error(`GraphQL error: ${errorMessage}`);
    }

    return response.data.data.characters;
  } catch (error) {
    console.error("Failed to fetch characters:", error);
    throw error;
  }
};

export const getCharacter = async (id: number): Promise<Character> => {
  try {
    const response = await graphqlClient.post("", {
      query: GET_CHARACTER_QUERY,
      variables: {
        id,
      },
    });

    if (response.data.errors) {
      const errorMessage = response.data.errors
        .map((e: { message: string }) => e.message)
        .join(", ");
      throw new Error(`GraphQL error: ${errorMessage}`);
    }

    if (!response.data.data.character) {
      throw new Error(`Character with ID ${id} not found`);
    }

    return response.data.data.character;
  } catch (error) {
    console.error(`Failed to fetch character with ID ${id}:`, error);
    throw error;
  }
};

export const getMultipleCharacters = async (
  ids: number[]
): Promise<Character[]> => {
  if (ids.length === 0) return [];

  try {
    const GET_MULTIPLE_CHARACTERS_QUERY = createMultipleCharactersQuery(ids);

    const response = await graphqlClient.post("", {
      query: GET_MULTIPLE_CHARACTERS_QUERY,
    });

    if (response.data.errors) {
      const errorMessage = response.data.errors
        .map((e: { message: string }) => e.message)
        .join(", ");
      throw new Error(`GraphQL error: ${errorMessage}`);
    }

    const characters = ids
      .map((id) => response.data.data[`character${id}`])
      .filter((character): character is Character => character !== null);

    if (characters.length === 0) {
      console.warn("No characters found with the provided IDs");
    }

    return characters;
  } catch (error) {
    console.error("Failed to fetch multiple characters:", error);
    throw error;
  }
};
