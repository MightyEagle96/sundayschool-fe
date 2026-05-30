// import {
//   Box,
//   Button,
//   IconButton,
//   InputAdornment,
//   Paper,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import logo from "../../../assets/logo.png";

// import { httpService } from "../../../httpService";
// import { toast } from "react-toastify";

// import { Login, Visibility, VisibilityOff } from "@mui/icons-material";

// function TeacherLogin() {
//   const [teacher, setTeacher] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [passwordType, setPasswordType] = useState("password");

//   const loginCandidate = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const { data, error } = await httpService.post(
//       "auth/teacher/login",
//       teacher,
//     );

//     if (data) window.location.href = "/teacher";
//     if (error) toast.error(error);

//     setLoading(false);
//   };

//   return (
//     <Box
//       minHeight="100vh"
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       bgcolor="#f8f9fa"
//       px={2}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           width: "100%",
//           maxWidth: 420,
//           p: { xs: 3, sm: 4 },
//           borderRadius: 3,
//         }}
//       >
//         {/* LOGO */}
//         <Box textAlign="center" mb={3}>
//           <img src={logo} alt="logo" height={70} />
//           <Typography fontWeight={700} mt={1}>
//             RCCG – New Life Assembly
//           </Typography>
//           <Typography color="error">E-Sunday School</Typography>
//         </Box>

//         {/* HEADER */}
//         <Box textAlign="center" mb={4}>
//           <Typography variant="h5" fontWeight={700}>
//             Teacher Login
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Enter your email and password to continue
//           </Typography>
//         </Box>

//         {/* FORM */}
//         <form onSubmit={loginCandidate}>
//           <Box mb={3}>
//             <TextField
//               fullWidth
//               label="Email Address"
//               onChange={(e) =>
//                 setTeacher({ ...teacher, email: e.target.value })
//               }
//             />
//           </Box>

//           <Box mb={3}>
//             <TextField
//               fullWidth
//               label="Password"
//               type={passwordType ? "text" : "password"}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={() => setPasswordType(!passwordType)}
//                       edge="end"
//                     >
//                       {passwordType ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//               onChange={(e) =>
//                 setTeacher({ ...teacher, password: e.target.value })
//               }
//             />
//           </Box>

//           <Button
//             type="submit"
//             disabled={loading}
//             color="error"
//             variant="contained"
//             endIcon={<Login />}
//             fullWidth
//             size="large"
//           >
//             Login
//           </Button>

//           {/* SIGNUP */}
//           <Box mt={3} textAlign="center">
//             <Typography variant="body2" gutterBottom>
//               <Link
//                 to="/teacher/signup"
//                 style={{ color: "#198754", textDecoration: "none" }}
//               >
//                 Don&apos;t have an account? Sign up
//               </Link>
//             </Typography>
//             <Typography variant="body2" gutterBottom>
//               <Link
//                 to="/"
//                 style={{ color: "GrayText", textDecoration: "none" }}
//               >
//                 Login as a student
//               </Link>
//             </Typography>
//           </Box>
//         </form>
//       </Paper>
//     </Box>
//   );
// }

// export default TeacherLogin;

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

import { Login, Visibility, VisibilityOff } from "@mui/icons-material";

import { motion } from "framer-motion";

import logo from "../../../assets/logo.png";

import { httpService } from "../../../httpService";
import { toast } from "react-toastify";
import { backgroundImage } from "../candidate/CandidateLogin";

function TeacherLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const [loading, setLoading] = useState(false);

  // FIXED
  const [showPassword, setShowPassword] = useState(false);

  const loginCandidate = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { data, error } = await httpService.post("auth/teacher/login", {
      phoneNumber,
    });

    if (data) {
      toast.success("Login successful");
      window.location.href = "/teacher";
    }

    if (error) {
      toast.error(error);
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `
          linear-gradient(
            rgba(0,0,0,0.82),
            rgba(0,0,0,0.90)
          ),
          url(${backgroundImage})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 4,
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        style={{
          width: "100%",
          maxWidth: 450,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            borderRadius: 5,
            overflow: "hidden",
            backdropFilter: "blur(12px)",
            background: "rgba(255,255,255,0.96)",
          }}
        >
          {/* TOP BANNER */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #7f1d1d, #1f2937)",
              color: "white",
              py: 5,
              px: 4,
              textAlign: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={logo}
                alt="logo"
                style={{
                  height: 90,
                  marginBottom: 16,
                }}
              />
            </motion.div>

            <Typography variant="h5" fontWeight={800} gutterBottom>
              RCCG New Life Assembly
            </Typography>

            <Typography
              variant="body2"
              sx={{
                opacity: 0.85,
                lineHeight: 1.7,
              }}
            >
              Region 45 Teacher Examination Portal
            </Typography>
          </Box>

          {/* FORM AREA */}
          <Box
            sx={{
              p: {
                xs: 3,
                sm: 5,
              },
            }}
          >
            {/* HEADER */}
            <Box textAlign="center" mb={4}>
              <Typography variant="h4" fontWeight={800} gutterBottom>
                Teacher Login
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Enter your phone number to continue
              </Typography>
            </Box>

            {/* FORM */}
            <form onSubmit={loginCandidate}>
              {/* Phone Number */}
              <Box mb={3}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Box>

              {/* PASSWORD */}

              {/* BUTTON */}
              <Button
                type="submit"
                disabled={loading}
                color="error"
                variant="contained"
                endIcon={<Login />}
                fullWidth
                size="large"
                sx={{
                  py: 1.6,
                  borderRadius: 3,
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Login to Portal
              </Button>

              {/* FOOTER LINKS */}
              <Box mt={4} textAlign="center">
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mb: 1,
                  }}
                >
                  Don&apos;t have a teacher account?{" "}
                  <Link
                    to="/teacher/signup"
                    style={{
                      color: "#b71c1c",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    Register here
                  </Link>
                </Typography>

                <Typography variant="body2">
                  <Link
                    to="/"
                    style={{
                      color: "#6b7280",
                      textDecoration: "none",
                    }}
                  >
                    Login as student
                  </Link>
                </Typography>
              </Box>
            </form>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default TeacherLogin;
