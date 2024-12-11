import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  Dialog,
  DialogContent,
  InputBase,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { logout } from "../actions/userActions";
import {
  searchLearningNotes,
  clearSearchedNotes,
} from "../actions/learningNoteActions";

function PositionedMenu({ buttonLabel }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logout);
    navigate("/");
  };

  return (
    <div>
      <Button onClick={handleClick} color="inherit">
        {buttonLabel}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
        {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default function NavBar() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim().length > 0) {
      dispatch(searchLearningNotes(searchQuery));
      setSearchDialogOpen(false);
    }
  };

  const openSearchDialog = () => {
    setSearchDialogOpen(true);
  };

  const closeSearchDialog = () => {
    setSearchDialogOpen(false);
  };

  const handleClearSearch = () => {
    dispatch(clearSearchedNotes());
    setSearchQuery("");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Learning Timeline
          </Typography>

          {isSmallScreen && userInfo && (
            <>
              <IconButton color="inherit" onClick={openSearchDialog}>
                <SearchIcon />
              </IconButton>

              <Dialog open={searchDialogOpen} onClose={closeSearchDialog}>
                <DialogContent>
                  <Box
                    sx={{
                      position: "relative",
                      mr: 2,
                      flexGrow: 1,
                      maxWidth: "300px",
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "white",
                      borderRadius: "4px",
                      padding: "4px 12px",
                    }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                  >
                    <InputBase
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                          closeSearchDialog();
                        }
                      }}
                      sx={{
                        width: "100%",
                        padding: "8px 16px",
                        border: "1pz solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                    {hovered && searchQuery && (
                      <IconButton
                        size="small"
                        onClick={handleClearSearch}
                        sx={{ ml: 1 }}
                      >
                        <ClearIcon sx={{ color: "gray" }} />
                      </IconButton>
                    )}
                  </Box>
                </DialogContent>
              </Dialog>
            </>
          )}

          {!isSmallScreen && userInfo && (
            <Box
              sx={{
                position: "relative",
                mr: 2,
                flexGrow: 1,
                maxWidth: "300px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: "4px",
                padding: "4px 12px",
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <SearchIcon sx={{ mr: 1, color: "gray" }} />

              <InputBase
                placeholder="Search…"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                sx={{
                  width: "100%",
                  flexGrow: 1,
                }}
              />

              {hovered && searchQuery && (
                <IconButton
                  size="small"
                  onClick={handleClearSearch}
                  sx={{ ml: 1 }}
                >
                  <ClearIcon sx={{ color: "gray" }} />
                </IconButton>
              )}
            </Box>
          )}

          {userInfo ? (
            <PositionedMenu buttonLabel={userInfo.name} />
          ) : (
            <div>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
