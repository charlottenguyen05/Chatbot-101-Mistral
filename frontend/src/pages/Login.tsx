import { Box, Button, Container, Typography } from "@mui/material";
import { FormEvent, useContext, useState } from "react";
import FormField from "../components/FormField";
import { toast } from "react-hot-toast";
import { AuthContext, AuthUser } from "../providers/AuthProvider";
import Footer from "./Footer";
import schema from "../joiSchema";
import { ValidationErrorItem } from "joi";

const Login = () => {
  const authContext: AuthUser = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const { error } = schema.validate({ email, password });
    const newErrors: { [key: string]: string } = {};
    if (error) {
      error.details.forEach((err: ValidationErrorItem) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
    } else {
      try {
        await authContext.login(email, password);
      } catch (error) {
        toast.error("Wrong password or email. Please try again")
      }
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
      <Typography variant="h4" color="white" sx={{ fontWeight: 800 }}>
        Connexion
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 5 }}
      >
        <FormField state={email} setState={setEmail} lowercase="email" error={errors.email}/>
        <FormField
          state={password}
          setState={setPassword}
          lowercase="password"
          error={errors.password}
        />
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
      <Footer />
    </Container>
  );
};

export default Login;
