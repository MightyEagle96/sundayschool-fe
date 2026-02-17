import React, { useEffect, useState } from "react";
import { httpService } from "../../../httpService";
import { useSearchParams } from "react-router-dom";
import { Typography, Skeleton, useTheme, useMediaQuery } from "@mui/material";
import { Clear, Done } from "@mui/icons-material";

function ExamTranscript() {
  const [params] = useSearchParams();
  const examination = params.get("examination");

  const [transcript, setTranscript] = useState(null);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getData = async () => {
    setLoading(true);
    const { data, error } = await httpService("examination/examtranscript", {
      params: { examination },
    });

    if (data) setTranscript(data);
    if (error) console.log(error);

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mt-5">
      {/* ================= LOADING UI ================= */}
      {loading && (
        <>
          <div className="row mb-4">
            {[1, 2].map((_, i) => (
              <div className="col-lg-3 col-6" key={i}>
                <Skeleton width="60%" />
                <Skeleton height={35} />
              </div>
            ))}
          </div>

          {[1, 2, 3].map((_, i) => (
            <div key={i} className="mb-4">
              <Skeleton width={120} />
              <Skeleton height={25} />
              <Skeleton height={20} />
              <Skeleton height={20} />
              <Skeleton height={20} />
              <Skeleton variant="rounded" height={60} />
            </div>
          ))}
        </>
      )}

      {/* ================= REAL UI ================= */}
      {!loading && transcript && (
        <>
          {/* SUMMARY */}
          <div className="row mb-4">
            <div className="col-lg-3 col-6">
              <Typography variant="body2">Total Questions</Typography>

              <Typography variant={isMobile ? "h6" : "h4"} fontWeight={700}>
                {transcript.totalQuestions}
              </Typography>
            </div>

            <div className="col-lg-3 col-6">
              <Typography variant="body2">Score</Typography>

              <Typography variant={isMobile ? "h6" : "h4"} fontWeight={700}>
                {transcript.score}%
              </Typography>
            </div>
          </div>

          {/* QUESTIONS */}
          <div>
            {transcript.transcript.map((c, idx) => (
              <div key={idx} className="mb-4">
                <div className="mb-3">
                  <Typography variant="caption" color="GrayText">
                    Question {idx + 1}
                  </Typography>

                  <Typography variant={isMobile ? "body2" : "body1"}>
                    {c.question}
                  </Typography>
                </div>

                {/* OPTIONS */}
                <div>
                  {c.options.map((o, i) => (
                    <Typography
                      key={i}
                      gutterBottom
                      variant={isMobile ? "body2" : "body1"}
                    >
                      {String.fromCharCode(65 + i)}) {o}
                    </Typography>
                  ))}

                  {/* RESULT PANEL */}
                  <div className="row bg-light p-3 d-flex align-items-center">
                    <div className="col-12 col-md-auto mb-2 mb-md-0">
                      <Typography variant="caption">Selected Answer</Typography>
                      <Typography fontWeight={600}>
                        {c.selectedAnswer}
                      </Typography>
                    </div>

                    <div className="col-12 col-md-auto mb-2 mb-md-0">
                      <Typography variant="caption">Correct Answer</Typography>
                      <Typography fontWeight={600}>
                        {c.correctAnswer}
                      </Typography>
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
        </>
      )}
    </div>
  );
}

export default ExamTranscript;
