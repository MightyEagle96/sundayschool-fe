import {
  Alert,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Add, Delete, Edit } from "@mui/icons-material";
import { httpService } from "../../../httpService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { DataGrid } from "@mui/x-data-grid";

function Examinations() {
  const [show, setShow] = useState(false);
  const [examination, setExamination] = useState("");
  const [loading, setLoading] = useState(false);
  const [examinations, setExaminations] = useState([]);
  const [examinationId, setExaminationId] = useState("");

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
          examinationId,
        });

        if (data) {
          toast.success(data);
          getData();
          // console.log(data);
        }
        if (error) {
          toast.error(error);
        }
        setShow(false);
        setLoading(false);

        setExamination("");
        setExaminationId("");
      }
    });
  };

  const columns = [
    { field: "id", headerName: "S/N", width: 70 },
    { headerName: "Title", field: "title", width: 400 },
    {
      headerName: "Edit",
      field: "edit",
      width: 100,
      renderCell: (params) => {
        return (
          <IconButton
            color="warning"
            onClick={() => {
              editData(params.row);
            }}
          >
            <Edit />
          </IconButton>
        );
      },
    },
    {
      headerName: "Delete",
      field: "delete",
      width: 100,
      renderCell: (params) => {
        return (
          <IconButton color="error" onClick={() => {}}>
            <Delete />
          </IconButton>
        );
      },
    },
  ];

  const editData = (data) => {
    setExamination(data.title);
    setExaminationId(data._id);
    setShow(true);
  };
  const getData = async () => {
    setLoading(true);
    const { data } = await httpService("examination/view");

    if (data) {
      setExaminations(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="container mt-5 mb-5">
        <div className="mb-4">
          <Typography variant="h4" fontWeight={700}>
            Examinations
          </Typography>
          <Button endIcon={<Add />} onClick={() => setShow(!show)}>
            Create new examination
          </Button>
        </div>
        <div>
          <DataGrid
            columns={columns}
            rows={examinations}
            rowCount={examinations.length}
            loading={loading}
          />
        </div>
      </div>
      <Modal
        show={show}
        onHide={() => {
          setShow(!show);
          setExamination("");
        }}
      >
        <Modal.Header className="border-0 bg-light" closeButton>
          <Modal.Title>
            {examination ? "Update Examination" : "Create Examination"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert severity="info" className="mb-3">
            {examination
              ? "Update examination name."
              : "Create new examination."}{" "}
            For example,{" "}
            <strong>1st Quarter 2025/2026 Sunday school examination</strong>.
          </Alert>

          <div className="mt-3">
            <TextField
              fullWidth
              label="Examination name"
              variant="outlined"
              onChange={(e) => setExamination(e.target.value)}
              value={examination}
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
