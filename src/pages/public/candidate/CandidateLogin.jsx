import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { TextField, Typography, Button, Box, Paper } from "@mui/material";
import { httpService } from "../../../httpService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Login } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,

    transition: {
      duration: 1,
      delay,
      ease: "easeOut",
    },
  }),
};

function CandidateLogin() {
  const [candidate, setCandidate] = useState({});
  const [loading, setLoading] = useState(false);

  const loginCandidate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await httpService.post("auth/login", candidate);

    if (data) window.location.href = "/";
    if (error) toast.error(error);

    setLoading(false);
  };

  const backgroundImage =
    "https://images.unsplash.com/photo-1510590124886-dc2653b48bf0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0";

  // return (
  //   <Box
  //     minHeight="100vh"
  //     display="flex"
  //     alignItems="center"
  //     justifyContent="center"
  //     bgcolor="#f8f9fa"
  //     px={2}
  //   >
  //     <Paper
  //       elevation={3}
  //       sx={{
  //         width: "100%",
  //         maxWidth: 420,
  //         p: { xs: 3, sm: 4 },
  //         borderRadius: 3,
  //       }}
  //     >
  //       {/* LOGO */}
  //       <Box textAlign="center" mb={3}>
  //         <img src={logo} alt="logo" height={70} />
  //         <Typography fontWeight={700} mt={1}>
  //           RCCG – New Life Assembly
  //         </Typography>
  //         <Typography color="error">E-Sunday School</Typography>
  //       </Box>

  //       {/* HEADER */}
  //       <Box textAlign="center" mb={4}>
  //         <Typography variant="h5" fontWeight={700}>
  //           Student Login
  //         </Typography>
  //         <Typography variant="body2" color="text.secondary">
  //           Enter your phone number to continue
  //         </Typography>
  //       </Box>

  //       {/* FORM */}
  //       <form onSubmit={loginCandidate}>
  //         <Box mb={3}>
  //           <TextField
  //             fullWidth
  //             label="Phone Number"
  //             onChange={(e) =>
  //               setCandidate({ ...candidate, phoneNumber: e.target.value })
  //             }
  //           />
  //         </Box>

  //         <Button
  //           type="submit"
  //           disabled={loading}
  //           color="error"
  //           variant="contained"
  //           endIcon={<Login />}
  //           fullWidth
  //           size="large"
  //         >
  //           Login
  //         </Button>

  //         {/* SIGNUP */}
  //         <Box mt={3} textAlign="center">
  //           <Typography variant="body2" gutterBottom>
  //             <Link
  //               to="/signup"
  //               style={{ color: "#198754", textDecoration: "none" }}
  //             >
  //               Don&apos;t have an account? Sign up
  //             </Link>
  //           </Typography>
  //           {/* <Typography variant="body2" gutterBottom>
  //             <Link
  //               to="/teacher"
  //               style={{ color: "GrayText", textDecoration: "none" }}
  //             >
  //               Login as a teacher
  //             </Link>
  //           </Typography> */}
  //         </Box>
  //       </form>
  //     </Paper>
  //   </Box>
  // );
  return (
    <>
      {/* HERO SECTION */}
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundImage: `
            linear-gradient(
              rgba(0,0,0,0.75),
              rgba(0,0,0,0.88)
            ),
            url(${backgroundImage})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 3,
          overflow: "hidden",
        }}
      >
        <Box maxWidth={750}>
          {/* LOGO */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.2}
          >
            <Box mb={3}>
              <img
                src={logo}
                alt="logo"
                style={{
                  height: 120,
                  width: 120,
                  objectFit: "contain",
                }}
              />
            </Box>
          </motion.div>

          {/* TITLE */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.5}
          >
            <Typography
              variant="h2"
              fontWeight={800}
              color="white"
              mb={2}
              sx={{
                fontSize: {
                  xs: "2.2rem",
                  md: "4rem",
                },
                lineHeight: 1.2,
              }}
            >
              RCCG New Life Assembly
            </Typography>
          </motion.div>

          {/* SUBTITLE */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.8}
          >
            <Typography
              variant="h5"
              color="rgba(255,255,255,0.8)"
              mb={5}
              sx={{
                fontSize: {
                  xs: "1rem",
                  md: "1.4rem",
                },
              }}
            >
              Region 45 E-Examination Portal
            </Typography>
          </motion.div>

          {/* BUTTON */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1.1}
          >
            <ScrollLink to="login-section" smooth={true} duration={800}>
              <Button
                variant="contained"
                color="error"
                size="large"
                sx={{
                  px: 5,
                  py: 1.6,
                  borderRadius: "50px",
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Proceed to Login
              </Button>
            </ScrollLink>
          </motion.div>
        </Box>
      </Box>

      {/* LOGIN SECTION */}
      <Box
        id="login-section"
        sx={{
          minHeight: "100vh",
          bgcolor: "#f4f6f8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 6,
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 80,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
          style={{ width: "100%", maxWidth: 450 }}
        >
          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 5,
              backdropFilter: "blur(10px)",
            }}
          >
            {/* HEADER */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.8,
              }}
              viewport={{ once: true }}
            >
              <Box textAlign="center" mb={4}>
                <Typography variant="h4" fontWeight={800} mb={1}>
                  Student Login
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Enter your registered phone number
                </Typography>
              </Box>
            </motion.div>

            {/* FORM */}
            <form onSubmit={loginCandidate}>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.8,
                }}
                viewport={{ once: true }}
              >
                <Box mb={3}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    onChange={(e) =>
                      setCandidate({
                        ...candidate,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </Box>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.6,
                  duration: 0.8,
                }}
                viewport={{ once: true }}
              >
                <Button
                  type="submit"
                  disabled={loading}
                  color="error"
                  variant="contained"
                  endIcon={<Login />}
                  fullWidth
                  size="large"
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                >
                  Login
                </Button>
              </motion.div>

              {/* SIGNUP */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.8,
                  duration: 0.8,
                }}
                viewport={{ once: true }}
              >
                <Box mt={3} textAlign="center">
                  <Typography variant="body2">
                    <Link
                      to="/signup"
                      style={{
                        color: "#198754",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      Don&apos;t have an account? Sign up
                    </Link>
                  </Typography>
                </Box>
              </motion.div>
            </form>
          </Paper>
        </motion.div>
      </Box>
    </>
  );
}

export default CandidateLogin;
