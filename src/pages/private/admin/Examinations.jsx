import {
  Alert,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  Add,
  CheckCircle,
  Clear,
  Delete,
  Edit,
  Timelapse,
  ToggleOff,
} from "@mui/icons-material";
import { httpService } from "../../../httpService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { DataGrid } from "@mui/x-data-grid";
import { ApplicationNavigation } from "../../../routes/MainRoutes";

function Examinations() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [examination, setExamination] = useState("");
  const [loading, setLoading] = useState(false);
  const [examinations, setExaminations] = useState([]);
  const [examinationId, setExaminationId] = useState("");
  const [duration, setDuration] = useState(0);
  const [examIdinFocus, setExamIdinfocus] = useState(0);

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
    {
      headerName: "Title",
      field: "title",
      flex: 1,
      renderCell: (params) => (
        <div className="text-uppercase">{params.row.title}</div>
      ),
    },
    {
      headerName: "Active Status",
      field: "active",
      renderCell: (params) => (
        <div>
          {params.row.active ? (
            <CheckCircle color="success" />
          ) : (
            <Clear color="error" />
          )}
        </div>
      ),
    },
    {
      headerName: "Duration",
      field: "duration",
      renderCell: (params) => (
        <div>
          <Button
            onClick={() => {
              setShow2(true);
              setExamIdinfocus(params.row._id);
            }}
            startIcon={<Timelapse />}
            sx={{ textTransform: "lowercase" }}
          >
            {params.row.duration} mins
          </Button>
        </div>
      ),
    },
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
      headerName: "Activate",
      field: "_id",
      width: 100,
      renderCell: (params) => {
        return (
          <IconButton
            color="success"
            onClick={() => {
              toggleExamination(params.row._id);
            }}
          >
            <ToggleOff />
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
          <IconButton
            color="error"
            onClick={() => {
              deleteExamination(params.row._id);
            }}
          >
            <Delete />
          </IconButton>
        );
      },
    },
  ];

  const toggleExamination = (id) => {
    Swal.fire({
      icon: "question",
      title: "Toggle Examination",
      text: "Are you sure you want to toggle this examination? This will make it accessible for the candidates",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data, error } = await httpService.get(
          "examination/toggleactivation",
          {
            params: { id },
          },
        );

        if (data) {
          toast.success(data);
          getData();
        }

        if (error) {
          toast.error(error);
        }
      }
    });
  };

  const editData = (data) => {
    setExamination(data.title);
    setExaminationId(data._id);
    setShow(true);
  };
  const getData = async () => {
    setLoading(true);
    const { data } = await httpService("examination/view");

    if (data) {
      console.log(data);
      setExaminations(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteExamination = (id) => {
    Swal.fire({
      icon: "question",
      title: "Delete Examination",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data, error } = await httpService.get("examination/delete", {
          params: { id },
        });

        if (data) {
          toast.success(data);
          getData();
        }

        if (error) {
          toast.error(error);
        }
      }
    });
  };

  const updateDuration = () => {
    Swal.fire({
      icon: "question",
      title: "Update Duration",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const { data, error } = await httpService.patch(
          "examination/updateduration",
          {
            duration,
          },
          { params: { id: examIdinFocus } },
        );

        if (data) {
          getData();
          toast.success(data);
        }
        if (error) {
          toast.error(error);
        }

        setShow2(false);
        setExamIdinfocus("");

        setLoading(false);
      }
    });
  };
  return (
    <div>
      <div className="container mt-5 mb-5">
        <div className="mb-4">
          <ApplicationNavigation links={[]} pageTitle={"Examination"} />
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
            {examinationId ? "Update Examination" : "Create Examination"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert severity="info" className="mb-3">
            {examinationId
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
            {examinationId ? "Update" : "Create"}
          </Button>
          <Button color="error" onClick={() => setShow(!show)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal centered show={show2} onHide={() => setShow2(false)}>
        <Modal.Header closeButton className="border-0 bg-light">
          <Modal.Title>
            <Typography>Update duration</Typography>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            label="Duration"
            type="number"
            onChange={(e) => setDuration(e.target.value)}
            helperText="In minutes"
          />
        </Modal.Body>
        <Modal.Footer className="border-0 bg-light">
          <Button onClick={updateDuration} loading={loading}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Examinations;
