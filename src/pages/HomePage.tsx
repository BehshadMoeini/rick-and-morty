import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CharacterList from "../components/CharacterList";
import Filters from "../components/Filters";
import type { CharacterFilters } from "../api/rickAndMortyApi";
import { Container, Box, Typography, Grid, useTheme } from "@mui/material";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<CharacterFilters>({});
  const theme = useTheme();
  const searchTerm = searchParams.get("search") || "";

  const handleFilterChange = (newFilters: CharacterFilters) => {
    setFilters(newFilters);
  };

  // Combine search term with filters
  const combinedFilters = {
    ...filters,
    ...(searchTerm && { name: searchTerm }),
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? "#1e293b" : "#374151",
          color: "white",
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Box
              component="img"
              src="/Rick_and_Morty.svg"
              alt="Rick and Morty Logo"
              sx={{
                height: 120,
                mb: 3,
                filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3))",
              }}
            />
            <Typography variant="h5" component="p" sx={{ opacity: 0.9, mb: 4 }}>
              Explore characters from the multiverse
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid>
                <Box textAlign="center">
                  <Typography variant="h4" component="div" fontWeight="bold">
                    826
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.75 }}>
                    Characters
                  </Typography>
                </Box>
              </Grid>
              <Grid>
                <Box textAlign="center">
                  <Typography variant="h4" component="div" fontWeight="bold">
                    51
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.75 }}>
                    Episodes
                  </Typography>
                </Box>
              </Grid>
              <Grid>
                <Box textAlign="center">
                  <Typography variant="h4" component="div" fontWeight="bold">
                    126
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.75 }}>
                    Locations
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 3 }}>
            <Box sx={{ position: "sticky", top: 96 }}>
              <Filters onFilterChange={handleFilterChange} />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, lg: 9 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                {searchTerm
                  ? `Search results for "${searchTerm}"`
                  : "All Characters"}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Discover characters from across the Rick and Morty multiverse
              </Typography>
            </Box>
            <CharacterList filters={combinedFilters} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
