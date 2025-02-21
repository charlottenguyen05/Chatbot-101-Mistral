import { Box, FormHelperText, FormLabel, TextField } from "@mui/material";
import React from "react";

const FormField = ({
  state,
  setState,
  lowercase,
  error,
}: {
  state: string;
  lowercase: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  error: string;
}) => {
  return (
    <Box component="div">
      <FormLabel>
        {lowercase.charAt(0).toUpperCase() + lowercase.slice(1)}
      </FormLabel>
      <TextField
        variant="outlined"
        type={lowercase === "name" ? "text" : lowercase}
        fullWidth
        error={!!error}
        helperText={error}
        name={lowercase}
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
        sx={{
          input: {
            color: "white",
          },
          // Target the default state
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            // Target hover state
            "&:hover fieldset": {
              borderColor: "white",
            },
          },
        }}
      />
      {lowercase === "password" && (
        <FormHelperText>Il faut avoir au moins 6 caracteres</FormHelperText>
      )}
    </Box>
  );
};

export default FormField;
