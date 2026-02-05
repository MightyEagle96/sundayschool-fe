import React, { useEffect, useState } from "react";
import { httpService } from "../../../httpService";
import { Button, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppUser } from "../../../contexts/AppUserContext";
import { Login } from "@mui/icons-material";
import Swal from "sweetalert2";

function ExaminationPage() {
  const [params] = useSearchParams();

  const examinationId = params.get("examination");
  const [examination, setExamination] = useState(null);

  const { user } = useAppUser();
  const getData = async () => {
    const { data, error } = await httpService("examination/viewexamination", {
      params: { id: examinationId },
    });

    if (data) {
      setExamination(data);
      console.log(data);
    }
    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();
  const moveToExamination = () => {
    Swal.fire({
      icon: "question",
      title: "Begin Examination",
      text: "Are you sure you want to begin this examination?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate(`/takeexamination?examination=${examinationId}`);
      }
    });
  };
  return (
    <div>
      <div className="container mt-5">
        {examination && (
          <div>
            <div className="mb-4">
              <Typography variant="h5" fontWeight={700} color={"primary"}>
                Examination Preview
              </Typography>
            </div>
            <div className="mb-5">
              <Typography gutterBottom>
                Dear{" "}
                <span className="text-capitalize fw-bold">
                  {user.firstName} {user.lastName}
                </span>
                , Welcome to{" "}
                <span className="text-uppercase fw-bold">
                  {examination.title}
                </span>
                .
              </Typography>
              <Typography>
                This examination is for {examination.duration} minutes. Kindly
                ensure your internet is stable and you have a stable device.
              </Typography>
              <Typography>
                Do not close the tab nor minimize the page as this will be
                presumed to be a malpractice.{" "}
              </Typography>
            </div>
            <div className="alert alert-warning col-lg-3 border-0">
              <Typography variant="caption">Class Category</Typography>
              <Typography
                variant="h4"
                textTransform={"uppercase"}
                fontWeight={700}
              >
                {user.classCategory}
              </Typography>
            </div>
            <div className="col-lg-3">
              <Button
                onClick={moveToExamination}
                fullWidth
                variant="contained"
                endIcon={<Login />}
              >
                begin examination
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExaminationPage;
