import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router";
import Stack from "@mui/system/Stack";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";


const NavBar = () => {
  const { isLoggedin, logout } = useContext(AuthContext)!;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Link to="/">
            <Box
              component="img"
              src="/chatbot.png"
              alt="Logo"
              sx={{ height: 50, mr: 2, cursor: "pointer" }}
            />
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 700, fontSize: 16 }}
          >
            Chatbot 101
          </Typography>
          {!isLoggedin ? (
            <Stack spacing={{ xs: 2, md: 4 }} direction="row">
              <Button
                to="/connexion"
                component={Link}
                variant="outlined"
                color="secondary"
                sx={{
                  borderRadius: 5,
                  "&:hover": {
                    color: "secondary.dark", // Darker shade on hover
                  },
                }}
              >
                Connexion
              </Button>
              <Button
                to="/inscription"
                component={Link}
                variant="outlined"
                color="secondary"
                sx={{
                  borderRadius: 5,
                  "&:hover": {
                    color: "secondary.dark", // Darker shade on hover
                  },
                }}
              >
                S'inscrire
              </Button>
            </Stack>
          ) : (
            <Stack spacing={{ xs: 2, md: 4 }} direction="row">
              <Button
                onClick={async () => {
                  try {
                    await logout()
                  } catch (error) {
                    throw new Error("Can not logout")
                  }
                }}
                variant="outlined"
                color="secondary"
                sx={{
                  borderRadius: 5,
                  "&:hover": {
                    color: "secondary.dark", // Darker shade on hover
                  },
                }}
              >
                Se déconnecter
              </Button>{" "}
              <Button
                to="/chat"
                component={Link}
                variant="outlined"
                color="secondary"
                sx={{
                  borderRadius: 5,
                  "&:hover": {
                    color: "secondary.dark", // Darker shade on hover
                  },
                }}
              >
                Chat ✨
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
