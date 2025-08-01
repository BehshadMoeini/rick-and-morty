# React Query Implementation Guide

This document outlines the React Query (TanStack Query) implementation in the Rick and Morty application, following best practices for data fetching, caching, and state management.

## Overview

The application uses React Query v5 for all API calls, providing:
- Automatic caching and background updates
- Optimistic updates
- Error handling and retry logic
- Infinite scrolling for character lists
- Prefetching for improved UX

## Architecture

### 1. Query Keys Organization

We use a structured approach to query keys for better cache management:

```typescript
export const characterKeys = {
  all: ["characters"] as const,
  lists: () => [...characterKeys.all, "list"] as const,
  list: (filters: CharacterFilters | undefined) => [...characterKeys.lists(), { filters }] as const,
  details: () => [...characterKeys.all, "detail"] as const,
  detail: (id: number) => [...characterKeys.details(), id] as const,
  multiple: (ids: number[]) => [...characterKeys.all, "multiple", ids] as const,
};
```

### 2. Custom Hooks

#### `useCharacters` - Infinite Query for Character Lists
```typescript
export const useCharacters = (filters?: CharacterFilters) => {
  return useInfiniteQuery({
    queryKey: characterKeys.list(filters),
    queryFn: ({ pageParam = 1 }) => getCharacters(pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.info.next || undefined,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes("not found")) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
```

#### `useCharacter` - Single Character Query
```typescript
export const useCharacter = (id: number) => {
  return useQuery({
    queryKey: characterKeys.detail(id),
    queryFn: () => getCharacter(id),
    enabled: !!id && id > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes("not found")) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
```

#### `useMultipleCharacters` - Multiple Characters Query
```typescript
export const useMultipleCharacters = (ids: number[]) => {
  return useQuery({
    queryKey: characterKeys.multiple(ids),
    queryFn: () => getMultipleCharacters(ids),
    enabled: ids.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      return failureCount < 2;
    },
  });
};
```

### 3. Prefetching for Better UX

We implement prefetching to improve user experience:

```typescript
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
```

## Configuration

### QueryClient Setup

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (error instanceof Error && error.message.includes("not found")) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});
```

### DevTools

Development tools are included for debugging:

```typescript
export const ReactQueryDevtools = () => {
  if (import.meta.env.DEV) {
    return <Devtools initialIsOpen={false} />;
  }
  return null;
};
```

## Best Practices Implemented

### 1. Error Handling
- Custom retry logic that doesn't retry on 404 errors
- Proper error boundaries and user-friendly error messages
- Graceful degradation when API calls fail

### 2. Caching Strategy
- Different stale times for different types of data
- Longer cache times for individual characters (30 minutes)
- Shorter cache times for lists (5 minutes)
- Proper garbage collection times

### 3. Performance Optimizations
- Prefetching on hover for character details
- Infinite scrolling for large datasets
- Disabled refetch on window focus to reduce unnecessary requests
- Optimized query keys for better cache invalidation

### 4. User Experience
- Loading states with skeletons
- Error states with actionable messages
- Smooth transitions between states
- Prefetching for instant navigation

## Usage Examples

### Character List with Infinite Scroll
```typescript
const { data, isLoading, fetchNextPage, hasNextPage } = useCharacters(filters);
const characters = flattenCharactersResults(data);
```

### Single Character Detail
```typescript
const { data: character, isLoading, isError, error } = useCharacter(id);
```

### Multiple Characters (Favorites)
```typescript
const { data: favoriteCharacters, isLoading, isError } = useMultipleCharacters(favoriteIds);
```

### Prefetching
```typescript
const { prefetchCharacter } = useCharacterPrefetch();
// Use on hover or other user interactions
onMouseEnter={() => prefetchCharacter(characterId)}
```

## Benefits

1. **Automatic Caching**: Data is cached and reused across components
2. **Background Updates**: Data stays fresh with background refetching
3. **Optimistic Updates**: UI updates immediately while requests are in flight
4. **Error Handling**: Robust error handling with retry logic
5. **Performance**: Reduced API calls through intelligent caching
6. **Developer Experience**: DevTools for debugging and monitoring
7. **User Experience**: Prefetching and loading states for smooth interactions

## Future Enhancements

1. **Mutations**: Add mutations for user actions (if API supports it)
2. **Optimistic Updates**: Implement optimistic updates for favorites
3. **Offline Support**: Add offline capabilities with React Query's offline features
4. **Real-time Updates**: Implement WebSocket integration for real-time data
5. **Advanced Caching**: Add more sophisticated cache invalidation strategies 