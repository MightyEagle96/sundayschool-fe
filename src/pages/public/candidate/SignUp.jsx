import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import Swal from "sweetalert2";
import { httpService } from "../../../httpService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Login } from "@mui/icons-material";

function SignUp() {
  const genders = ["male", "female"];

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
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

  const validatePasswords = (password, confirmPassword) =>
    password.length >= 6 && password === confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!validateEmail(userData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!validatePhone(userData.phoneNumber)) {
      newErrors.phoneNumber = "Phone must be 10–15 digits";
    }

    if (userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      Swal.fire({
        icon: "question",
        title: "Create your account?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
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
      `/admin/classes?classCategory=${id}`,
    );
    if (data) {
      console.log(data);
      setClasses(data);
    }
    setFetchingClasses(false);
  };

  return (
    <div>
      <div className="container mt-5 mb-5">
        <div className="mb-4">
          <Typography variant="h5" fontWeight={700}>
            Create your sunday school account
          </Typography>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="mb-4">
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleUserData}
                />
              </div>
              <div className="mb-4">
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleUserData}
                />
              </div>
              <div className="mb-4">
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
              </div>

              <div className="mb-4">
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
                  sx={{ textTransform: "uppercase" }}
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
                      sx={{ textTransform: "uppercase" }}
                      key={c._id}
                      value={c._id}
                    >
                      {c.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="mb-4">
                <TextField
                  fullWidth
                  label="Classes"
                  select={!fetchingClasses}
                  disabled={classes.length === 0 || fetchingClasses}
                  name="classData"
                  onChange={(e) => {
                    handleUserData(e);
                    //getClasses(e.target.value);
                  }}
                  sx={{ textTransform: "uppercase" }}
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
                      sx={{ textTransform: "uppercase" }}
                      key={c._id}
                      value={c._id}
                    >
                      {c.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>

            <div className="col-lg-6 mb-4">
              <div className="mb-4">
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleUserData}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </div>
              <div className="mb-4">
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
              </div>
              <div className="mb-4">
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleUserData}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </div>
              <div className="mb-4">
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleUserData}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                />
              </div>
            </div>
          </div>

          <div className="mb-4 text-center">
            <Button
              loading={loading}
              endIcon={<Login />}
              type="submit"
              variant="contained"
              disabled={loading}
            >
              create account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
