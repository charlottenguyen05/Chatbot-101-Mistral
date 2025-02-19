import { Box, Button, Typography } from "@mui/material";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Footer from "./Footer";

const Home = () => {
  const auth = useContext(AuthContext)
  return (
    <Box
      component="section"
      sx={{
        height: 650,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2.5,
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontWeight: 900, fontSize: { xs: 40, md: 60 } }}
      >
        Chatbot 101
      </Typography>
      <Typography variant="h2" sx={{ fontWeight: 700, fontSize: {xs: 20, md: 30}}}>
        Chat avec Mistral AI
      </Typography>
      <Button
        to={auth.isLoggedin ? "/chat" : "/inscription"}  // If not authenticated then send to /connexion. Else send to /chat
        component={Link}
        variant="contained"
        color="secondary"
        sx={{
          fontWeight: 800,
          fontSize: 16,
          color:"primary",
          py: 1.5,
          px: 3,
          borderRadius: 5,
          "&:hover": { backgroundColor: "secondary.dark" },
        }}
      >
        Commencer une conversation <GoArrowRight size={20} style={{marginLeft: 5}}/>
      </Button>
      <Footer/>
    </Box>
    
  );
};

export default Home;
