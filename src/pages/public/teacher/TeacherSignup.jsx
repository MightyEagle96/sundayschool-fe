import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { backgroundImage } from "../candidate/CandidateLogin";
import { motion } from "framer-motion";
import { Login, SchoolOutlined } from "@mui/icons-material";
import logo from "../../../assets/logo.png";
import { httpService } from "../../../httpService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};
const TeacherSignup = () => {
  const genders = ["male", "female"];

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    // email: "",
    phoneNumber: "",
    //password: "",
    // confirmPassword: "",
    classCategory: "",
    className: "",
  });

  const [errors, setErrors] = useState({});
  const [errorPhone, setErrorPhone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [fetchingCategories, setFetchingCategories] = useState(false);
  const [fetchingClasses, setFetchingClasses] = useState(false);
  const navigate = useNavigate();

  const [categories, setClassCategories] = useState([]);

  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [hasTypedPassword, setHasTypedPassword] = useState(false);

  const teacherPassword = "glory2glory";

  const handleUserData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Simple validators
  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email); // basic email regex

  const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone); // allows 10–15 digit numbers

  // const validatePasswords = (password, confirmPassword) =>
  //   password.length >= 6 && password === confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // if (!validateEmail(userData.email)) {
    //   newErrors.email = "Enter a valid email address";
    // }

    if (!validatePhone(userData.phoneNumber)) {
      newErrors.phoneNumber = "Phone must be 10–15 digits";
    }

    // if (userData.password.length < 6) {
    //   newErrors.password = "Password must be at least 6 characters";
    // }

    // if (userData.password !== userData.confirmPassword) {
    //   newErrors.confirmPassword = "Passwords do not match";
    // }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      Swal.fire({
        title: "Confirm Account Creation",
        text: "Please confirm that you want to create this account.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes, Create Account",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        focusCancel: true,

        confirmButtonColor: "#b71c1c",
        cancelButtonColor: "#6c757d",

        customClass: {
          popup: "swal-rounded",
          title: "swal-title",
          htmlContainer: "swal-text",
        },

        buttonsStyling: true,
        allowOutsideClick: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          const { data, error } = await httpService.post(
            "auth/teacher/register",
            userData,
          );

          if (data) {
            toast.success(data);
            navigate("/teacher");
          }
          if (error) {
            toast.error(error);
          }
          setLoading(false);
          //console.log("Account created successfully!");
        }
      });

      // ✅ submit form logic here (API call, etc.)
    }
  };

  const retrieveCategories = async () => {
    setFetchingCategories(true);
    const { data } = await httpService.get("/admin/classcategories");

    if (data) {
      setClassCategories(data);
    }
    setFetchingCategories(false);
  };

  useEffect(() => {
    retrieveCategories();
  }, []);

  const getClasses = async (id) => {
    setFetchingClasses(true);
    const { data } = await httpService.get(
      `/admin/classform?classCategory=${id}`,
    );
    if (data) {
      setClasses(data);
    }
    setFetchingClasses(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `
          linear-gradient(
            rgba(2,6,23,0.88),
            rgba(15,23,42,0.95)
          ),
          url(${backgroundImage})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        py: 6,
        px: 2,
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 60,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        style={{
          width: "100%",
          maxWidth: 1100,
        }}
      >
        <Paper
          elevation={12}
          sx={{
            borderRadius: 7,
            overflow: "hidden",
            backdropFilter: "blur(12px)",
            background: "rgba(255,255,255,0.96)",
          }}
        >
          <Grid container>
            {/* ================= LEFT PANEL ================= */}
            <Grid
              size={{ xs: 12, md: 5 }}
              sx={{
                background: `
                  linear-gradient(
                    rgba(15,118,110,0.88),
                    rgba(15,23,42,0.96)
                  ),
                  url(${backgroundImage})
                `,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 5,
                position: "relative",
              }}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={0.2}
              >
                <Box textAlign="center">
                  {/* BADGE */}
                  <Chip
                    icon={<SchoolOutlined color="white" />}
                    label="Teacher Portal"
                    sx={{
                      mb: 4,
                      bgcolor: "rgba(255,255,255,0.15)",
                      color: "white",
                      fontWeight: 700,
                      px: 1,
                      backdropFilter: "blur(10px)",
                    }}
                  />

                  {/* LOGO */}
                  <Box mb={3}>
                    <img
                      src={logo}
                      alt="logo"
                      style={{
                        height: 110,
                        width: 110,
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  {/* TITLE */}
                  <Typography variant="h3" fontWeight={800} mb={2}>
                    RCCG
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight={600}
                    mb={3}
                    sx={{
                      opacity: 0.95,
                    }}
                  >
                    Teacher Registration
                  </Typography>

                  {/* DESCRIPTION */}
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.9,
                      opacity: 0.85,
                      maxWidth: 350,
                      mx: "auto",
                    }}
                  >
                    Create your teacher account and gain access to manage
                    examinations, monitor students, and oversee the E-Sunday
                    School platform.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>

            {/* ================= RIGHT PANEL ================= */}
            <Grid
              size={{ xs: 12, md: 7 }}
              sx={{
                bgcolor: "white",
                p: {
                  xs: 3,
                  sm: 5,
                },
              }}
            >
              {/* HEADER */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={0.3}
              >
                <Box mb={4}>
                  <Typography variant="h4" fontWeight={800} mb={1}>
                    Create Teacher Account
                  </Typography>

                  <Typography color="text.secondary">
                    Fill in the information below to continue
                  </Typography>
                </Box>
              </motion.div>

              {/* ================= FORM ================= */}
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* FIRST NAME */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <motion.div
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      custom={0.4}
                    >
                      <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleUserData}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                      />
                    </motion.div>
                  </Grid>

                  {/* LAST NAME */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <motion.div
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      custom={0.5}
                    >
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleUserData}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                      />
                    </motion.div>
                  </Grid>

                  {/* GENDER */}
                  <Grid size={{ xs: 12 }}>
                    <motion.div
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      custom={0.6}
                    >
                      <TextField
                        fullWidth
                        select
                        label="Gender"
                        name="gender"
                        value={userData.gender}
                        onChange={handleUserData}
                      >
                        {genders.map((gender, i) => (
                          <MenuItem key={i} value={gender}>
                            {gender}
                          </MenuItem>
                        ))}
                      </TextField>
                    </motion.div>
                  </Grid>

                  {/* PHONE */}
                  <Grid size={{ xs: 12 }}>
                    <motion.div
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      custom={0.8}
                    >
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleUserData}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber}
                      />
                    </motion.div>
                  </Grid>

                  {/*CONFIRM PHONE NUMBER */}
                  <Grid size={{ xs: 12 }}>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      custom={0.7}
                    >
                      <TextField
                        fullWidth
                        label="Confirm phone number"
                        name="confirmPhoneNumber"
                        onBlur={(e) =>
                          setErrorPhone(e.target.value !== userData.phoneNumber)
                        }
                        type="tel"
                        error={errorPhone}
                        helperText={errorPhone && "Phone numbers do not match"}
                      />
                    </motion.div>
                  </Grid>

                  {/* CLASS CATEGORY */}
                  <Grid size={{ xs: 12 }}>
                    <motion.div
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      custom={0.9}
                    >
                      <TextField
                        fullWidth
                        label="Class Category"
                        select={!fetchingCategories}
                        disabled={categories.length === 0 || fetchingCategories}
                        name="classCategory"
                        onChange={(e) => {
                          handleUserData(e);
                          getClasses(e.target.value);
                        }}
                        sx={{
                          textTransform: "uppercase",
                        }}
                        slotProps={{
                          input: {
                            endAdornment: fetchingCategories ? (
                              <InputAdornment position="end">
                                <CircularProgress size={15} />
                              </InputAdornment>
                            ) : null,
                          },
                        }}
                      >
                        {categories.map((c) => (
                          <MenuItem
                            key={c._id}
                            value={c._id}
                            sx={{
                              textTransform: "uppercase",
                            }}
                          >
                            {c.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </motion.div>
                  </Grid>

                  {/* CLASSES */}
                  <Grid size={{ xs: 12 }}>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      custom={0.9}
                    >
                      <TextField
                        fullWidth
                        label="Classes"
                        select={!fetchingClasses}
                        disabled={classes.length === 0 || fetchingClasses}
                        name="classData"
                        onChange={(e) => {
                          handleUserData(e);
                        }}
                        sx={{
                          textTransform: "uppercase",
                        }}
                        slotProps={{
                          input: {
                            endAdornment: fetchingClasses ? (
                              <InputAdornment position="end">
                                <CircularProgress size={15} />
                              </InputAdornment>
                            ) : null,
                          },
                        }}
                      >
                        {classes.map((c) => (
                          <MenuItem
                            key={c._id}
                            value={c._id}
                            sx={{
                              textTransform: "uppercase",
                            }}
                          >
                            {c.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </motion.div>
                  </Grid>

                  {/*CONFIRM PASSWORD */}
                  <Grid size={{ xs: 12 }}>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      custom={0.7}
                    >
                      <TextField
                        fullWidth
                        label="Teacher's password"
                        name="password"
                        type="password"
                        onBlur={(e) =>
                          setPasswordCorrect(e.target.value === teacherPassword)
                        }
                        onChange={(e) => setHasTypedPassword(true)}
                        error={!passwordCorrect && hasTypedPassword}
                        helperText={
                          hasTypedPassword &&
                          !passwordCorrect &&
                          "Incorrect password"
                        }
                      />
                    </motion.div>
                  </Grid>

                  {/* BUTTON */}
                  <Grid size={{ xs: 12 }}>
                    <motion.div
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      custom={1.3}
                    >
                      <Button
                        type="submit"
                        fullWidth
                        size="large"
                        variant="contained"
                        endIcon={
                          loading ? (
                            <CircularProgress size={18} color="inherit" />
                          ) : (
                            <Login />
                          )
                        }
                        disabled={loading || errorPhone || !passwordCorrect}
                        sx={{
                          py: 1.7,
                          borderRadius: 3,
                          fontWeight: 700,
                          textTransform: "none",
                          fontSize: "1rem",

                          background: "linear-gradient(135deg,#0f766e,#134e4a)",
                          boxShadow: "0 10px 30px rgba(15,118,110,0.25)",

                          "&:hover": {
                            background:
                              "linear-gradient(135deg,#115e59,#042f2e)",
                          },

                          "&.Mui-disabled": {
                            background: "#94a3b8",
                            color: "#ffffff",
                            boxShadow: "none",
                            opacity: 0.8,
                          },
                        }}
                      >
                        Create Teacher Account
                      </Button>

                      {/* FOOTER */}
                      <Box mt={3} textAlign="center">
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                          }}
                        >
                          Already have a teacher account?{" "}
                          <Link
                            to="/teacher/login"
                            style={{
                              color: "#0f766e",
                              textDecoration: "none",
                              fontWeight: 700,
                            }}
                          >
                            Login here
                          </Link>
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            mt: 1,
                          }}
                        >
                          <Link
                            to="/"
                            style={{
                              color: "#64748b",
                              textDecoration: "none",
                            }}
                          >
                            Return to student portal
                          </Link>
                        </Typography>
                      </Box>
                    </motion.div>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default TeacherSignup;
