import React, { useState } from "react";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { adultClasses, yayaClasses } from "../../utils";
import Swal from "sweetalert2";
import { httpService } from "../../httpService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp() {
  const classes = ["adult", "yaya"];
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

  const navigate = useNavigate();

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
      setLoading(true);

      Swal.fire({
        icon: "question",
        title: "Create your account?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data, error } = await httpService.post(
            "auth/register",
            userData
          );

          if (data) {
            navigate("/");
          }
          if (error) {
            toast.error(error);
          }
          //console.log("Account created successfully!");
        }
      });

      // ✅ submit form logic here (API call, etc.)
      console.log("Form submitted:", userData);
      setLoading(false);
    }
  };

  let classList =
    userData.classCategory && userData.classCategory === "adult"
      ? adultClasses
      : yayaClasses;

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
                  label="Class Category"
                  fullWidth
                  select
                  name="classCategory"
                  value={userData.classCategory}
                  onChange={handleUserData}
                >
                  {classes.map((c, i) => (
                    <MenuItem key={i} value={c}>
                      {c.toUpperCase()}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="mb-4">
                <TextField
                  disabled={!userData.classCategory}
                  fullWidth
                  label="Class Name"
                  select
                  name="className"
                  value={userData.className}
                  onChange={handleUserData}
                >
                  {classList.map((c, i) => (
                    <MenuItem key={i} value={c}>
                      {c.toUpperCase()}
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
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
