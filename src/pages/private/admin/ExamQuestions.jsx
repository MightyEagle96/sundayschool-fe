import { Alert, Button, MenuItem, TextField } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ApplicationNavigation } from "../../../routes/MainRoutes";
import { Badge, Modal } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import { httpService } from "../../../httpService";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";

function ExamQuestions() {
  const [params] = useSearchParams();
  const [classCategory, setClassCategory] = useState("");
  const [show, setShow] = useState(false);
  const [questionData, setQuestionData] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });
  const [questions, setQuestions] = useState([]);

  const title = params.get("title");
  const examination = params.get("examination");
  const editorRef = useRef(null);

  /**
   * Clean, non-mutating, dynamic addQuestion
   */
  const addQuestion = async () => {
    const { optionA, optionB, optionC, optionD, ...rest } = questionData;

    const options = [optionA, optionB, optionC, optionD];

    const body = {
      ...rest,
      options,
      classCategory,
      examination,
    };

    const { data, error } = await httpService.post(
      "/questionBank/create",
      body
    );

    if (data) {
      getQuestions();
      toast.success(data);
    }
    if (error) {
      toast.error(error);
    }
    setClassCategory("");
    setShow(false);
  };

  const getQuestions = async () => {
    const { data, error } = await httpService.get("/questionBank/view", {
      params: { examination },
    });
    if (data) {
      //(data);
      console.log(data);
      setQuestions(data);
    }
    if (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const columns = [
    { field: "id", headerName: "S/N", width: 70 },
    {
      field: "classCategory",
      headerName: "Class Category",
      width: 200,
      renderCell: (params) => (
        <span>
          <Badge
            pill
            bg={params.row.classCategory === "yaya" ? "success" : "warning"}
            className="text-uppercase"
          >
            {params.row.classCategory}
          </Badge>
        </span>
      ),
    },
    { field: "question", headerName: "Question", width: 300 },
    {
      field: "optionA",
      headerName: "Option A",
      width: 300,
      renderCell: (params) => `${params.row.options[0]}`,
    },
    {
      field: "optionB",
      headerName: "Option B",
      width: 300,
      renderCell: (params) => `${params.row.options[1]}`,
    },
    {
      field: "optionC",
      headerName: "Option C",
      width: 300,
      renderCell: (params) => `${params.row.options[2]}`,
    },
    {
      field: "optionD",
      headerName: "Option D",
      width: 300,
      renderCell: (params) => `${params.row.options[3]}`,
    },
    {
      field: "correctAnswer",
      headerName: "Correct Answer",
      width: 300,
      renderCell: (params) => `${params.row.correctAnswer}`,
    },

    //{ field: "options", headerName: "Options", width: 400 },
  ];

  //const rows = [];

  return (
    <div>
      <div className="mt-5">
        <div className="container">
          <ApplicationNavigation
            links={[{ path: "/admin/questionbanks", name: "Question Banks" }]}
            pageTitle={title.toUpperCase()}
          />

          <div className="row">
            <div className="col-lg-4">
              <Button
                onClick={() => {
                  setClassCategory("adult");
                  setShow(true);
                }}
              >
                Add Questions for Adult class
              </Button>
            </div>

            <div className="col-lg-4">
              <Button
                color="error"
                onClick={() => {
                  setClassCategory("yaya");
                  setShow(true);
                }}
              >
                Add Questions for YAYA class
              </Button>
            </div>
          </div>
        </div>
        <div className="p-3">
          <DataGrid columns={columns} rows={questions} />
        </div>
      </div>

      {/* MODAL */}
      <Modal
        size="xl"
        centered
        show={show}
        onHide={() => {
          setShow(false);
          setClassCategory("");
        }}
      >
        <Modal.Header closeButton className="border-0 bg-light">
          <Modal.Title>Add a new question</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <div className="col-lg-4 mb-4">
              <Alert severity="info">
                You are setting questions for{" "}
                <span className="text-uppercase fw-bold">{classCategory}</span>{" "}
                class.
              </Alert>
            </div>

            {/* QUESTION EDITOR */}
            <div className="mb-4">
              {/* <Editor
                apiKey="kr1fydau7g3kamoqb7lixf0v4eimmdyl47qgitns438clgq8"
                onInit={(_, editor) => (editorRef.current = editor)}
                onEditorChange={(content) =>
                  setQuestionData((prev) => ({ ...prev, question: content }))
                }
                init={{
                  height: 200,
                  menubar: false,
                  placeholder: "Write your question here...",
                  plugins: [
                    "advlist autolink lists link image charmap media table code wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | code | bullist numlist outdent indent | removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                }}
              /> */}
              <TextField
                multiline
                maxRows={3}
                fullWidth
                label="Question"
                onChange={(e) =>
                  setQuestionData({ ...questionData, question: e.target.value })
                }
              />
            </div>

            {/* OPTIONS */}
            <div className="row">
              {["A", "B", "C", "D"].map((letter) => (
                <div className="col-lg-3 mb-3" key={letter}>
                  <TextField
                    fullWidth
                    label={`Option ${letter}`}
                    variant="outlined"
                    onChange={(e) =>
                      setQuestionData((prev) => ({
                        ...prev,
                        [`option${letter}`]: e.target.value,
                      }))
                    }
                  />
                </div>
              ))}

              {/* Correct Answer */}
              <div className="col-lg-3 mb-3">
                <TextField
                  fullWidth
                  label="Correct Answer"
                  variant="outlined"
                  select
                  onChange={(e) =>
                    setQuestionData((prev) => ({
                      ...prev,
                      correctAnswer: e.target.value,
                    }))
                  }
                >
                  {["A", "B", "C", "D"].map((letter) => (
                    <MenuItem
                      key={letter}
                      value={questionData[`option${letter}`]}
                    >
                      {questionData[`option${letter}`] || `Option ${letter}`}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="contained" onClick={addQuestion}>
            Add Question
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ExamQuestions;
