import { useState, useEffect, useCallback } from "react";
import { Outlet, useSearchParams, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { Box, useTheme } from "@mui/material";
import { useDebounce } from "../hooks/useDebounce";

const Layout = () => {
  const location = useLocation();
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams);

    if (debouncedSearchTerm) {
      currentParams.search = debouncedSearchTerm;
    } else {
      delete currentParams.search;
    }

    if (location.pathname === "/" || location.pathname === "") {
      setSearchParams(currentParams);
    }
  }, [debouncedSearchTerm, location.pathname, setSearchParams, searchParams]);

  const handleSearchChange = useCallback((search: string) => {
    setSearchTerm(search);
  }, []);

  const showSearchBar = location.pathname === "/" || location.pathname === "";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Navbar
        onSearchChange={handleSearchChange}
        initialSearchTerm={searchTerm}
        showSearchBar={showSearchBar}
        currentPath={location.pathname}
      />
      <Outlet />
    </Box>
  );
};

export default Layout;
