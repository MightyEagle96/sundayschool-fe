import { Alert, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Add } from "@mui/icons-material";
import { httpService } from "../../../httpService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function Examinations() {
  const [show, setShow] = useState(false);
  const [examination, setExamination] = useState("");
  const [loading, setLoading] = useState(false);

  const createExamination = () => {
    Swal.fire({
      icon: "question",
      title: "Create examination?",

      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const { data, error } = await httpService.post("examination/create", {
          title: examination,
        });

        if (data) {
          toast.success(data);
          // console.log(data);
        }
        if (error) {
          toast.error(error);
        }
        setShow(false);
        setLoading(false);
      }
    });
  };
  return (
    <div>
      <div className="container mt-5 mb-5">
        <div className="mb-4">
          <Typography variant="h4" fontWeight={700}>
            Examinations
          </Typography>
          <Button endIcon={<Add />} onClick={() => setShow(!show)}>
            Create new examiantion
          </Button>
        </div>
        <div></div>
      </div>
      <Modal show={show} onHide={() => setShow(!show)}>
        <Modal.Header className="border-0 bg-light" closeButton>
          <Modal.Title>Create new examination</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert severity="info" className="mb-3">
            Create a new examination. For example,{" "}
            <strong>1st Quarter 2025/2026 Sunday school examination</strong>.
          </Alert>

          <div className="mt-3">
            <TextField
              fullWidth
              label="Examination name"
              variant="outlined"
              onChange={(e) => setExamination(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={createExamination}
            variant="contained"
            className="me-2"
            loading={loading}
          >
            Create
          </Button>
          <Button color="error" onClick={() => setShow(!show)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Examinations;
