import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MainRoutes from "./routes/MainRoutes";
import { ToastContainer } from "react-toastify";
import { AppUserProvider } from "./contexts/AppUserContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CssBaseline } from "@mui/material";
import "./App.css";

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <AppUserProvider>
          <ToastContainer />
          <MainRoutes />
        </AppUserProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
