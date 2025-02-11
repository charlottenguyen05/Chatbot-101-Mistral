import { Box, Button, Container, Typography } from "@mui/material";
import { FormEvent, useContext, useState } from "react";
import FormField from "../components/FormField";
import {toast} from "react-hot-toast"
import { AuthContext, AuthUser } from "../providers/AuthProvider";


const Login = () => {
  const authContext : AuthUser = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      await authContext.login(email, password);
    } catch (error) {
      throw new Error("Can not login")
    }
  }

  // login(email, password)

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Typography variant="h4" color="white"  sx={{fontWeight: 800}}>
        Connexion
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 5 }}
      >
        <FormField state={email} setState={setEmail} lowercase="email" />
        <FormField state={password} setState={setPassword} lowercase="password" />
        <Button
          type="submit"
          sx={{
            borderRadius: 5,
            py: 1.5,
            px: 3,
            fontWeight: 800,
            fontSize: 15,
            "&:hover": {
              backgroundColor: "secondary.dark", // Darker shade on hover
            },
          }}
          variant="contained"
          color="secondary"
        >
          Se connecter
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
