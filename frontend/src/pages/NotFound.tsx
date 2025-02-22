import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" sx={{ color: "white", fontSize: "10rem", fontWeight: "bold" }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")} sx={{ mt: 5, fontSize: 20, color: "white", py:3, px: 5, borderRadius:5 }}> 
        Revenir à l'accueil
      </Button>
    </Container>
  );
};

export default NotFoundPage;
