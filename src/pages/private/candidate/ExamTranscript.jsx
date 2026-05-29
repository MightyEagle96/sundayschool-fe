import React, { useEffect, useState } from "react";
import { httpService } from "../../../httpService";
import { useSearchParams } from "react-router-dom";
import {
  Typography,
  Skeleton,
  useTheme,
  useMediaQuery,
  CardContent,
  Box,
  Grid,
  Paper,
  Card,
} from "@mui/material";
import { Clear, Done } from "@mui/icons-material";

// function ExamTranscript() {
//   const [params] = useSearchParams();
//   const examination = params.get("examination");

//   const [transcript, setTranscript] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const getData = async () => {
//     setLoading(true);
//     const { data, error } = await httpService("examination/examtranscript", {
//       params: { examination },
//     });

//     if (data) setTranscript(data);
//     if (error) console.log(error);

//     setLoading(false);
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <div className="container mt-5">
//       {/* ================= LOADING UI ================= */}
//       {loading && (
//         <>
//           <div className="row mb-4">
//             {[1, 2].map((_, i) => (
//               <div className="col-lg-3 col-6" key={i}>
//                 <Skeleton width="60%" />
//                 <Skeleton height={35} />
//               </div>
//             ))}
//           </div>

//           {[1, 2, 3].map((_, i) => (
//             <div key={i} className="mb-4">
//               <Skeleton width={120} />
//               <Skeleton height={25} />
//               <Skeleton height={20} />
//               <Skeleton height={20} />
//               <Skeleton height={20} />
//               <Skeleton variant="rounded" height={60} />
//             </div>
//           ))}
//         </>
//       )}

//       {/* ================= REAL UI ================= */}
//       {!loading && transcript && (
//         <>
//           {/* SUMMARY */}
//           <div className="row mb-4">
//             <div className="col-lg-3 col-6">
//               <Typography variant="body2">Total Questions</Typography>

//               <Typography variant={isMobile ? "h6" : "h4"} fontWeight={700}>
//                 {transcript.totalQuestions}
//               </Typography>
//             </div>

//             <div className="col-lg-3 col-6">
//               <Typography variant="body2">Score</Typography>

//               <Typography variant={isMobile ? "h6" : "h4"} fontWeight={700}>
//                 {transcript.score}%
//               </Typography>
//             </div>
//           </div>

//           {/* QUESTIONS */}
//           <div>
//             {transcript.transcript.map((c, idx) => (
//               <div key={idx} className="mb-4">
//                 <div className="mb-3">
//                   <Typography variant="caption" color="GrayText">
//                     Question {idx + 1}
//                   </Typography>

//                   <Typography variant={isMobile ? "body2" : "body1"}>
//                     {c.question}
//                   </Typography>
//                 </div>

//                 {/* OPTIONS */}
//                 <div>
//                   {c.options.map((o, i) => (
//                     <Typography
//                       key={i}
//                       gutterBottom
//                       variant={isMobile ? "body2" : "body1"}
//                     >
//                       {String.fromCharCode(65 + i)}) {o}
//                     </Typography>
//                   ))}

//                   {/* RESULT PANEL */}
//                   <div className="row bg-light p-3 d-flex align-items-center">
//                     <div className="col-12 col-md-auto mb-2 mb-md-0">
//                       <Typography variant="caption">Selected Answer</Typography>
//                       <Typography fontWeight={600}>
//                         {c.selectedAnswer}
//                       </Typography>
//                     </div>

//                     <div className="col-12 col-md-auto mb-2 mb-md-0">
//                       <Typography variant="caption">Correct Answer</Typography>
//                       <Typography fontWeight={600}>
//                         {c.correctAnswer}
//                       </Typography>
//                     </div>

//                     <div className="col-auto">
//                       {c.isCorrect ? (
//                         <Done color="success" />
//                       ) : (
//                         <Clear color="error" />
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

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
    <Box sx={{ bgcolor: "#f4f6f8", minHeight: "100vh", py: 4 }}>
      <div className="container">
        {/* ================= LOADING ================= */}
        {loading && (
          <Box sx={{ maxWidth: 900, mx: "auto" }}>
            {[1, 2].map((i) => (
              <Skeleton key={i} height={60} sx={{ mb: 2 }} />
            ))}

            {[1, 2, 3].map((i) => (
              <Skeleton key={i} height={120} sx={{ mb: 2 }} variant="rounded" />
            ))}
          </Box>
        )}

        {/* ================= CONTENT ================= */}
        {!loading && transcript && (
          <Box sx={{ maxWidth: 900, mx: "auto" }}>
            {/* ================= SUMMARY ================= */}
            <Typography variant="h5" fontWeight={800} mb={3}>
              Examination Transcript
            </Typography>

            <Grid container spacing={2} mb={4}>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, borderRadius: 3 }}>
                  <Typography variant="caption" color="text.secondary">
                    Total Questions
                  </Typography>
                  <Typography variant={isMobile ? "h6" : "h4"} fontWeight={800}>
                    {transcript.totalQuestions}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={6}>
                <Paper sx={{ p: 2, borderRadius: 3 }}>
                  <Typography variant="caption" color="text.secondary">
                    Score
                  </Typography>
                  <Typography
                    variant={isMobile ? "h6" : "h4"}
                    fontWeight={800}
                    color={
                      transcript.score >= 70
                        ? "success.main"
                        : transcript.score >= 50
                          ? "warning.main"
                          : "error.main"
                    }
                  >
                    {transcript.score}%
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* ================= QUESTIONS ================= */}
            <Box>
              {transcript.transcript.map((c, idx) => {
                const isCorrect = c.isCorrect;

                return (
                  <Card
                    key={idx}
                    sx={{
                      mb: 3,
                      borderRadius: 3,
                      boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                      borderLeft: isCorrect
                        ? "5px solid #2e7d32"
                        : "5px solid #d32f2f",
                    }}
                  >
                    <CardContent>
                      {/* QUESTION HEADER */}
                      <Typography variant="caption" color="text.secondary">
                        Question {idx + 1}
                      </Typography>

                      <Typography fontWeight={600} sx={{ mb: 2 }}>
                        {c.question}
                      </Typography>

                      {/* OPTIONS */}
                      <Box sx={{ mb: 2 }}>
                        {c.options.map((o, i) => (
                          <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>
                            {String.fromCharCode(65 + i)}) {o}
                          </Typography>
                        ))}
                      </Box>

                      {/* ANSWER PANEL */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: isMobile ? "column" : "row",
                          justifyContent: "space-between",
                          gap: 2,
                          bgcolor: "#f9f9f9",
                          p: 2,
                          borderRadius: 2,
                        }}
                      >
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Selected Answer
                          </Typography>
                          <Typography fontWeight={700}>
                            {c.selectedAnswer || "—"}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Correct Answer
                          </Typography>
                          <Typography fontWeight={700}>
                            {c.correctAnswer}
                          </Typography>
                        </Box>

                        <Box display="flex" alignItems="center">
                          {isCorrect ? (
                            <Done color="success" />
                          ) : (
                            <Clear color="error" />
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </Box>
        )}
      </div>
    </Box>
  );
}

export default ExamTranscript;
