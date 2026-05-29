import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { httpService } from "../../../httpService";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import sf from "seconds-formater";
import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
  Skeleton,
  LinearProgress,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function TakeExamination() {
  const [params] = useSearchParams();

  const examinationId = params.get("examination");

  const [duration, setDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const getData = async () => {
    setLoading(true);
    const { data, error } = await httpService("examination/fetchquestions", {
      params: { id: examinationId },
    });

    if (data) {
      setQuestions(data.questions);
      setDuration(data.examination.duration * 60);
      //setExamination(data);
      console.log(data);
    }
    if (error) {
      toast.error(error);
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const currentQuestion = questions[questionIndex];

  const handleAnswerChange = ({ questionId, option }) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handlePrevQuestion = () => {
    setQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextQuestion = () => {
    setQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handleSubmission = () => {
    const answeredCount = Object.keys(answers).length;
    const totalQuestions = questions.length;
    const percent = (answeredCount / totalQuestions) * 100;
    Swal.fire({
      // icon: "question",
      // title: "Submit Answers",
      // text: "Are you sure you want to submit your answers",
      // showCancelButton: true,
      icon: "warning",
      title: "Submit Examination?",
      html: `
      <div style="font-size:14px; line-height:1.6">
        You have answered <b>${answeredCount}</b> out of <b>${totalQuestions}</b> questions.
        <br/><br/>
        Once submitted, you may not be able to make changes.
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
      cancelButtonText: "Review Answers",
      reverseButtons: true,
      focusCancel: true,
      confirmButtonColor: "#b71c1c",
      cancelButtonColor: "#6c757d",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        submitResponses();
      }
    });
    // alert("not implemented");
  };

  const submitResponses = async () => {
    const finalAnswers = Object.entries(answers).map(
      ([questionId, option]) => ({
        questionId,
        selectedOption: option,
      }),
    );
    const payload = {
      answers: finalAnswers,
      examination: examinationId,
    };

    setSubmitting(true);
    const { data, error } = await httpService.post(
      "examination/saveresponses",
      payload,
    );

    if (data) {
      navigate("/examinationconcluded");
    }

    if (error) {
      toast.error(error);
    }
    setSubmitting(false);
  };
  // return (
  //   <div>
  //     {currentQuestion && (
  //       <div className="container mt-5">
  //         <div className="col-lg-3 mb-3">
  //           <Alert severity={timeLeft < 5 * 60 ? "warning" : "info"}>
  //             Time Remaining: <strong>{sf.convert(timeLeft).format()}</strong>
  //           </Alert>
  //         </div>
  //         <div className="d-none">
  //           <CountdownCircleTimer
  //             isPlaying
  //             duration={duration}
  //             colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
  //             colorsTime={[7, 5, 2, 0]}
  //             onUpdate={(e) => setTimeLeft(e)}
  //             onComplete={submitResponses}
  //           >
  //             {({ remainingTime }) => remainingTime}
  //           </CountdownCircleTimer>
  //         </div>
  //         <div className="mb-4">
  //           <div className="mb-3">
  //             <Typography variant="caption">
  //               Question {questionIndex + 1} of {questions.length}
  //             </Typography>

  //             <Typography
  //               sx={{
  //                 fontSize: { xs: 16, sm: 18, md: 20 },
  //                 lineHeight: 1.6,
  //                 mt: 1,
  //               }}
  //             >
  //               {currentQuestion?.question}
  //             </Typography>
  //           </div>
  //           <div className="mb-3">
  //             <FormControl className="mb-5">
  //               {/* <FormLabel>Options</FormLabel> */}
  //               <RadioGroup
  //                 value={answers[currentQuestion._id] || ""}
  //                 onChange={(e) =>
  //                   handleAnswerChange({
  //                     option: e.target.value,
  //                     questionId: currentQuestion._id,
  //                   })
  //                 }
  //               >
  //                 {currentQuestion.options.map((option, index) => (
  //                   <FormControlLabel
  //                     key={index}
  //                     value={option}
  //                     control={<Radio />}
  //                     label={
  //                       <Typography sx={{ fontSize: { xs: 16, md: 18 } }}>
  //                         {String.fromCharCode(65 + index)}) {option}
  //                       </Typography>
  //                     }
  //                     sx={{
  //                       mb: 1,
  //                       alignItems: "flex-center", // keeps label text top-aligned with radio
  //                     }}
  //                   />
  //                 ))}
  //               </RadioGroup>
  //             </FormControl>
  //           </div>

  //           <div className="my-3 d-flex justify-content-center">
  //             <IconButton
  //               onClick={handlePrevQuestion}
  //               disabled={questionIndex === 0}
  //               color="primary"
  //               sx={{
  //                 mx: 1,
  //                 border: "1px solid #ddd",
  //                 backgroundColor: "#fff",
  //                 "&:hover": { backgroundColor: "#f0f0f0" },
  //               }}
  //             >
  //               <KeyboardArrowLeft fontSize="large" />
  //             </IconButton>

  //             <IconButton
  //               onClick={handleNextQuestion}
  //               disabled={questionIndex === questions.length - 1}
  //               color="primary"
  //               sx={{
  //                 mx: 1,
  //                 border: "1px solid #ddd",
  //                 backgroundColor: "#fff",
  //                 "&:hover": { backgroundColor: "#f0f0f0" },
  //               }}
  //             >
  //               <KeyboardArrowRight fontSize="large" />
  //             </IconButton>
  //           </div>

  //           {/* QUESTION NAVIGATION */}
  //           <div className="mt-4">
  //             {questions.map((q, i) => {
  //               const isActive = i === questionIndex;
  //               const isAnswered = answers[q._id] !== undefined;

  //               return (
  //                 <Button
  //                   key={q._id}
  //                   onClick={() => setQuestionIndex(i)}
  //                   variant={isActive || isAnswered ? "contained" : "outlined"}
  //                   color={
  //                     isActive ? "primary" : isAnswered ? "success" : "inherit"
  //                   }
  //                   sx={{
  //                     mr: 1,
  //                     mb: 1,
  //                     minWidth: { xs: 40, md: 45 },
  //                     fontSize: { xs: 14, md: 16 },
  //                     fontWeight: isActive ? 600 : 400,
  //                   }}
  //                 >
  //                   {i + 1}
  //                 </Button>
  //               );
  //             })}
  //             <Button
  //               color="error"
  //               variant="contained"
  //               sx={{ mr: 1, mb: 1, minWidth: 45 }}
  //               onClick={handleSubmission}
  //               loading={submitting}
  //             >
  //               End examination
  //             </Button>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    // <div>
    //   <div className="container mt-5">
    //     {/* ================= LOADING SKELETON ================= */}
    //     {loading && (
    //       <>
    //         <Skeleton width={200} height={40} className="mb-3" />
    //         <Skeleton height={25} />
    //         <Skeleton height={25} width="80%" />

    //         {[1, 2, 3, 4].map((i) => (
    //           <Skeleton key={i} height={35} />
    //         ))}

    //         <Skeleton variant="rounded" height={45} className="mt-4" />
    //       </>
    //     )}

    //     {/* ================= EXAM CONTENT ================= */}
    //     {!loading && currentQuestion && (
    //       <>
    //         {/* TIMER */}
    //         <div className="col-lg-3 mb-3">
    //           <Alert severity={timeLeft < 5 * 60 ? "warning" : "info"}>
    //             Time Remaining: <strong>{sf.convert(timeLeft).format()}</strong>
    //           </Alert>
    //         </div>

    //         {/* Hidden Timer Engine */}
    //         <div className="d-none">
    //           <CountdownCircleTimer
    //             isPlaying
    //             duration={duration}
    //             colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
    //             colorsTime={[7, 5, 2, 0]}
    //             onUpdate={(e) => setTimeLeft(e)}
    //             onComplete={submitResponses}
    //           >
    //             {({ remainingTime }) => remainingTime}
    //           </CountdownCircleTimer>
    //         </div>

    //         {/* PROGRESS INDICATOR */}
    //         <div className="mb-3">
    //           <Typography variant="caption">
    //             Question {questionIndex + 1} of {questions.length}
    //           </Typography>

    //           <Typography variant="caption" display="block">
    //             Answered {Object.keys(answers).length} / {questions.length}
    //           </Typography>

    //           <LinearProgress
    //             variant="determinate"
    //             value={(Object.keys(answers).length / questions.length) * 100}
    //             sx={{ mt: 1 }}
    //           />
    //         </div>

    //         {/* QUESTION */}
    //         <Typography
    //           sx={{
    //             fontSize: { xs: 16, sm: 18, md: 21 },
    //             lineHeight: 1.7,
    //             mt: 2,
    //             fontWeight: 500,
    //           }}
    //         >
    //           {currentQuestion.question}
    //         </Typography>

    //         {/* OPTIONS */}
    //         <FormControl className="mb-5 mt-3">
    //           <RadioGroup
    //             value={answers[currentQuestion._id] || ""}
    //             onChange={(e) =>
    //               handleAnswerChange({
    //                 option: e.target.value,
    //                 questionId: currentQuestion._id,
    //               })
    //             }
    //           >
    //             {currentQuestion.options.map((option, index) => (
    //               <FormControlLabel
    //                 key={index}
    //                 value={option}
    //                 control={<Radio />}
    //                 label={
    //                   <Typography
    //                     sx={{
    //                       fontSize: { xs: 15, sm: 16, md: 18 },
    //                       lineHeight: 1.6,
    //                     }}
    //                   >
    //                     {String.fromCharCode(65 + index)}) {option}
    //                   </Typography>
    //                 }
    //                 sx={{ mb: 1 }}
    //               />
    //             ))}
    //           </RadioGroup>
    //         </FormControl>

    //         {/* NAV BUTTONS */}
    //         <div className="my-3 d-flex justify-content-center">
    //           <IconButton
    //             onClick={handlePrevQuestion}
    //             disabled={questionIndex === 0}
    //             color="primary"
    //             sx={{
    //               mx: 1,
    //               border: "1px solid #ddd",
    //               backgroundColor: "#fff",
    //             }}
    //           >
    //             <KeyboardArrowLeft fontSize="large" />
    //           </IconButton>

    //           <IconButton
    //             onClick={handleNextQuestion}
    //             disabled={questionIndex === questions.length - 1}
    //             color="primary"
    //             sx={{
    //               mx: 1,
    //               border: "1px solid #ddd",
    //               backgroundColor: "#fff",
    //             }}
    //           >
    //             <KeyboardArrowRight fontSize="large" />
    //           </IconButton>
    //         </div>

    //         {/* QUESTION GRID */}
    //         <div className="mt-4">
    //           {questions.map((q, i) => {
    //             const isActive = i === questionIndex;
    //             const isAnswered = answers[q._id] !== undefined;

    //             return (
    //               <Button
    //                 key={q._id}
    //                 onClick={() => setQuestionIndex(i)}
    //                 variant={isActive || isAnswered ? "contained" : "outlined"}
    //                 color={
    //                   isActive ? "primary" : isAnswered ? "success" : "inherit"
    //                 }
    //                 sx={{
    //                   mr: 1,
    //                   mb: 1,
    //                   minWidth: { xs: 38, md: 45 },
    //                   fontSize: { xs: 13, md: 15 },
    //                 }}
    //               >
    //                 {i + 1}
    //               </Button>
    //             );
    //           })}

    //           <Button
    //             color="error"
    //             variant="contained"
    //             sx={{ mr: 1, mb: 1 }}
    //             onClick={handleSubmission}
    //             loading={submitting}
    //           >
    //             End Examination
    //           </Button>
    //         </div>
    //       </>
    //     )}
    //   </div>
    // </div>
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
        py: 4,
      }}
    >
      <div className="container">
        {/* ================= LOADING ================= */}
        {loading && (
          <Box sx={{ maxWidth: 900, mx: "auto" }}>
            <Skeleton width={220} height={40} sx={{ mb: 2 }} />
            <Skeleton height={25} />
            <Skeleton height={25} width="80%" sx={{ mb: 3 }} />

            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} height={35} sx={{ mb: 1 }} />
            ))}

            <Skeleton variant="rounded" height={45} sx={{ mt: 2 }} />
          </Box>
        )}

        {/* ================= EXAM CONTENT ================= */}
        {!loading && currentQuestion && (
          <Box sx={{ maxWidth: 900, mx: "auto" }}>
            {/* TIMER */}
            <Alert
              severity={timeLeft < 300 ? "warning" : "info"}
              sx={{
                mb: 3,
                fontWeight: 700,
                borderRadius: 2,
              }}
            >
              Time Remaining: <strong>{sf.convert(timeLeft).format()}</strong>
            </Alert>

            {/* TIMER ENGINE */}
            <div className="d-none">
              <CountdownCircleTimer
                isPlaying
                duration={duration}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[7, 5, 2, 0]}
                onUpdate={(e) => setTimeLeft(e)}
                onComplete={submitResponses}
              >
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            </div>

            {/* PROGRESS */}
            <Box mb={3}>
              <Typography variant="caption" color="text.secondary">
                Question {questionIndex + 1} of {questions.length}
              </Typography>

              <Typography variant="caption" display="block">
                Answered {Object.keys(answers).length} / {questions.length}
              </Typography>

              <LinearProgress
                variant="determinate"
                value={(Object.keys(answers).length / questions.length) * 100}
                sx={{
                  mt: 1,
                  height: 8,
                  borderRadius: 5,
                }}
              />
            </Box>

            {/* QUESTION */}
            <Typography
              sx={{
                fontSize: {
                  xs: 16,
                  sm: 18,
                  md: 21,
                },
                lineHeight: 1.7,
                fontWeight: 600,
                mb: 3,
              }}
            >
              {currentQuestion.question}
            </Typography>

            {/* OPTIONS */}
            <FormControl sx={{ width: "100%" }}>
              <RadioGroup
                value={answers[currentQuestion._id] || ""}
                onChange={(e) =>
                  handleAnswerChange({
                    option: e.target.value,
                    questionId: currentQuestion._id,
                  })
                }
              >
                {currentQuestion.options.map((option, index) => {
                  const isSelected = answers[currentQuestion._id] === option;

                  return (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={
                        <Typography
                          sx={{
                            fontSize: {
                              xs: 15,
                              md: 18,
                            },
                          }}
                        >
                          {String.fromCharCode(65 + index)}) {option}
                        </Typography>
                      }
                      sx={{
                        mb: 1,
                        px: 1,
                        py: 0.5,
                        borderRadius: 2,
                        border: isSelected
                          ? "1px solid #2e7d32"
                          : "1px solid transparent",
                        background: isSelected
                          ? "rgba(46,125,50,0.08)"
                          : "transparent",
                      }}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>

            {/* NAV BUTTONS */}
            <Box display="flex" justifyContent="center" gap={2} my={4}>
              <IconButton
                onClick={handlePrevQuestion}
                disabled={questionIndex === 0}
                sx={{
                  border: "1px solid #ddd",
                  backgroundColor: "#fff",
                }}
              >
                <KeyboardArrowLeft fontSize="large" />
              </IconButton>

              <IconButton
                onClick={handleNextQuestion}
                disabled={questionIndex === questions.length - 1}
                sx={{
                  border: "1px solid #ddd",
                  backgroundColor: "#fff",
                }}
              >
                <KeyboardArrowRight fontSize="large" />
              </IconButton>
            </Box>

            {/* QUESTION NAV GRID */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                mt: 3,
              }}
            >
              {questions.map((q, i) => {
                const isActive = i === questionIndex;
                const isAnswered = answers[q._id] !== undefined;

                return (
                  <Button
                    key={q._id}
                    onClick={() => setQuestionIndex(i)}
                    variant={isActive || isAnswered ? "contained" : "outlined"}
                    color={
                      isActive ? "primary" : isAnswered ? "success" : "inherit"
                    }
                    sx={{
                      minWidth: 42,
                      fontWeight: 700,
                      opacity: isAnswered ? 1 : 0.7,
                    }}
                  >
                    {i + 1}
                  </Button>
                );
              })}

              <Button
                color="error"
                variant="contained"
                onClick={handleSubmission}
                disabled={submitting}
                sx={{
                  ml: 1,
                  fontWeight: 700,
                }}
              >
                End Examination
              </Button>
            </Box>
          </Box>
        )}
      </div>
    </Box>
  );
}

export default TakeExamination;
