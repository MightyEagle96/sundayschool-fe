// import React, { useState } from "react";
// import logo from "../../../assets/logo.png";
// import {
//   TextField,
//   Typography,
//   InputAdornment,
//   IconButton,
//   Button,
// } from "@mui/material";
// import { httpService } from "../../../httpService";
// import { toast } from "react-toastify";
// import { Nav } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { Login, Visibility, VisibilityOff } from "@mui/icons-material";

// function CandidateLogin() {
//   const [candidate, setCandidate] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [passwordType, setPasswordType] = useState(false);
//   const loginCandidate = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const { data, error } = await httpService.post("auth/login", candidate);
//     if (data) {
//       window.location.href = "/";
//     }
//     if (error) {
//       toast.error(error);
//     }

//     setLoading(false);
//   };

//   return (
//     <div>
//       <div className="row m-0">
//         <div className="col-lg-6 homePage d-flex align-items-center">
//           <div className="p-5 text-white">
//             <img
//               src={logo}
//               alt="logo"
//               className="d-inline-block align-top me-2 mb-3"
//               height={100}
//             />
//             <Typography variant="h2" fontWeight={700}>
//               RCCG
//             </Typography>
//             <Typography variant="h5" fontWeight={300}>
//               New Life Assembly E-Exam Portal
//             </Typography>
//           </div>
//         </div>
//         <div className="col-lg-6 d-flex justify-content-center align-items-center">
//           <div className="col-lg-8">
//             <div className="d-flex justify-content-center mb-3">
//               <img
//                 src={logo}
//                 alt="logo"
//                 className="d-inline-block align-top me-2"
//                 height={70}
//               />
//             </div>
//             <div className="text-center mb-5">
//               <div>
//                 <Typography variant="h4" fontWeight={700} gutterBottom>
//                   Candidate Login
//                 </Typography>
//                 <Typography variant="body1">
//                   To login into your account as a candidate, please enter your
//                   email and password
//                 </Typography>
//               </div>
//             </div>
//             <form onSubmit={loginCandidate}>
//               <div className="mb-4">
//                 <TextField
//                   fullWidth
//                   label="Email Address"
//                   onChange={(e) =>
//                     setCandidate({ ...candidate, email: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="mb-4">
//                 <TextField
//                   fullWidth
//                   label="Password"
//                   type={passwordType ? "text" : "password"}
//                   slotProps={{
//                     input: {
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <IconButton
//                             onClick={() => setPasswordType(!passwordType)}
//                           >
//                             {passwordType ? <VisibilityOff /> : <Visibility />}
//                           </IconButton>
//                         </InputAdornment>
//                       ),
//                     },
//                   }}
//                   onChange={(e) =>
//                     setCandidate({ ...candidate, password: e.target.value })
//                   }
//                 />
//               </div>
//               <Button
//                 type="submit"
//                 loading={loading}
//                 loadingPosition="end"
//                 color="error"
//                 variant="contained"
//                 endIcon={<Login />}
//                 fullWidth
//               >
//                 Login
//               </Button>
//               <div className="mt-4 text-center">
//                 <Typography color="GrayText" variant="body2">
//                   <Nav.Link as={Link} to={"/signup"} className="text-success">
//                     Don't have an account? Sign up now
//                   </Nav.Link>
//                   {/* <a href="/admin/login" className="text-success">
//                       Login as admin
//                     </a> */}
//                 </Typography>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CandidateLogin;

import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import {
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { httpService } from "../../../httpService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Login, Visibility, VisibilityOff } from "@mui/icons-material";

function CandidateLogin() {
  const [candidate, setCandidate] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState(false);

  const loginCandidate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await httpService.post("auth/login", candidate);

    if (data) window.location.href = "/";
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
            Student Login
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
                setCandidate({ ...candidate, email: e.target.value })
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
                setCandidate({ ...candidate, password: e.target.value })
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
                to="/signup"
                style={{ color: "#198754", textDecoration: "none" }}
              >
                Don&apos;t have an account? Sign up
              </Link>
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Link
                to="/teacher"
                style={{ color: "GrayText", textDecoration: "none" }}
              >
                Login as a teacher
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default CandidateLogin;
