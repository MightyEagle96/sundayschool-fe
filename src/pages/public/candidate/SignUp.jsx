import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../../../assets/logo.png";
import Swal from "sweetalert2";
import { httpService } from "../../../httpService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Login } from "@mui/icons-material";
import { motion } from "framer-motion";

const backgroundImage =
  "https://images.unsplash.com/photo-1510590124886-dc2653b48bf0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.8,
      delay,
      ease: "easeOut",
    },
  }),
};

function SignUp() {
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
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [fetchingCategories, setFetchingCategories] = useState(false);
  const [fetchingClasses, setFetchingClasses] = useState(false);
  const navigate = useNavigate();

  const [categories, setClassCategories] = useState([]);

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
            "auth/register",
            userData,
          );

          if (data) {
            toast.success(data);
            navigate("/");
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
      console.log(data);
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
            rgba(0,0,0,0.80),
            rgba(0,0,0,0.90)
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
          scale: 0.95,
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
          maxWidth: 900,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            borderRadius: 6,
            overflow: "hidden",
            backdropFilter: "blur(12px)",
          }}
        >
          <Grid container>
            {/* LEFT PANEL */}
            <Grid
              size={{ xs: 12, md: 5 }}
              sx={{
                background: `
                  linear-gradient(
                    rgba(183,28,28,0.85),
                    rgba(0,0,0,0.90)
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
              }}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={0.2}
              >
                <Box textAlign="center">
                  <Box mb={3}>
                    <img
                      src={logo}
                      alt="logo"
                      style={{
                        height: 100,
                        width: 100,
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  <Typography variant="h4" fontWeight={800} mb={2}>
                    RCCG New Life Assembly
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      opacity: 0.85,
                      lineHeight: 1.8,
                    }}
                  >
                    Join the Region 45 E-Sunday School examination portal and
                    begin your journey.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>

            {/* RIGHT PANEL */}
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
                    Create Account
                  </Typography>

                  <Typography color="text.secondary">
                    Register for Sunday School access
                  </Typography>
                </Box>
              </motion.div>

              {/* FORM */}
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* FIRST NAME */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      custom={0.4}
                    >
                      <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleUserData}
                      />
                    </motion.div>
                  </Grid>

                  {/* LAST NAME */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      custom={0.5}
                    >
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleUserData}
                      />
                    </motion.div>
                  </Grid>

                  {/* GENDER */}
                  <Grid size={{ xs: 12 }}>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      custom={0.6}
                    >
                      <TextField
                        fullWidth
                        label="Gender"
                        select
                        name="gender"
                        onChange={handleUserData}
                      >
                        {genders.map((c, i) => (
                          <MenuItem key={i} value={c}>
                            {c}
                          </MenuItem>
                        ))}
                      </TextField>
                    </motion.div>
                  </Grid>

                  {/* PHONE NUMBER */}
                  <Grid size={{ xs: 12 }}>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      custom={0.7}
                    >
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleUserData}
                        type="number"
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber}
                      />
                    </motion.div>
                  </Grid>

                  {/* CLASS CATEGORY */}
                  <Grid size={{ xs: 12 }}>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      custom={0.8}
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

                  {/* BUTTON */}
                  <Grid size={{ xs: 12 }}>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      custom={1}
                    >
                      <Button
                        loading={loading}
                        endIcon={<Login />}
                        type="submit"
                        variant="contained"
                        color="error"
                        fullWidth
                        size="large"
                        disabled={loading}
                        sx={{
                          py: 1.6,
                          borderRadius: 3,
                          fontWeight: 700,
                          textTransform: "none",
                          fontSize: "1rem",
                        }}
                      >
                        Create Account
                      </Button>

                      <Box mt={3} textAlign="center">
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontSize: "0.95rem",
                          }}
                        >
                          Already have an account?{" "}
                          <Link
                            to="/"
                            style={{
                              color: "#b71c1c",
                              textDecoration: "none",
                              fontWeight: 700,
                              transition: "0.3s",
                            }}
                          >
                            Login here
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
}

export default SignUp;
