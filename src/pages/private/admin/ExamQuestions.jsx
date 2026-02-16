import { useSearchParams } from "react-router-dom";
import { ApplicationNavigation } from "../../../routes/MainRoutes";
import { useEffect, useRef, useState } from "react";
import { httpService } from "../../../httpService";
import {
  Button,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { Modal } from "react-bootstrap";
import { UploadFileOutlined } from "@mui/icons-material";

function ExamQuestions() {
  const [params] = useSearchParams();
  const title = params.get("title");
  const examination = params.get("examination");
  const [fetchingCategories, setFetchingCategories] = useState(false);
  const [creatingBank, setCreatingBank] = useState(false);
  const [categories, setClassCategories] = useState([]);
  const [classCategory, setClassCategory] = useState(null);
  const [questionBanks, setQuestionBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingBank, setFetchingBank] = useState(false);
  const [questionBank, setQuestionBank] = useState(null);

  const [file, setFile] = useState(null);

  const fileRef = useRef();
  const retrieveCategories = async () => {
    setFetchingCategories(true);
    const { data } = await httpService.get("/admin/classcategories");

    if (data) {
      setClassCategories(data);
    }
    setFetchingCategories(false);
  };

  useEffect(() => {
    retrieveCategories();
  }, []);

  const addQuestionBank = () => {
    Swal.fire({
      icon: "question",
      text: `Add question bank for ${classCategory.name.toUpperCase()} class?`,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setCreatingBank(true);
        const { data, error } = await httpService.post(
          "/questionbank/createquestionbank",
          {
            classCategory: classCategory._id,
            examination,
          },
        );
        if (data) {
          getQuestionBanks();
          toast.success(data);
        }
        if (error) {
          toast.error(error);
        }
        setCreatingBank(false);
      }
    });
  };

  const getQuestionBanks = async () => {
    setLoading(true);
    const { data } = await httpService.get(
      `/questionbank/view?examination=${examination}`,
    );

    if (data) {
      setQuestionBanks(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getQuestionBanks();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "S/N",
      width: 70,
      renderCell: (params) => `${params.row.id}`,
    },
    {
      field: "classCategory",
      headerName: "Class Category",
      width: 200,

      renderCell: (params) => (
        <span className="text-uppercase">{params.row.classCategory.name}</span>
      ),
    },
    {
      field: "questionCount",
      headerName: "Questions",
      width: 200,
    },
    {
      field: "_id",
      width: 300,
      headerName: "View Questions",
      renderCell: (params) => (
        <Button color="warning" onClick={() => retrieveData(params.row._id)}>
          View
        </Button>
      ),
    },
  ];

  const retrieveData = async (id) => {
    setFetchingBank(true);
    const { data } = await httpService.get(
      `/questionbank/viewquestionbank?_id=${id}`,
    );
    if (data) {
      setQuestionBank(data);
    }
    setFetchingBank(false);
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    setFile(file);

    e.target.value = null;
  };

  const uploadFile = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const { data, error } = await httpService.post(
      "/questionbank/upload",
      formData,
      { params: { _id: questionBank._id } },
    );
    if (data) {
      setQuestionBank(null);
      setFile(null);
      toast.success(data);
      retrieveCategories();
      getQuestionBanks();
      // setRefresh(!refresh);
    }
    if (error) {
      toast.error(error);
    }

    setFile(null);
    setLoading(false);
  };

  return (
    <div>
      <div className="container my-5">
        <ApplicationNavigation
          links={[{ path: "/admin/examinations", name: "Examinations" }]}
          pageTitle={title.toUpperCase()}
        />

        <div className="my-5">
          <Stack
            direction={"row"}
            spacing={2}
            className="d-flex align-items-center"
          >
            <div className="col-lg-3">
              <TextField
                fullWidth
                label="Class Category"
                select={!fetchingCategories}
                disabled={categories.length === 0 || fetchingCategories}
                name="classCategory"
                onChange={(e) => {
                  setClassCategory(e.target.value);
                }}
                sx={{ textTransform: "uppercase" }}
                slotProps={{
                  input: {
                    endAdornment: fetchingCategories ? (
                      <InputAdornment position="end">
                        <CircularProgress size={15} />
                      </InputAdornment>
                    ) : null,
                  },
                }}
              >
                {categories.map((c) => (
                  <MenuItem
                    sx={{ textTransform: "uppercase" }}
                    key={c._id}
                    value={c}
                  >
                    {c.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <Button
                onClick={addQuestionBank}
                disabled={!classCategory}
                loading={creatingBank}
                sx={{ textTransform: "capitalize" }}
              >
                Add question bank
              </Button>
            </div>
          </Stack>
        </div>
        <div>
          <div className="mb-4">
            <Typography variant="h4" fontWeight={700} color="primary">
              Total Question Banks: {questionBanks.length}
            </Typography>
          </div>
          <DataGrid
            loading={loading || fetchingBank}
            columns={columns}
            rows={questionBanks}
            rowCount={questionBanks.length}
          />
        </div>
      </div>
      <Modal
        size="xl"
        centered
        show={questionBank}
        onHide={() => {
          setQuestionBank(null);
          setFile(null);
        }}
      >
        {questionBank && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <Typography>
                  Question Bank for {"  "}
                  <span className="text-uppercase fw-bold">
                    {questionBank.classCategory.name}
                  </span>{" "}
                  category
                </Typography>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ maxHeight: "60vh", overflow: "scroll" }}>
                <div className="col-lg-5">
                  <div className=" mb-5 ">
                    <Typography variant="caption">
                      Upload a csv of excel file of the questions
                    </Typography>
                    <input
                      className="form-control"
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={handleFile}
                      ref={fileRef}
                    />
                    <hr />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                disabled={!file}
                variant="contained"
                color="error"
                endIcon={<UploadFileOutlined />}
                onClick={uploadFile}
                loading={loading}
                loadingPosition="end"
              >
                Upload file
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}

export default ExamQuestions;
