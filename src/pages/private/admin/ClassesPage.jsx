import React, { useState } from "react";
import { ApplicationNavigation } from "../../../routes/MainRoutes";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { httpService } from "../../../httpService";
import { toast } from "react-toastify";

function ClassesPage() {
  const classes = ["Adult", "YAYA"];

  const [classData, setClassData] = useState({});
  const [loading, setLoading] = useState(false);

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
  return (
    <div>
      <div className="my-5 container">
        <ApplicationNavigation links={[]} pageTitle={"Classes"} />

        <div className="mt-5">
          <div className="text-muted mb-3">
            <Typography variant="h4" fontWeight={700}>
              Classes
            </Typography>
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
                >
                  {classes.map((c, i) => (
                    <MenuItem value={c} key={i}>
                      {c}
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
      </div>
    </div>
  );
}

export default ClassesPage;
