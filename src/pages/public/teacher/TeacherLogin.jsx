import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
// import {
//   TextField,
//   Typography,
//   InputAdornment,
//   IconButton,
//   Button,
//   Box,
//   Paper,
// } from "@mui/material";
import { httpService } from "../../../httpService";
import { toast } from "react-toastify";

import { Login, Visibility, VisibilityOff } from "@mui/icons-material";

function TeacherLogin() {
  const [teacher, setTeacher] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const loginCandidate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await httpService.post(
      "auth/teacher/login",
      teacher,
    );

    if (data) window.location.href = "/teacher";
    if (error) toast.error(error);

    setLoading(false);
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f8f9fa"
      px={2}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
        }}
      >
        {/* LOGO */}
        <Box textAlign="center" mb={3}>
          <img src={logo} alt="logo" height={70} />
          <Typography fontWeight={700} mt={1}>
            RCCG – New Life Assembly
          </Typography>
          <Typography color="error">E-Sunday School</Typography>
        </Box>

        {/* HEADER */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h5" fontWeight={700}>
            Teacher Login
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your email and password to continue
          </Typography>
        </Box>

        {/* FORM */}
        <form onSubmit={loginCandidate}>
          <Box mb={3}>
            <TextField
              fullWidth
              label="Email Address"
              onChange={(e) =>
                setTeacher({ ...teacher, email: e.target.value })
              }
            />
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              label="Password"
              type={passwordType ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setPasswordType(!passwordType)}
                      edge="end"
                    >
                      {passwordType ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) =>
                setTeacher({ ...teacher, password: e.target.value })
              }
            />
          </Box>

          <Button
            type="submit"
            disabled={loading}
            color="error"
            variant="contained"
            endIcon={<Login />}
            fullWidth
            size="large"
          >
            Login
          </Button>

          {/* SIGNUP */}
          <Box mt={3} textAlign="center">
            <Typography variant="body2" gutterBottom>
              <Link
                to="/teacher/signup"
                style={{ color: "#198754", textDecoration: "none" }}
              >
                Don&apos;t have an account? Sign up
              </Link>
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Link
                to="/"
                style={{ color: "GrayText", textDecoration: "none" }}
              >
                Login as a student
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default TeacherLogin;
