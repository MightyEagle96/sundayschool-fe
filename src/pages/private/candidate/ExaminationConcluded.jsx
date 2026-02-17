import React from "react";
import { Button, Typography } from "@mui/material";
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
        <div className="text-center">
          <Button component={Link} to="/examinationscore">
            <Typography variant="body2" color="success">
              View examination score
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExaminationConcluded;
