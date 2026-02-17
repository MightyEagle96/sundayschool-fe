import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ExaminationConcluded() {
  return (
    <div>
      <div className="container my-5">
        <div className="text-center mb-3">
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Examination Concluded
          </Typography>
          <Typography variant="body1">
            You have successfully completed the examination.
          </Typography>
        </div>
        <div>
          <Typography
            variant="body1"
            color="success"
            component={Link}
            to="/examinationscore"
          >
            View examination score
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default ExaminationConcluded;
