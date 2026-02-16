import React, { useEffect, useState } from "react";
import { ApplicationNavigation } from "../../../routes/MainRoutes";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { httpService } from "../../../httpService";
import { toast } from "react-toastify";
import { Add } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

function ClassesPage() {
  const [classData, setClassData] = useState({});
  const [loading, setLoading] = useState(false);
  const [classCategory, setClassCategory] = useState("");
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [categories, setClassCategories] = useState([]);
  const [classes, setClasses] = useState([]);

  const createData = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "question",
      title: "Create Class",
      text: "Are you sure you want to create this class?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const { data, error } = await httpService.post(
          "admin/createclass",
          classData,
        );

        if (data) {
          toast.success(data);
          getClasses();
        }
        if (error) {
          toast.error(error);
        }
        setLoading(false);
      }
    });
  };

  const handleChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  const addClassCategory = () => {
    Swal.fire({
      icon: "question",
      title: "Class Category",
      text: "Are you sure you want to create this class category",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setCreatingCategory(true);
        const { data, error } = await httpService.post(
          "/admin/addclasscategory",
          { name: classCategory },
        );

        if (data) {
          toast.success(data);
          retrieveCategories();
        }
        if (error) {
          toast.error(error);
        }
        setCreatingCategory(false);
      }
    });
  };

  const retrieveCategories = async () => {
    setCreatingCategory(true);
    const { data } = await httpService.get("/admin/classcategories");

    if (data) {
      setClassCategories(data);
    }
    setCreatingCategory(false);
  };

  const getClasses = async () => {
    setLoading(true);
    const { data } = await httpService.get("/admin/classes");
    if (data) {
      setClasses(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    retrieveCategories();
    getClasses();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "name",
      headerName: "Name",
      width: 300,
      renderCell: (params) => (
        <div className="text-uppercase">{params.row.name}</div>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      width: 300,
      renderCell: (params) => (
        <div className="text-uppercase">{params.row.classCategory.name}</div>
      ),
    },
    // {
    //   field: "category",
    //   headerName: "Category",
    //   width: 400,
    // },
  ];
  return (
    <div>
      <div className="my-5 container">
        <ApplicationNavigation links={[]} pageTitle={"Classes"} />

        <div className="my-4">
          <div className="text-muted mb-5">
            <div className="row">
              <div className="col-lg-3">
                <Typography variant="h4" fontWeight={700}>
                  Classes
                </Typography>
              </div>
              <div className="col-lg-3">
                <TextField
                  label="Add category"
                  fullWidth
                  onChange={(e) => setClassCategory(e.target.value)}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={creatingCategory || !classCategory}
                            onClick={addClassCategory}
                          >
                            {creatingCategory ? (
                              <CircularProgress size={15} />
                            ) : (
                              <Add />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <form onSubmit={createData}>
              <div className="mb-3">
                <TextField
                  name="classCategory"
                  onChange={handleChange}
                  fullWidth
                  select
                  label="Class Category"
                  //className="text-upp"
                >
                  {categories.map((c, i) => (
                    <MenuItem className="text-uppercase" value={c._id} key={i}>
                      {c.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="mb-3">
                <TextField
                  name="name"
                  onChange={handleChange}
                  fullWidth
                  label="Class Name"
                />
              </div>
              <div>
                <Button
                  endIcon={<Add />}
                  loadingPosition="end"
                  loading={loading}
                  fullWidth
                  variant="contained"
                  type="submit"
                >
                  Add Class
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <DataGrid loading={loading} rows={classes} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default ClassesPage;
