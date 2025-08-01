import { useState } from "react";
import { useFavoritesStore } from "../store/favorites";
import { useMultipleCharacters } from "../hooks/useCharacters";
import CharacterCard from "../components/CharacterCard";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Box,
  Button,
  Skeleton,
  Alert,
  AlertTitle,
} from "@mui/material";

import type { Character } from "../api/rickAndMortyApi";

const FavoritesPage = () => {
  const { favorites, removeFavorite, isFavorite } = useFavoritesStore();
  const [searchTerm, setSearchTerm] = useState("");

  const favoriteIds = favorites.map((character: Character) => character.id);

  const {
    data: favoriteCharacters,
    isLoading,
    isError,
    error,
  } = useMultipleCharacters(favoriteIds);

  const filteredFavorites =
    favoriteCharacters?.filter((character: Character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleToggleFavorite = (character: Character) => {
    removeFavorite(character.id);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Your Favorite Characters
      </Typography>

      {favorites.length > 0 ? (
        <>
          {isLoading && (
            <Box sx={{ mb: 3 }}>
              <Grid container spacing={3}>
                {[...Array(4)].map((_, index) => (
                  <Grid size={{ xs: 6, sm: 6, md: 4, lg: 4 }} key={index}>
                    <Skeleton variant="rectangular" height={300} />
                    <Skeleton variant="text" sx={{ mt: 1 }} />
                    <Skeleton variant="text" width="60%" />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {isError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              <AlertTitle>Error loading favorites</AlertTitle>
              {error instanceof Error
                ? error.message
                : "Failed to load favorite characters"}
            </Alert>
          )}

          {!isLoading && !isError && (
            <>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  placeholder="Search favorites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ maxWidth: 400 }}
                />
              </Box>

              {filteredFavorites.length > 0 ? (
                <Grid container spacing={3}>
                  {filteredFavorites.map((character: Character) => (
                    <Grid
                      size={{ xs: 6, sm: 6, md: 4, lg: 4 }}
                      key={character.id}
                    >
                      <CharacterCard
                        character={character}
                        isFavorite={isFavorite(character.id)}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box textAlign="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    No favorites match your search.
                  </Typography>
                </Box>
              )}
            </>
          )}
        </>
      ) : (
        <Box textAlign="center" sx={{ py: 6 }}>
          <Typography variant="h5" gutterBottom>
            You haven't added any favorite characters yet.
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
          >
            Find Characters to Add
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default FavoritesPage;
