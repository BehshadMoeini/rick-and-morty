import { Link, useLocation } from "react-router-dom";
import { useFavoritesStore } from "../store/favorites";
import { Star, Home, Search, LightMode, DarkMode } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  TextField,
  InputAdornment,
  Button,
  Badge,
  Container,
  Stack,
  IconButton,
  useTheme,
} from "@mui/material";
import { useThemeContext } from "../contexts/ThemeContext";

interface NavbarProps {
  onSearchChange?: (searchTerm: string) => void;
  initialSearchTerm?: string;
  showSearchBar?: boolean;
  currentPath?: string;
}

const Navbar = ({
  onSearchChange,
  initialSearchTerm = "",
  showSearchBar = true,
}: NavbarProps) => {
  const location = useLocation();
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { favorites } = useFavoritesStore();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        if (showSearchBar && searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showSearchBar]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange?.(value);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: theme.palette.mode === "dark" ? "#1e293b" : "#374151",
        boxShadow: 3,
        zIndex: 1100,
        top: 0,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ py: { xs: 1, md: 2 }, px: { xs: 1, md: 2 } }}>
          <Stack
            direction="row"
            spacing={{ xs: 1, md: 2 }}
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Button
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "white",
                textDecoration: "none",
                fontSize: { xs: "0.875rem", md: "1rem" },
                fontWeight: "bold",
                minWidth: "auto",
                px: { xs: 1, md: 2 },
              }}
            >
              <Box
                component="img"
                src="/Rick_and_Morty.svg"
                alt="Rick and Morty Logo"
                sx={{ height: { xs: 32, md: 40 }, mr: { xs: 0.5, md: 1 } }}
              />
            </Button>

            {showSearchBar && (
              <Box
                sx={{
                  flex: 1,
                  maxWidth: { xs: 200, sm: 300, md: 400 },
                  mx: { xs: 1, md: 2 },
                  display: { xs: "block", sm: "block" },
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Search characters...(CTRL+K)"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  size="small"
                  inputRef={searchInputRef}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search
                          color="action"
                          sx={{ fontSize: { xs: 18, md: 20 } }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#374151" : "white",
                      color: theme.palette.mode === "dark" ? "white" : "black",
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      "& fieldset": {
                        borderColor:
                          theme.palette.mode === "dark"
                            ? "#6b7280"
                            : "rgba(0, 0, 0, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "& input::placeholder": {
                        color:
                          theme.palette.mode === "dark" ? "#9ca3af" : "#6b7280",
                        opacity: 1,
                      },
                    },
                  }}
                />
              </Box>
            )}

            <Stack
              direction="row"
              spacing={{ xs: 0.5, md: 2 }}
              alignItems="center"
            >
              <Button
                component={Link}
                to="/"
                sx={{
                  color: "white",
                  borderBottom:
                    location.pathname === "/"
                      ? "2px solid white"
                      : "2px solid transparent",
                  borderRadius: 0,
                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                  minWidth: { xs: "auto", sm: "auto" },
                  px: { xs: 1, md: 2 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: { xs: 0, sm: 1 },
                  "&:hover": {
                    color: theme.palette.primary.main,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <Home sx={{ fontSize: { xs: 18, md: 20 } }} />
                <Box sx={{ display: { xs: "none", sm: "block" } }}>Home</Box>
              </Button>
              <Button
                component={Link}
                to="/favorites"
                sx={{
                  color: "white",
                  position: "relative",
                  borderBottom:
                    location.pathname === "/favorites"
                      ? "2px solid white"
                      : "2px solid transparent",
                  borderRadius: 0,
                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                  minWidth: { xs: "auto", sm: "auto" },
                  px: { xs: 1, md: 2 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: { xs: 0, sm: 1 },
                  "&:hover": {
                    color: theme.palette.primary.main,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <Star sx={{ fontSize: { xs: 18, md: 20 } }} />
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  Favorites
                </Box>
                {favorites.length > 0 && (
                  <Badge
                    badgeContent={favorites.length}
                    color="error"
                    sx={{
                      "& .MuiBadge-badge": {
                        position: "absolute",
                        top: -8,
                        right: -8,
                        fontSize: { xs: "0.625rem", md: "0.75rem" },
                      },
                    }}
                  />
                )}
              </Button>

              <IconButton
                onClick={toggleTheme}
                size="small"
                sx={{
                  color: "white",
                  p: { xs: 0.5, md: 1 },
                  "&:hover": {
                    color: theme.palette.primary.main,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                {isDarkMode ? (
                  <LightMode sx={{ fontSize: { xs: 18, md: 20 } }} />
                ) : (
                  <DarkMode sx={{ fontSize: { xs: 18, md: 20 } }} />
                )}
              </IconButton>
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
