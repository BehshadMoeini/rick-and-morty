import { useState, useEffect, type FC } from "react";
import { FilterList, Clear } from "@mui/icons-material";
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import type { CharacterFilters } from "../api/rickAndMortyApi";

interface FiltersProps {
  onFilterChange: (filters: CharacterFilters) => void;
}

const Filters: FC<FiltersProps> = ({ onFilterChange }) => {
  const [status, setStatus] = useState<CharacterFilters["status"] | "">("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState<CharacterFilters["gender"] | "">("");

  useEffect(() => {
    const handler = setTimeout(() => {
      const filters: CharacterFilters = {};

      if (status) filters.status = status;
      if (species) filters.species = species;
      if (gender) filters.gender = gender;

      onFilterChange(filters);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [status, species, gender, onFilterChange]);

  const clearFilters = () => {
    setStatus("");
    setSpecies("");
    setGender("");
    onFilterChange({});
  };

  const hasActiveFilters = status || species || gender;

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <FilterList color="primary" sx={{ mr: 1 }} />
          Filters
        </Typography>
        {hasActiveFilters && (
          <Button
            startIcon={<Clear />}
            color="error"
            size="small"
            onClick={clearFilters}
          >
            Clear All
          </Button>
        )}
      </Box>

      <Stack spacing={3}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) =>
              setStatus(e.target.value as CharacterFilters["status"] | "")
            }
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="alive">🟢 Alive</MenuItem>
            <MenuItem value="dead">🔴 Dead</MenuItem>
            <MenuItem value="unknown">⚪ Unknown</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Species</InputLabel>
          <Select
            value={species}
            label="Species"
            onChange={(e) => setSpecies(e.target.value)}
          >
            <MenuItem value="">All Species</MenuItem>
            <MenuItem value="Human">👤 Human</MenuItem>
            <MenuItem value="Alien">👽 Alien</MenuItem>
            <MenuItem value="Robot">🤖 Robot</MenuItem>
            <MenuItem value="Humanoid">🧬 Humanoid</MenuItem>
            <MenuItem value="Animal">🐾 Animal</MenuItem>
            <MenuItem value="Cronenberg">🧟 Cronenberg</MenuItem>
            <MenuItem value="Disease">🦠 Disease</MenuItem>
            <MenuItem value="Mythological Creature">
              🐉 Mythological Creature
            </MenuItem>
            <MenuItem value="Poopybutthole">💩 Poopybutthole</MenuItem>
            <MenuItem value="Unknown">❓ Unknown</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select
            value={gender}
            label="Gender"
            onChange={(e) =>
              setGender(e.target.value as CharacterFilters["gender"] | "")
            }
          >
            <MenuItem value="">All Genders</MenuItem>
            <MenuItem value="female">👩 Female</MenuItem>
            <MenuItem value="male">👨 Male</MenuItem>
            <MenuItem value="genderless">⚪ Genderless</MenuItem>
            <MenuItem value="unknown">❓ Unknown</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <Box sx={{ pt: 3, mt: 3, borderTop: 1, borderColor: "divider" }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Active filters:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {status && (
              <Chip
                label={status.charAt(0).toUpperCase() + status.slice(1)}
                size="small"
                color="success"
                variant="outlined"
              />
            )}
            {species && (
              <Chip
                label={species}
                size="small"
                color="secondary"
                variant="outlined"
              />
            )}
            {gender && (
              <Chip
                label={gender.charAt(0).toUpperCase() + gender.slice(1)}
                size="small"
                color="warning"
                variant="outlined"
              />
            )}
          </Stack>
        </Box>
      )}
    </Paper>
  );
};

export default Filters;
