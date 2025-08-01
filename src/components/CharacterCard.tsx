import { Link } from "react-router-dom";
import { Star, StarBorder } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import { useCharacterPrefetch } from "../hooks/useCharacterPrefetch";

import type { Character } from "../api/rickAndMortyApi";

interface CharacterCardProps {
  character: Character;
  isFavorite: boolean;
  onToggleFavorite: (character: Character) => void;
}

const CharacterCard = ({
  character,
  isFavorite,
  onToggleFavorite,
}: CharacterCardProps) => {
  const { prefetchCharacter } = useCharacterPrefetch();

  const getStatusColor = () => {
    switch (character.status) {
      case "Alive":
        return "success";
      case "Dead":
        return "error";
      default:
        return "default";
    }
  };

  const getGenderColor = () => {
    switch (character.gender?.toLowerCase()) {
      case "male":
        return "info";
      case "female":
        return "secondary";
      case "genderless":
        return "warning";
      case "unknown":
      default:
        return "default";
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 8,
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="300"
          image={character.image}
          alt={character.name}
          sx={{
            objectFit: "cover",
            objectPosition: "center top",
            transition: "transform 0.3s ease",
            width: "100%",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
        <IconButton
          onClick={() => onToggleFavorite(character)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(4px)",
            "&:hover": {
              backgroundColor: "white",
              transform: "scale(1.1)",
            },
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <Star sx={{ color: "warning.main", fontSize: 24 }} />
          ) : (
            <StarBorder sx={{ color: "grey", fontSize: 24 }} />
          )}
        </IconButton>

        {/* Status Badge */}
        <Box sx={{ position: "absolute", bottom: 8, left: 8 }}>
          <Chip
            label={character.status}
            color={getStatusColor()}
            size="small"
            sx={{
              color: "white",
              "& .MuiChip-label": {
                display: "flex",
                alignItems: "center",
              },
            }}
            icon={
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "white",
                }}
              />
            }
          />
        </Box>
      </Box>

      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography
          component={Link}
          to={`/character/${character.id}`}
          variant="h6"
          gutterBottom
          onMouseEnter={() => prefetchCharacter(character.id)}
          sx={{
            textDecoration: "none",
            color: "text.primary",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          {character.name}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            label={character.species}
            size="small"
            variant="outlined"
            color="primary"
          />
          {character.gender && (
            <Chip
              label={character.gender}
              size="small"
              variant="outlined"
              color={getGenderColor()}
            />
          )}
        </Stack>

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            gutterBottom
          >
            Last Location
          </Typography>
          <Typography variant="body2" gutterBottom>
            {character.location.name}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            gutterBottom
          >
            Origin
          </Typography>
          <Typography variant="body2" gutterBottom>
            {character.origin.name}
          </Typography>

          {character.episode && character.episode.length > 0 && (
            <>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                gutterBottom
              >
                Episodes
              </Typography>
              <Typography variant="body2" gutterBottom>
                {character.episode.length} episodes
              </Typography>
            </>
          )}
        </Box>

        <Button
          component={Link}
          to={`/character/${character.id}`}
          variant="contained"
          fullWidth
          onMouseEnter={() => prefetchCharacter(character.id)}
          sx={{
            mt: 2,
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
