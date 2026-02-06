import React, { useEffect, useState } from "react";
import { httpService } from "../../../httpService";
import { useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Clear, Done } from "@mui/icons-material";

function ExamTranscript() {
  const [params] = useSearchParams();

  const examination = params.get("examination");

  const [transcript, setTranscript] = useState(null);

  const getData = async () => {
    const { data, error } = await httpService("examination/examtranscript", {
      params: { examination },
    });

    if (data) {
      setTranscript(data);
      console.log(data);
    }

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {transcript && (
        <div className="container mt-5">
          <div className="row mb-4">
            <div className="col-lg-3">
              <Typography>Total Questions</Typography>
              <Typography variant="h5">{transcript.totalQuestions}</Typography>
            </div>
            <div className="col-lg-3">
              <Typography>Score</Typography>
              <Typography variant="h5">{transcript.score}%</Typography>
            </div>
          </div>
          <div>
            {transcript.transcript.map((c, i) => (
              <div key={i} className="mb-4">
                <div className="mb-3">
                  <Typography variant="caption" color="GrayText">
                    Question {i + 1}
                  </Typography>
                  <Typography>{c.question}</Typography>
                </div>
                <div>
                  {c.options.map((o, i) => (
                    <div key={i}>
                      <Typography gutterBottom>
                        {" "}
                        {String.fromCharCode(65 + i)}) {o}
                      </Typography>
                    </div>
                  ))}

                  <div className="row bg-light p-3 d-flex align-items-center">
                    <div className="col-auto">
                      <div>
                        <Typography variant="caption">
                          Selected Answer
                        </Typography>
                        <Typography>{c.selectedAnswer}</Typography>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div>
                        <Typography variant="caption">
                          Correct Answer
                        </Typography>
                        <Typography>{c.correctAnswer}</Typography>
                      </div>
                    </div>
                    <div className="col-auto">
                      {c.isCorrect ? (
                        <Done color="success" />
                      ) : (
                        <Clear color="error" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamTranscript;
