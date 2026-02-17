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

  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     e.preventDefault();
  //     e.returnValue = ""; // required for Chrome
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  const navigate = useNavigate();
  const getData = async () => {
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
      console.log(error);
    }
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
    Swal.fire({
      icon: "question",
      title: "Submit Answers",
      text: "Are you sure you want to submit your answers",
      showCancelButton: true,
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
  return (
    <div>
      {currentQuestion && (
        <div className="container mt-5">
          <div className="col-lg-3 mb-3">
            <Alert severity={timeLeft < 5 * 60 ? "warning" : "info"}>
              Time Remaining: <strong>{sf.convert(timeLeft).format()}</strong>
            </Alert>
          </div>
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
          <div className="mb-4">
            <div className="mb-3">
              <Typography variant="caption">
                Question {questionIndex + 1} of {questions.length}
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: 16, sm: 18, md: 20 },
                  lineHeight: 1.6,
                  mt: 1,
                }}
              >
                {currentQuestion?.question}
              </Typography>
            </div>
            <div className="mb-3">
              <FormControl className="mb-5">
                {/* <FormLabel>Options</FormLabel> */}
                <RadioGroup
                  value={answers[currentQuestion._id] || ""}
                  onChange={(e) =>
                    handleAnswerChange({
                      option: e.target.value,
                      questionId: currentQuestion._id,
                    })
                  }
                >
                  {currentQuestion.options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={
                        <Typography sx={{ fontSize: { xs: 16, md: 18 } }}>
                          {String.fromCharCode(65 + index)}) {option}
                        </Typography>
                      }
                      sx={{
                        mb: 1,
                        alignItems: "flex-center", // keeps label text top-aligned with radio
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>

            <div className="my-3 d-flex justify-content-center">
              <IconButton
                onClick={handlePrevQuestion}
                disabled={questionIndex === 0}
                color="primary"
                sx={{
                  mx: 1,
                  border: "1px solid #ddd",
                  backgroundColor: "#fff",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <KeyboardArrowLeft fontSize="large" />
              </IconButton>

              <IconButton
                onClick={handleNextQuestion}
                disabled={questionIndex === questions.length - 1}
                color="primary"
                sx={{
                  mx: 1,
                  border: "1px solid #ddd",
                  backgroundColor: "#fff",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <KeyboardArrowRight fontSize="large" />
              </IconButton>
            </div>

            {/* QUESTION NAVIGATION */}
            <div className="mt-4">
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
                      mr: 1,
                      mb: 1,
                      minWidth: { xs: 40, md: 45 },
                      fontSize: { xs: 14, md: 16 },
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {i + 1}
                  </Button>
                );
              })}
              <Button
                color="error"
                variant="contained"
                sx={{ mr: 1, mb: 1, minWidth: 45 }}
                onClick={handleSubmission}
                loading={submitting}
              >
                End examination
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TakeExamination;
