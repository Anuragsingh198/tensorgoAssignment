import React, { useEffect } from "react";
import { Button, Typography, Box, Container, Paper } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useValue } from "../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { dispatch } = useValue();
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleLogin;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializeGoogleLogin = () => {
    window.google.accounts.id.initialize({
      client_id: "522448111757-n79jvqjo4aai5vosmom5sn41kieidih6.apps.googleusercontent.com", 
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-login-btn"),
      { theme: "outline", size: "large" }
    );
  };

  const handleCredentialResponse = (response) => {
    try {
      const base64Url = response.credential.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const user = JSON.parse(jsonPayload);

      const userData = {
        googleId: user.sub,
        email: user.email,
        name: user.name,
        avatar: user.picture,
      };

      console.log("User Info:", userData);

      dispatch({ type: "UPDATE_USER", payload: userData });
      dispatch({ type: "OPEN_LOGIN" });

      navigate("/");
    } catch (error) {
      console.error("Error processing Google login:", error);
      alert("Login failed! Please try again.");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 4,
          width: "100%",
          maxWidth: 400,
          backgroundColor: "white",
        }}
      >
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" gutterBottom>
            Welcome
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Log in with your Google account to continue.
          </Typography>
        </Box>
        <div id="google-login-btn" style={{ textAlign: "center" }}></div>
      </Paper>
    </Container>
  );
};

export default LoginPage;
