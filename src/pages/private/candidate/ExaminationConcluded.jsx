import React from "react";
import { Typography } from "@mui/material";

function ExaminationConcluded() {
  return (
    <div>
      <div className="container my-5">
        <div className="text-center">
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Examination Concluded
          </Typography>
          <Typography variant="body1">
            You have successfully completed the examination.
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default ExaminationConcluded;
