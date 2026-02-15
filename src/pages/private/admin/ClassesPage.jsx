import React, { useState } from "react";
import { ApplicationNavigation } from "../../../routes/MainRoutes";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";

function ClassesPage() {
  const classes = ["Adult", "YAYA"];

  const [classData] = useState({});

  const createData = () => {
    Swal.fire({
      icon: "question",
      title: "Create Class",
      text: "Are you sure you want to create this class?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
      }
    });
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
            <form>
              <div className="mb-3">
                <TextField fullWidth select label="Class Category">
                  {classes.map((c, i) => (
                    <MenuItem value={c} key={i}>
                      {c}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="mb-3">
                <TextField fullWidth label="Class Name" />
              </div>
              <div>
                <Button fullWidth variant="contained" type="submit">
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
