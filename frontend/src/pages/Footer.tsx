import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 2,
        textAlign: "center",
        color: "white",
        position: "fixed",
        bottom: 0,
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 700 }}>
        Made with ❤️ in Toulouse 
        <Typography variant="body2" sx={{ fontWeight: 700 }}>by Nhi Nguyen</Typography>
      </Typography>
    </Box>
  );
};

export default Footer;
