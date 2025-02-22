import { Box, Button, Container, Typography } from "@mui/material";
import { FormEvent, useContext, useState } from "react";
import FormField from "../components/FormField";
import { AuthContext, AuthUser } from "../providers/AuthProvider";
import Footer from "./Footer";
import schema from "../joiSchema";
import toast from "react-hot-toast";
import { ValidationErrorItem } from "joi";

const Signup = () => {
  const authContext: AuthUser = useContext(AuthContext);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const { error } = schema.validate({ name, email, password });
    const newErrors: { [key: string]: string } = {};
    if (error) {
      error.details.forEach((err: ValidationErrorItem) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
    } else {
      try {
        await authContext.signup(name, email, password);
      } catch (error) {
        toast.error("Can not signup please try again")
      }
    }
  }

  // signup(name, email, password)

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h4" color="white" sx={{ fontWeight: 800 }}>
        S'inscire
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <FormField
          state={name}
          setState={setName}
          lowercase="name"
          error={errors.name}
        />
        <FormField
          state={email}
          setState={setEmail}
          lowercase="email"
          error={errors.email}
        />
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
          S'inscrire
        </Button>
      </Box>
      <Footer />
    </Container>
  );
};

export default Signup;
