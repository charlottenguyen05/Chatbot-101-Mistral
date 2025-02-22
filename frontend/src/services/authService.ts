import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
axios.defaults.withCredentials = true;

export async function loginUser(email: string, password: string) {
  // From frontend, send a HTTP post request (await axios.post(API_SERVER)) to the server (backend) to authenticate the user
  // Get the response from the server and return that response (gonna be use for information in toaster)
  // This async loginUser function gonna be used as the login function passed to all the children by context
  const res = await axios.post(
    "/users/connexion",
    { email: email, password: password },
    { withCredentials: true }
  );
  if (res.status !== 200) {
    throw new Error("unable to login"); // If error, an error gonna be raised and nothing is returned. So the value of loginData inside AuthProvider gonna be null
  }
  return await res.data;
}

export async function getTokenVerified() {
  const res = await axios.get("/users/auth-status");
  if (res.status !== 200) {
    throw new Error("unable to authenticate user"); // If error, an error gonna be raised and nothing is returned. So the value of loginData inside AuthProvider gonna be null
  }
  return await res.data;
}

export async function signupUser(
  name: string,
  email: string,
  password: string
) {
  const res = await axios.post("/users/inscription", {
    name: name,
    email: email,
    password: password,
  });
  if (res.status !== 200) {
    throw new Error("unable to login"); // If error, an error gonna be raised and nothing is returned. So the value of loginData inside AuthProvider gonna be null
  }
  return await res.data;
}

export async function logoutUser() {
  const res = await axios.post("/users/logout");
  if (res.status !== 200) {
    throw new Error("unable to login"); // If error, an error gonna be raised and nothing is returned. So the value of loginData inside AuthProvider gonna be null
  }
  return res.status;
}
