import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Skeleton,
  CardContent,
  Card,
  Box,
  Grid,
} from "@mui/material";
import { useAppUser } from "../../../contexts/AppUserContext";
import { httpService } from "../../../httpService";
import { useEffect, useState } from "react";
import { ArrowRight } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function CandidateHomePage() {
  const { user } = useAppUser();
  const [activeExamination, setActiveExamination] = useState(null);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getActiveExamination = async () => {
    setLoading(true);
    const { data, error } = await httpService.get(
      "examination/viewactiveexamination",
    );

    if (data) {
      setActiveExamination(data);
    }

    if (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getActiveExamination();
  }, []);

  return (
    // <div>
    //   {user && (
    //     <div>
    //       {/* HEADER */}
    //       <div className="container mt-5 mb-5">
    //         <div
    //           className="bg-light rounded d-flex align-items-center"
    //           style={{ minHeight: isMobile ? "auto" : "30vh" }}
    //         >
    //           <div className="w-100 p-4">
    //             <div className="row align-items-center text-center text-md-start">
    //               {/* Avatar */}
    //               <div
    //                 className={`col-lg-3 col-md-4 d-flex justify-content-center ${
    //                   !isMobile ? "border-end" : ""
    //                 } mb-3 mb-md-0`}
    //               >
    //                 {loading ? (
    //                   <Skeleton
    //                     variant="circular"
    //                     width={isMobile ? 70 : 100}
    //                     height={isMobile ? 70 : 100}
    //                   />
    //                 ) : (
    //                   <Avatar
    //                     {...stringAvatar(user.firstName + " " + user.lastName)}
    //                     sx={{
    //                       width: isMobile ? 70 : 100,
    //                       height: isMobile ? 70 : 100,
    //                       fontSize: isMobile ? 28 : 40,
    //                       textTransform: "uppercase",
    //                     }}
    //                   />
    //                 )}
    //               </div>

    //               {/* Welcome Text */}
    //               <div className="col-lg-9 col-md-8 d-flex align-items-center justify-content-center justify-content-md-start">
    //                 <div>
    //                   {loading ? (
    //                     <>
    //                       <Skeleton width={220} height={30} />
    //                       <Skeleton width={160} />
    //                     </>
    //                   ) : (
    //                     <Typography
    //                       variant={isMobile ? "h6" : "h4"}
    //                       fontWeight={300}
    //                       gutterBottom
    //                     >
    //                       Welcome back,&nbsp;
    //                       <span className="text-uppercase fw-bold">
    //                         {user.firstName} {user.lastName}
    //                       </span>
    //                     </Typography>
    //                   )}
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       {/* ALERT AREA */}
    //       <div className="container mb-5">
    //         <div className="col-lg-4">
    //           {loading ? (
    //             <Skeleton variant="rounded" height={130} />
    //           ) : activeExamination ? (
    //             <Alert severity="success">
    //               <AlertTitle>Active Examination</AlertTitle>
    //               <Typography
    //                 fontWeight={700}
    //                 variant="body2"
    //                 textTransform={"uppercase"}
    //               >
    //                 {activeExamination.title}
    //               </Typography>

    //               <div className="text-end">
    //                 {activeExamination.hasTakenThisExamination ? (
    //                   <Button
    //                     sx={{ textTransform: "capitalize" }}
    //                     endIcon={<ArrowRight />}
    //                     component={Link}
    //                     to={"/examinationscore"}
    //                   >
    //                     <Typography variant="caption">View Score</Typography>
    //                   </Button>
    //                 ) : (
    //                   <Button
    //                     sx={{ textTransform: "capitalize" }}
    //                     endIcon={<ArrowRight />}
    //                     component={Link}
    //                     to={`/examination?examination=${activeExamination._id}`}
    //                   >
    //                     <Typography variant="caption">Proceed</Typography>
    //                   </Button>
    //                 )}
    //               </div>
    //             </Alert>
    //           ) : (
    //             <Alert severity="error">
    //               <AlertTitle>No active examination</AlertTitle>
    //               There is no active examination at this time or the current
    //               examination hasn't been activated by the admin.
    //             </Alert>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>

    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
        py: 5,
      }}
    >
      {user && (
        <Box className="container">
          {/* HERO WELCOME CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card
              sx={{
                borderRadius: 5,
                mb: 4,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Grid container alignItems="center" spacing={3}>
                  {/* AVATAR */}
                  <Grid
                    item
                    xs={12}
                    md={3}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      borderRight: isMobile ? "none" : "1px solid #eee",
                      pr: isMobile ? 0 : 3,
                    }}
                  >
                    {loading ? (
                      <Skeleton variant="circular" width={100} height={100} />
                    ) : (
                      <Avatar
                        {...stringAvatar(user.firstName + " " + user.lastName)}
                        sx={{
                          width: 100,
                          height: 100,
                          fontSize: 40,
                          textTransform: "uppercase",
                          bgcolor: "#b71c1c",
                        }}
                      />
                    )}
                  </Grid>

                  {/* WELCOME TEXT */}
                  <Grid item xs={12} md={9}>
                    {loading ? (
                      <>
                        <Skeleton width={260} height={35} />
                        <Skeleton width={180} />
                      </>
                    ) : (
                      <>
                        <Typography variant="h4" fontWeight={800}>
                          Welcome back,
                        </Typography>

                        <Typography
                          variant="h5"
                          fontWeight={600}
                          textTransform="uppercase"
                          color="primary"
                        >
                          {user.firstName} {user.lastName}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mt={1}
                        >
                          Continue your Sunday School examination journey.
                        </Typography>
                      </>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>

          {/* EXAMINATION SECTION */}
          <Grid container>
            <Grid item xs={12} md={4}>
              {loading ? (
                <Skeleton variant="rounded" height={160} />
              ) : activeExamination ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card
                    sx={{
                      borderRadius: 4,
                      borderLeft: "6px solid #2e7d32",
                    }}
                  >
                    <CardContent>
                      <Typography variant="overline" color="text.secondary">
                        Active Examination
                      </Typography>

                      <Typography
                        variant="h6"
                        fontWeight={800}
                        textTransform="uppercase"
                        mt={1}
                      >
                        {activeExamination.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={1}
                        mb={3}
                      >
                        You have an active examination session available.
                      </Typography>

                      <Box textAlign="right">
                        {activeExamination.hasTakenThisExamination ? (
                          <Button
                            component={Link}
                            to="/examinationscore"
                            endIcon={<ArrowRight size={16} />}
                            sx={{
                              fontWeight: 700,
                              textTransform: "none",
                            }}
                          >
                            View Score
                          </Button>
                        ) : (
                          <Button
                            component={Link}
                            to={`/examination?examination=${activeExamination._id}`}
                            variant="contained"
                            color="error"
                            endIcon={<ArrowRight size={16} />}
                            sx={{
                              fontWeight: 700,
                              textTransform: "none",
                              borderRadius: 3,
                            }}
                          >
                            Proceed
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card
                    sx={{
                      borderRadius: 4,
                      borderLeft: "6px solid #d32f2f",
                    }}
                  >
                    <CardContent>
                      <Typography variant="overline" color="error">
                        No Active Examination
                      </Typography>

                      <Typography variant="body2" mt={1} color="text.secondary">
                        There is currently no active examination or it has not
                        been activated by admin.
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default CandidateHomePage;

export function stringToColor(string) {
  if (!string) {
    return "#ff971d";
  }
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name) {
  if (!name || typeof name !== "string") {
    return {
      sx: {
        bgcolor: "#ff971d",
      },
      children: "U",
    };
  }

  const parts = name.trim().split(" ");

  const firstInitial = parts[0]?.[0] || "";
  const secondInitial = parts[1]?.[0] || "";

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${firstInitial}${secondInitial}` || "U",
  };
}
