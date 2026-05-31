import React, { useEffect, useState } from "react";
import { ApplicationNavigation } from "../../../routes/MainRoutes";
import { httpService } from "../../../httpService";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import {
  Button,
  CircularProgress,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { Login } from "@mui/icons-material";
import Swal from "sweetalert2";

function Users() {
  const [refresh, setRefresh] = useState(false);
  const genders = ["male", "female"];
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid uses 0-based index
    pageSize: 50, // rows per page
  });
  const [students, setStudents] = useState([]);
  const [rowCount, setRowCount] = useState(0); // total records in DB
  const [fetchingCategories, setFetchingCategories] = useState(false);
  const [fetchingClasses, setFetchingClasses] = useState(false);
  const [categories, setClassCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [classes, setClasses] = useState([]);
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
  const getCandidatess = async () => {
    setLoading(true);
    const { data, error } = await httpService.get("/auth/candidates", {
      params: {
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      },
    });

    if (data) {
      setStudents(data.candidates);
      setRowCount(data.total);
    }

    if (error) {
      toast.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCandidatess();
  }, [paginationModel, refresh]);

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

  const columns = [
    {
      field: "id",
      headerName: "S/N",
      width: 100,
      renderCell: (params) => <div>{params.row.id}</div>,
    },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      renderCell: (params) => (
        <div className="text-capitalize">
          {params.row.firstName} {params.row.lastName}
        </div>
      ),
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 250,
      renderCell: (params) => (
        <div className="text-lowercase">{params.row.phoneNumber}</div>
      ),
    },
    {
      field: "classData",
      headerName: "Class",
      width: 250,
      renderCell: (params) => (
        <div className="text-uppercase">{params.row.classData.name}</div>
      ),
    },
    {
      field: "classCategory",
      headerName: "Class Category",
      width: 250,
      renderCell: (params) => (
        <div className="text-uppercase">{params.row.classCategory.name}</div>
      ),
    },
  ];

  const handleUserData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone); // allows 10–15 digit numbers

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
            setRefresh(!refresh);
            //navigate("/");
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
        <ApplicationNavigation links={[]} pageTitle={"Candidates"} />

        <div className="mb-3">
          <Button variant="contained" onClick={() => setShow(!show)}>
            create candidate
          </Button>
        </div>

        <DataGrid
          loading={loading}
          columns={columns}
          rows={students}
          rowCount={rowCount}
          onPaginationModelChange={setPaginationModel}
          paginationMode="server"
        />
      </div>

      <div>
        <Modal
          backdrop="static"
          centered
          show={show}
          onHide={() => setShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className=" mb-4">
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

              <div className=" mb-4"></div>

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
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Users;
