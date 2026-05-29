import React, { useEffect, useState } from "react";
import { httpService } from "../../../httpService";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

// function ExaminationScore() {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const getData = async () => {
//     setLoading(true);
//     const { data } = await httpService("examination/results");
//     if (data) setResults(data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const columns = [
//     { field: "id", headerName: "ID", width: 100 },
//     {
//       field: "examination",
//       headerName: "Examination",
//       width: 400,
//       renderCell: (params) => (
//         <div className="text-uppercase">{params.row.examination.title}</div>
//       ),
//     },
//     { field: "score", headerName: "Score", width: 100 },
//     {
//       field: "_id",
//       headerName: "View Transcript",
//       width: 200,
//       renderCell: (params) => (
//         <Button
//           sx={{ textTransform: "capitalize" }}
//           component={Link}
//           to={`/examtranscript?examination=${params.row.examination._id}`}
//         >
//           View
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div className="container mt-5">
//       <div className="mb-4">
//         <Typography variant={isMobile ? "h6" : "h5"}>All Results</Typography>
//       </div>

//       {/* ================= MOBILE ================= */}
//       {isMobile ? (
//         <>
//           {loading &&
//             [1, 2, 3].map((i) => (
//               <Skeleton
//                 key={i}
//                 variant="rounded"
//                 height={90}
//                 className="mb-3"
//               />
//             ))}

//           {!loading &&
//             results.map((r) => (
//               <Card key={r.id} className="mb-3">
//                 <CardContent>
//                   <Typography variant="body2" color="text.secondary">
//                     Examination
//                   </Typography>

//                   <Typography
//                     fontWeight={700}
//                     textTransform="uppercase"
//                     gutterBottom
//                   >
//                     {r.examination.title}
//                   </Typography>

//                   <Typography variant="body2">Score</Typography>

//                   <Typography variant="h6" fontWeight={700} gutterBottom>
//                     {r.score}%
//                   </Typography>

//                   <Button
//                     fullWidth
//                     variant="outlined"
//                     component={Link}
//                     to={`/examtranscript?examination=${r.examination._id}`}
//                   >
//                     View Transcript
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))}
//         </>
//       ) : (
//         /* ================= DESKTOP ================= */
//         <DataGrid
//           rows={results}
//           columns={columns}
//           loading={loading}
//           autoHeight
//           pageSizeOptions={[5, 10, 20]}
//         />
//       )}
//     </div>
//   );
// }

function ExaminationScore() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getData = async () => {
    setLoading(true);
    const { data } = await httpService("examination/results");
    if (data) setResults(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box sx={{ bgcolor: "#f4f6f8", minHeight: "100vh", py: 4 }}>
      <div className="container">
        {/* HEADER */}
        <Box mb={4}>
          <Typography variant={isMobile ? "h6" : "h5"} fontWeight={800}>
            Examination Results
          </Typography>

          <Typography variant="body2" color="text.secondary">
            View all your completed examinations and scores
          </Typography>
        </Box>

        {/* ================= LOADING ================= */}
        {loading && (
          <Box>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="rounded" height={100} sx={{ mb: 2 }} />
            ))}
          </Box>
        )}

        {/* ================= EMPTY STATE ================= */}
        {!loading && results.length === 0 && (
          <Paper
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              No Results Yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your examination results will appear here once you complete an
              exam.
            </Typography>
          </Paper>
        )}

        {/* ================= RESULTS ================= */}
        {!loading && results.length > 0 && (
          <Grid container spacing={2}>
            {results.map((r) => {
              const score = r.score;

              return (
                <Grid item xs={12} md={6} lg={4} key={r._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card
                      sx={{
                        borderRadius: 3,
                        p: 2,
                        boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                      }}
                    >
                      <CardContent>
                        {/* EXAM TITLE */}
                        <Typography variant="overline" color="text.secondary">
                          Examination
                        </Typography>

                        <Typography
                          fontWeight={800}
                          textTransform="uppercase"
                          gutterBottom
                        >
                          {r.examination.title}
                        </Typography>

                        {/* SCORE */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: 1,
                            mb: 2,
                          }}
                        >
                          <Typography
                            variant="h4"
                            fontWeight={800}
                            color={
                              score >= 70
                                ? "success.main"
                                : score >= 50
                                  ? "warning.main"
                                  : "error.main"
                            }
                          >
                            {score}%
                          </Typography>

                          <Typography variant="caption" color="text.secondary">
                            Score
                          </Typography>
                        </Box>

                        {/* VIEW BUTTON */}
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          component={Link}
                          to={`/examtranscript?examination=${r.examination._id}`}
                          sx={{
                            fontWeight: 700,
                            textTransform: "none",
                            borderRadius: 2,
                          }}
                        >
                          View Transcript
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>
    </Box>
  );
}

export default ExaminationScore;
