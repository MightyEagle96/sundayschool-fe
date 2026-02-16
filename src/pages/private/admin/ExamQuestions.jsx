// import {
//   Alert,
//   Avatar,
//   Button,
//   MenuItem,
//   TextField,
//   Typography,
//   ButtonBase,
//   CircularProgress,
//   IconButton,
//   Stack,
// } from "@mui/material";
// import React, { useState, useRef, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { ApplicationNavigation } from "../../../routes/MainRoutes";
// import { Badge, Modal } from "react-bootstrap";
// import { httpService } from "../../../httpService";
// import { toast } from "react-toastify";
// import { DataGrid } from "@mui/x-data-grid";
// import { blue, blueGrey, green, red } from "@mui/material/colors";
// import { Delete, Edit } from "@mui/icons-material";
// import Swal from "sweetalert2";

// function ExamQuestions() {
//   const [loading, setLoading] = useState(false);
//   const [params] = useSearchParams();
//   const [classCategory, setClassCategory] = useState("");
//   const [show, setShow] = useState(false);
//   const [questionData, setQuestionData] = useState({
//     question: "",
//     optionA: "",
//     optionB: "",
//     optionC: "",
//     optionD: "",
//     correctAnswer: "",
//   });
//   const [questions, setQuestions] = useState([]);
//   const [file, setFile] = useState(null);
//   const [deleting, setDeleting] = useState(false);
//   const [questionsCount, setQuestionsCount] = useState({
//     yayaQuestions: 0,
//     adultQuestions: 0,
//     totalQuestions: 0,
//   });

//   const [deletingBank, setDeletingBank] = useState(false);

//   const [editing, setEditing] = useState(false);
//   const [editingData, setEditingData] = useState({
//     _id: "",
//     question: "",
//     optionA: "",
//     optionB: "",
//     optionC: "",
//     optionD: "",
//     correctAnswer: "",
//   });

//   const fileRef = useRef();

//   const title = params.get("title");
//   const examination = params.get("examination");

//   const openEditModal = (row) => {
//     setEditingData({
//       _id: row._id,
//       question: row.question,
//       optionA: row.options[0],
//       optionB: row.options[1],
//       optionC: row.options[2],
//       optionD: row.options[3],
//       correctAnswer: row.correctAnswer,
//     });

//     setEditing(true);
//   };

//   const updateQuestion = async () => {
//     setLoading(true);
//     const { optionA, optionB, optionC, optionD, _id, ...rest } = editingData;

//     const body = {
//       ...rest,
//       options: [optionA, optionB, optionC, optionD],
//       examination,
//     };

//     const { data, error } = await httpService.put(
//       "/questionBank/update",
//       body,
//       { params: { questionId: _id, examination } },
//     );

//     if (data) {
//       toast.success(data);
//       getQuestions();
//       setEditing(false);
//     }

//     if (error) {
//       toast.error(error);
//     }

//     setLoading(false);
//   };

//   const addQuestion = async () => {
//     const { optionA, optionB, optionC, optionD, ...rest } = questionData;

//     const options = [optionA, optionB, optionC, optionD];

//     const body = {
//       ...rest,
//       options,
//       classCategory,
//       examination,
//     };

//     const { data, error } = await httpService.post(
//       "/questionBank/create",
//       body,
//     );

//     if (data) {
//       getQuestions();
//       toast.success(data);
//     }
//     if (error) {
//       toast.error(error);
//     }
//     setClassCategory("");
//     setShow(false);
//   };

//   const getQuestions = async () => {
//     setLoading(true);
//     const { data, error } = await httpService.get("/questionBank/view", {
//       params: { examination },
//     });
//     if (data) {
//       console.log(data);
//       setQuestions(data.questions);
//       setQuestionsCount(data.questionsCount);
//     }
//     if (error) {
//       toast.error(error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     getQuestions();
//   }, []);

//   const columns = [
//     { field: "id", headerName: "S/N", width: 70 },
//     {
//       field: "classCategory",
//       headerName: "Category",
//       width: 100,
//       renderCell: (params) => (
//         <span>
//           <Badge
//             pill
//             bg={params.row.classCategory === "yaya" ? "success" : "warning"}
//             className="text-uppercase"
//           >
//             {params.row.classCategory}
//           </Badge>
//         </span>
//       ),
//     },
//     { field: "question", headerName: "Question", width: 300 },
//     {
//       field: "optionA",
//       headerName: "Option A",
//       width: 200,
//       renderCell: (params) => `${params.row.options[0]}`,
//     },
//     {
//       field: "optionB",
//       headerName: "Option B",
//       width: 200,
//       renderCell: (params) => `${params.row.options[1]}`,
//     },
//     {
//       field: "optionC",
//       headerName: "Option C",
//       width: 200,
//       renderCell: (params) => `${params.row.options[2]}`,
//     },
//     {
//       field: "optionD",
//       headerName: "Option D",
//       width: 200,
//       renderCell: (params) => `${params.row.options[3]}`,
//     },
//     {
//       field: "correctAnswer",
//       headerName: "Correct Answer",
//       width: 200,
//       renderCell: (params) => `${params.row.correctAnswer}`,
//     },
//     {
//       field: "edit",
//       headerName: "Edit",
//       width: 100,
//       renderCell: (params) => (
//         <IconButton onClick={() => openEditModal(params.row)}>
//           <Edit color="warning" />
//         </IconButton>
//       ),
//     },
//     {
//       field: "delete",
//       headerName: "Delete",
//       width: 100,
//       renderCell: (params) => (
//         <IconButton onClick={() => deleteQuestion(params.row._id)}>
//           {deleting ? (
//             <CircularProgress color="inherit" size={20} />
//           ) : (
//             <Delete color="error" />
//           )}
//         </IconButton>
//       ),
//     },
//   ];

//   const deleteQuestion = (question) => {
//     Swal.fire({
//       icon: "question",
//       title: "Delete Question",
//       showCancelButton: true,
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         setDeleting(true);
//         const { data, error } = await httpService.get("questionbank/delete", {
//           params: { examination, question },
//         });

//         if (data) {
//           toast.success(data);
//           getQuestions();
//         }

//         if (error) {
//           toast.error(error);
//         }
//         setDeleting(false);
//       }
//     });
//   };
//   //const rows = [];

//   const handleFile = async (e) => {
//     const file = e.target.files[0];
//     setFile(file);

//     e.target.value = null;
//   };

//   const uploadFile = async (category) => {
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("file", file);

//     const { data, error } = await httpService.post(
//       "/questionBank/upload",
//       formData,
//       { params: { examination, classCategory: category } },
//     );
//     if (data) {
//       toast.success(data);
//     }
//     if (error) {
//       toast.error(error);
//     }
//     getQuestions();
//     setFile(null);
//     setLoading(false);
//   };

//   const deleteQuestionBank = () => {
//     Swal.fire({
//       icon: "question",
//       title: "Delete Question Bank",
//       text: "Are you sure you want to delete this question bank?",
//       showCancelButton: true,
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         setDeletingBank(true);
//         const { data, error } = await httpService.get(
//           "questionbank/deletequestionbank",
//           {
//             params: { examination },
//           },
//         );

//         if (data) {
//           toast.success(data);
//           getQuestions();
//         }

//         if (error) {
//           toast.error(error);
//         }

//         setDeletingBank(false);
//       }
//     });
//   };
//   return (
//     <div>
//       <div className="mt-5">
//         <div className="">
//           <div className="container">
//             <ApplicationNavigation
//               links={[{ path: "/admin/questionbanks", name: "Question Banks" }]}
//               pageTitle={title.toUpperCase()}
//             />
//           </div>

//           <div className="bg-light pt-4 pb-4">
//             <div className="">
//               <div className="row d-flex justify-content-center">
//                 <div className="col-lg-3">
//                   <Button
//                     onClick={() => {
//                       setClassCategory("adult");
//                       setShow(true);
//                     }}
//                   >
//                     Add Questions for Adult class
//                   </Button>
//                   <Button
//                     color="error"
//                     onClick={() => {
//                       setClassCategory("yaya");
//                       setShow(true);
//                     }}
//                   >
//                     Add Questions for YAYA class
//                   </Button>
//                 </div>

//                 <div className="col-lg-3 border-start border-end">
//                   <Typography variant="caption">
//                     Upload a csv of excel file of the questions
//                   </Typography>
//                   <input
//                     className="form-control"
//                     type="file"
//                     accept=".csv, .xlsx, .xls"
//                     onChange={handleFile}
//                     ref={fileRef}
//                   />
//                 </div>

//                 <div className="col-lg-4">
//                   <div className="row">
//                     <div className="col-lg-6">
//                       <Stack
//                         direction={"row"}
//                         spacing={1}
//                         className="d-flex align-items-center mb-3"
//                       >
//                         <div>
//                           <Typography variant="body2">
//                             Total Questions:{" "}
//                           </Typography>
//                         </div>
//                         <div>
//                           <Avatar sx={{ backgroundColor: blueGrey[700] }}>
//                             {questionsCount.totalQuestions}
//                           </Avatar>
//                         </div>
//                       </Stack>
//                       <Stack
//                         direction={"row"}
//                         spacing={1}
//                         className="d-flex align-items-center mb-3"
//                       >
//                         <div>
//                           <Typography variant="body2">
//                             Adult Questions:{" "}
//                           </Typography>
//                         </div>
//                         <div>
//                           <Avatar sx={{ backgroundColor: blue[700] }}>
//                             {questionsCount.adultQuestions}
//                           </Avatar>
//                         </div>
//                       </Stack>
//                       <Stack
//                         direction={"row"}
//                         spacing={1}
//                         className="d-flex align-items-center mb-3"
//                       >
//                         <div>
//                           <Typography variant="body2">
//                             YAYA Questions:{" "}
//                           </Typography>
//                         </div>
//                         <div>
//                           <Avatar sx={{ backgroundColor: green[700] }}>
//                             {questionsCount.yayaQuestions}
//                           </Avatar>
//                         </div>
//                       </Stack>
//                     </div>
//                     <div className="col-lg-6">
//                       <Button
//                         disabled={questionsCount.totalQuestions === 0}
//                         variant="contained"
//                         endIcon={<Delete />}
//                         color="error"
//                         sx={{ textTransform: "capitalize" }}
//                         onClick={deleteQuestionBank}
//                         loading={deletingBank}
//                         loadingPosition="end"
//                       >
//                         {" "}
//                         Delete question bank
//                       </Button>
//                       <Typography
//                         color="error"
//                         variant="body2"
//                         className="mt-3"
//                       >
//                         This will delete all entered questions and clear out the
//                         question bank to allow for a new upload.
//                       </Typography>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="p-3">
//           <DataGrid columns={columns} rows={questions} loading={loading} />
//         </div>
//       </div>

//       {/* MODAL */}
//       <Modal
//         size="xl"
//         centered
//         show={show}
//         onHide={() => {
//           setShow(false);
//           setClassCategory("");
//         }}
//       >
//         <Modal.Header closeButton className="border-0 bg-light">
//           <Modal.Title>Add a new question</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <div>
//             <div className="col-lg-4 mb-4">
//               <Alert severity="info">
//                 You are setting questions for{" "}
//                 <span className="text-uppercase fw-bold">{classCategory}</span>{" "}
//                 class.
//               </Alert>
//             </div>

//             {/* QUESTION EDITOR */}
//             <div className="mb-4">
//               {/* <Editor
//                 apiKey="kr1fydau7g3kamoqb7lixf0v4eimmdyl47qgitns438clgq8"
//                 onInit={(_, editor) => (editorRef.current = editor)}
//                 onEditorChange={(content) =>
//                   setQuestionData((prev) => ({ ...prev, question: content }))
//                 }
//                 init={{
//                   height: 200,
//                   menubar: false,
//                   placeholder: "Write your question here...",
//                   plugins: [
//                     "advlist autolink lists link image charmap media table code wordcount",
//                   ],
//                   toolbar:
//                     "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | code | bullist numlist outdent indent | removeformat | help",
//                   content_style:
//                     "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
//                 }}
//               /> */}
//               <TextField
//                 multiline
//                 maxRows={3}
//                 fullWidth
//                 label="Question"
//                 onChange={(e) =>
//                   setQuestionData({ ...questionData, question: e.target.value })
//                 }
//               />
//             </div>

//             {/* OPTIONS */}
//             <div className="row">
//               {["A", "B", "C", "D"].map((letter) => (
//                 <div className="col-lg-3 mb-3" key={letter}>
//                   <TextField
//                     fullWidth
//                     label={`Option ${letter}`}
//                     variant="outlined"
//                     onChange={(e) =>
//                       setQuestionData((prev) => ({
//                         ...prev,
//                         [`option${letter}`]: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>
//               ))}

//               {/* Correct Answer */}
//               <div className="col-lg-3 mb-3">
//                 <TextField
//                   fullWidth
//                   label="Correct Answer"
//                   variant="outlined"
//                   select
//                   onChange={(e) =>
//                     setQuestionData((prev) => ({
//                       ...prev,
//                       correctAnswer: e.target.value,
//                     }))
//                   }
//                 >
//                   {["A", "B", "C", "D"].map((letter) => (
//                     <MenuItem
//                       key={letter}
//                       value={questionData[`option${letter}`]}
//                     >
//                       {questionData[`option${letter}`] || `Option ${letter}`}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </div>
//             </div>
//           </div>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="contained" onClick={addQuestion}>
//             Add Question
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <Modal backdrop="static" show={file} onHide={() => setFile(null)}>
//         <Modal.Header closeButton className="border-0"></Modal.Header>
//         <Modal.Body>
//           <div className="text-center">
//             <Typography>
//               Click any of this catgory to upload the questions
//             </Typography>
//           </div>
//           <div className="row d-flex justify-content-center mb-4">
//             {/* ADULT */}
//             <div className="col-lg-3 d-flex justify-content-center  text-center">
//               <ButtonBase
//                 // onClick={() => console.log("ADULT clicked")}
//                 onClick={() => uploadFile("adult")}
//                 sx={{
//                   borderRadius: "12px",
//                   padding: 2,
//                   display: "inline-flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <Avatar
//                   sx={{
//                     height: 100,
//                     width: 100,
//                     backgroundColor: red[700],
//                     fontSize: 35,
//                   }}
//                 >
//                   A
//                 </Avatar>
//                 <Typography
//                   color="GrayText"
//                   sx={{ marginTop: 1, fontWeight: 700 }}
//                 >
//                   ADULT
//                 </Typography>
//               </ButtonBase>
//             </div>

//             {/* YAYA */}
//             <div className="col-lg-3 d-flex justify-content-center text-center">
//               <ButtonBase
//                 //onClick={() => console.log("YAYA clicked")}
//                 onClick={() => uploadFile("yaya")}
//                 sx={{
//                   borderRadius: "12px",
//                   padding: 2,
//                   display: "inline-flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <Avatar
//                   sx={{
//                     height: 100,
//                     width: 100,
//                     backgroundColor: green[700],
//                     fontSize: 35,
//                   }}
//                 >
//                   Y
//                 </Avatar>
//                 <Typography
//                   color="GrayText"
//                   sx={{ marginTop: 1, fontWeight: 700 }}
//                 >
//                   YAYA
//                 </Typography>
//               </ButtonBase>
//             </div>
//           </div>
//           {loading && (
//             <div className="text-center">
//               <CircularProgress color="GrayText" size={30} />
//             </div>
//           )}
//         </Modal.Body>
//       </Modal>

//       <Modal size="xl" centered show={editing} onHide={() => setEditing(false)}>
//         <Modal.Header closeButton className="border-0 bg-light">
//           <Modal.Title>Edit Question</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <div>
//             {/* QUESTION */}
//             <TextField
//               multiline
//               maxRows={3}
//               fullWidth
//               label="Question"
//               value={editingData.question}
//               className="mb-4"
//               onChange={(e) =>
//                 setEditingData({ ...editingData, question: e.target.value })
//               }
//             />

//             <div className="row">
//               {["A", "B", "C", "D"].map((letter) => (
//                 <div className="col-lg-3 mb-3" key={letter}>
//                   <TextField
//                     fullWidth
//                     label={`Option ${letter}`}
//                     value={editingData[`option${letter}`]}
//                     onChange={(e) =>
//                       setEditingData((prev) => ({
//                         ...prev,
//                         [`option${letter}`]: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>
//               ))}

//               {/* Correct Answer */}
//               <div className="col-lg-3 mb-3">
//                 <TextField
//                   fullWidth
//                   label="Correct Answer"
//                   select
//                   value={editingData.correctAnswer}
//                   onChange={(e) =>
//                     setEditingData((prev) => ({
//                       ...prev,
//                       correctAnswer: e.target.value,
//                     }))
//                   }
//                 >
//                   {["A", "B", "C", "D"].map((letter) => (
//                     <MenuItem
//                       key={letter}
//                       value={editingData[`option${letter}`]}
//                     >
//                       {editingData[`option${letter}`] || `Option ${letter}`}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </div>
//             </div>
//           </div>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button
//             variant="contained"
//             onClick={updateQuestion}
//             loading={loading}
//           >
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default ExamQuestions;

import React from "react";

function ExamQuestions() {
  const [params] = useSearchParams();
  const title = params.get("title");
  return (
    <div>
      <div className="container my-5">
        <ApplicationNavigation
          links={[{ path: "/admin/questionbanks", name: "Question Banks" }]}
          pageTitle={title.toUpperCase()}
        />
      </div>
    </div>
  );
}

export default ExamQuestions;
