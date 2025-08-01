import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCharacter } from "../hooks/useCharacters";
import { useFavoritesStore } from "../store/favorites";
import { Star, StarBorder, ArrowBack } from "@mui/icons-material";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Skeleton,
  Alert,
  AlertTitle,
} from "@mui/material";

const CharacterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();

  const characterId = id ? parseInt(id) : 0;

  const {
    data: character,
    isLoading,
    isError,
    error,
  } = useCharacter(characterId);

  // Redirect back to home if invalid ID
  useEffect(() => {
    if (characterId <= 0) {
      navigate("/");
    }
  }, [characterId, navigate]);

  const handleToggleFavorite = () => {
    if (character) {
      if (isFavorite(character.id)) {
        removeFavorite(character.id);
      } else {
        addFavorite(character);
      }
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box textAlign="center">
          <Skeleton
            variant="circular"
            width={64}
            height={64}
            sx={{ mx: "auto", mb: 2 }}
          />
        </Box>
      </Container>
    );
  }

  if (isError || !character) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          <AlertTitle>Error loading character</AlertTitle>
          <Typography variant="body2">
            {error instanceof Error ? error.message : "Unknown error"}
          </Typography>
        </Alert>
        <Box textAlign="center">
          <Button component={Link} to="/" color="primary">
            Back to characters
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBack />}
          color="primary"
        >
          Back to all characters
        </Button>
        <Button component={Link} to="/favorites" color="primary">
          View Favorites
        </Button>
      </Box>

      <Card>
        <Grid container>
          <Grid size={{ xs: 12, md: 4 }}>
            <CardMedia
              component="img"
              image={character.image}
              alt={character.name}
              sx={{ height: "100%", width: "100%" }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CardContent sx={{ p: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Typography variant="h3" component="h1" gutterBottom>
                  {character.name}
                </Typography>
                <IconButton
                  onClick={handleToggleFavorite}
                  size="large"
                  aria-label={
                    isFavorite(character.id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  {isFavorite(character.id) ? (
                    <Star sx={{ color: "warning.main", fontSize: 32 }} />
                  ) : (
                    <StarBorder
                      sx={{ color: "text.secondary", fontSize: 32 }}
                    />
                  )}
                </IconButton>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    mr: 1,
                    backgroundColor:
                      character.status === "Alive"
                        ? "success.main"
                        : character.status === "Dead"
                        ? "error.main"
                        : "grey.500",
                  }}
                />
                <Typography variant="h6">
                  {character.status} - {character.species}
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Gender
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {character.gender}
                  </Typography>
                </Grid>

                {character.type && (
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Type
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {character.type || "Unknown"}
                    </Typography>
                  </Grid>
                )}

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Origin
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {character.origin.name}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Last known location
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {character.location.name}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    First seen in
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {character.episode[0]
                      ? "Episode " + character.episode[0].episode
                      : "Unknown"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Total episodes
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {character.episode.length}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default CharacterDetailPage;
