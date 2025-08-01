import { gql } from "graphql-request";

export const CHARACTER_FIELDS_FRAGMENT = gql`
  fragment CharacterFields on Character {
    id
    name
    status
    species
    type
    gender
    origin {
      name
    }
    location {
      name
    }
    image
    episode {
      id
      name
      episode
    }
    created
  }
`;

export const GET_CHARACTERS_QUERY = gql`
  ${CHARACTER_FIELDS_FRAGMENT}
  
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        ...CharacterFields
      }
    }
  }
`;

export const GET_CHARACTER_QUERY = gql`
  ${CHARACTER_FIELDS_FRAGMENT}
  
  query GetCharacter($id: ID!) {
    character(id: $id) {
      ...CharacterFields
    }
  }
`;

export const createMultipleCharactersQuery = (ids: number[]) => {
  if (ids.length === 0) {
    throw new Error("At least one character ID is required");
  }

  const characterQueries = ids
    .map(
      (id) => `
    character${id}: character(id: ${id}) {
      ...CharacterFields
    }
  `
    )
    .join("");

  return gql`
    ${CHARACTER_FIELDS_FRAGMENT}
    
    query {
      ${characterQueries}
    }
  `;
}; 