import { useEffect, type FC } from "react";
import { useInView } from "react-intersection-observer";
import CharacterCard from "./CharacterCard";
import {
  useCharacters,
  flattenCharactersResults,
} from "../hooks/useCharacters";
import { useFavoritesStore } from "../store/favorites";
import {
  Grid,
  Box,
  Typography,
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Skeleton,
  Card,
  CardContent,
} from "@mui/material";
import type { Character, CharacterFilters } from "../api/rickAndMortyApi";

interface CharacterListProps {
  filters?: CharacterFilters;
}

const CharacterList: FC<CharacterListProps> = ({ filters }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useCharacters(filters);

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "0px 0px 300px 0px",
  });

  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleToggleFavorite = (character: Character) => {
    if (isFavorite(character.id)) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  if (status === "pending") {
    return (
      <Box>
        <Box textAlign="center" sx={{ py: 4 }}>
          <CircularProgress size={48} sx={{ mb: 2 }} />
        </Box>
        <Grid container spacing={3}>
          {[...Array(8)].map((_, index) => (
            <Grid size={{ xs: 6, sm: 6, md: 4, lg: 4 }} key={index}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" width="75%" height={32} />
                  <Skeleton variant="text" width="50%" height={24} />
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="40%" height={20} />
                  <Skeleton variant="rectangular" height={40} sx={{ mt: 2 }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (status === "error") {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        <AlertTitle>Error loading characters</AlertTitle>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {error instanceof Error ? error.message : "Unknown error"}
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={() => window.location.reload()}
        >
          Try again
        </Button>
      </Alert>
    );
  }

  const characters = flattenCharactersResults(data);

  if (characters.length === 0) {
    return (
      <Alert severity="warning" sx={{ mb: 3 }}>
        <AlertTitle>No characters found</AlertTitle>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Try adjusting your search or filters to find characters.
        </Typography>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => (window.location.href = "/")}
        >
          Reset Filters
        </Button>
      </Alert>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {characters.map((character) => (
          <Grid size={{ xs: 6, sm: 6, md: 4, lg: 4 }} key={character.id}>
            <CharacterCard
              character={character}
              isFavorite={isFavorite(character.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          </Grid>
        ))}
      </Grid>

      {hasNextPage && (
        <Box ref={ref} textAlign="center" sx={{ my: 4 }}>
          {isFetchingNextPage ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <CircularProgress size={20} />
              <Typography>Loading more characters...</Typography>
            </Box>
          ) : (
            <Typography color="text.secondary">Scroll for more</Typography>
          )}
        </Box>
      )}

      {!hasNextPage && characters.length > 0 && (
        <Box textAlign="center" sx={{ py: 2 }}>
          <Typography color="text.secondary">
            No more characters to load
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CharacterList;
