import React, { useEffect, useState } from "react";
import { httpService } from "../../../httpService";
import {
  Button,
  Skeleton,
  Typography,
  Box,
  Card,
  Grid,
  CardContent,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppUser } from "../../../contexts/AppUserContext";
import { Login } from "@mui/icons-material";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

function ExaminationPage() {
  const [params] = useSearchParams();

  const examinationId = params.get("examination");
  const [examination, setExamination] = useState(null);
  const [classCategory, setClassCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAppUser();
  const getData = async () => {
    setLoading(true);
    const { data, error } = await httpService("examination/viewexamination", {
      params: { id: examinationId },
    });

    if (data) {
      setExamination(data.examination);
      setClassCategory(data.classCategory);
    }
    if (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();
  const moveToExamination = () => {
    Swal.fire({
      // icon: "question",
      // title: "Begin Examination",
      // text: "Are you sure you want to begin this examination?",
      // showCancelButton: true,
      // confirmButtonText: "Yes",
      // cancelButtonText: "No",
      icon: "warning",
      title: "Start Examination?",
      html: `
    <p style="font-size:14px">
      You are about to begin your examination.
    </p>
    <p style="font-size:13px; color:#b71c1c; font-weight:600;">
      Once started, the timer will begin and you may not be able to pause or restart.
    </p>
  `,
      showCancelButton: true,
      confirmButtonText: "Yes, Begin",
      cancelButtonText: "Cancel",
      reverseButtons: true,

      confirmButtonColor: "#b71c1c",
      cancelButtonColor: "#6c757d",

      allowOutsideClick: false,
      focusCancel: true,

      customClass: {
        popup: "exam-swal",
        title: "exam-swal-title",
      },
    }).then(async (result) => {
      const goFullscreen = async () => {
        try {
          const el = document.documentElement;

          if (el.requestFullscreen) {
            await el.requestFullscreen();
          }
        } catch (err) {
          console.log("Fullscreen failed:", err);
        }
      };

      await goFullscreen();

      navigate(`/takeexamination?examination=${examinationId}`);
      // if (result.isConfirmed) {
      //   const goFullscreen = async () => {
      //     const el = document.documentElement;

      //     if (el.requestFullscreen) {
      //       await el.requestFullscreen();
      //     }
      //   };
      //   const res = await goFullscreen();

      //   if (res) {
      //     navigate(`/takeexamination?examination=${examinationId}`);
      //   }
      // }
    });
  };
  return (
    // <div>
    //   <div className="container my-5">
    //     {/* LOADING UI */}
    //     {loading && (
    //       <div>
    //         <div className="mb-4">
    //           <Skeleton width={220} height={35} />
    //         </div>

    //         <div className="mb-5">
    //           <Skeleton height={20} />
    //           <Skeleton height={20} />
    //           <Skeleton width="80%" height={20} />
    //         </div>

    //         <div className="col-lg-3 mb-3">
    //           <Skeleton variant="rounded" height={90} />
    //         </div>

    //         <div className="col-lg-3">
    //           <Skeleton variant="rounded" height={40} />
    //         </div>
    //       </div>
    //     )}

    //     {/* REAL CONTENT */}
    //     {!loading && examination && (
    //       <div>
    //         <div className="mb-4">
    //           <Typography variant="h5" fontWeight={700} color="primary">
    //             Examination Preview
    //           </Typography>
    //         </div>

    //         <div className="mb-5">
    //           <Typography gutterBottom>
    //             Dear{" "}
    //             <span className="text-capitalize fw-bold">
    //               {user.firstName} {user.lastName}
    //             </span>
    //             , Welcome to{" "}
    //             <span className="text-uppercase fw-bold">
    //               {examination.title}
    //             </span>
    //             .
    //           </Typography>

    //           <Typography>
    //             This examination is for {examination.duration} minutes. Kindly
    //             ensure your internet is stable and you have a stable device.
    //           </Typography>

    //           <Typography>
    //             Do not close the tab nor minimize the page as this will be
    //             presumed to be a malpractice.
    //           </Typography>
    //         </div>

    //         <div className="alert alert-warning col-lg-3 border-0">
    //           <Typography variant="caption">Class Category</Typography>

    //           <Typography
    //             variant="h4"
    //             textTransform="uppercase"
    //             fontWeight={700}
    //           >
    //             {classCategory?.name}
    //           </Typography>
    //         </div>

    //         <div className="col-lg-3">
    //           <Button
    //             onClick={moveToExamination}
    //             fullWidth
    //             variant="contained"
    //             endIcon={<Login />}
    //           >
    //             Begin Examination
    //           </Button>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>

    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
        py: 6,
        px: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box width="100%" maxWidth={900}>
        {/* LOADING */}
        {loading && (
          <Card sx={{ p: 4, borderRadius: 4 }}>
            <Skeleton width={260} height={40} sx={{ mb: 3 }} />

            <Skeleton height={20} />
            <Skeleton height={20} />
            <Skeleton width="70%" height={20} sx={{ mb: 3 }} />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Skeleton variant="rounded" height={90} />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Skeleton variant="rounded" height={90} />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Skeleton variant="rounded" height={90} />
              </Grid>
            </Grid>
          </Card>
        )}

        {/* CONTENT */}
        {!loading && examination && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card
              sx={{
                borderRadius: 5,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent sx={{ p: 5 }}>
                {/* HEADER */}
                <Typography
                  variant="h4"
                  fontWeight={800}
                  color="primary"
                  mb={3}
                >
                  Examination Preview
                </Typography>

                {/* BODY TEXT */}
                <Box mb={4}>
                  <Typography gutterBottom>
                    Dear{" "}
                    <strong>
                      {user.firstName} {user.lastName}
                    </strong>
                    , welcome to{" "}
                    <strong style={{ textTransform: "uppercase" }}>
                      {examination.title}
                    </strong>
                    .
                  </Typography>

                  <Typography sx={{ mb: 1 }}>
                    This examination is for{" "}
                    <strong>{examination.duration} minutes</strong>.
                  </Typography>

                  <Typography sx={{ mb: 1 }}>
                    Ensure stable internet connection and uninterrupted access
                    throughout the exam.
                  </Typography>

                  <Typography color="error" fontWeight={600}>
                    Do not close or refresh the page during the exam.
                  </Typography>
                </Box>

                {/* INFO GRID */}
                <Grid container spacing={3} mb={4}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
                      <Typography variant="caption" color="text.secondary">
                        Class Category
                      </Typography>

                      <Typography
                        variant="h5"
                        fontWeight={800}
                        textTransform="uppercase"
                      >
                        {classCategory?.name}
                      </Typography>
                    </Card>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
                      <Typography variant="caption" color="text.secondary">
                        Duration
                      </Typography>

                      <Typography variant="h5" fontWeight={800}>
                        {examination.duration} mins
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>

                {/* CTA */}
                <Box textAlign="center">
                  <Button
                    onClick={moveToExamination}
                    variant="contained"
                    color="error"
                    size="large"
                    endIcon={<Login />}
                    sx={{
                      px: 6,
                      py: 1.8,
                      borderRadius: 50,
                      fontWeight: 800,
                      textTransform: "none",
                      fontSize: "1rem",
                    }}
                  >
                    Begin Examination
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </Box>
    </Box>
  );
}

export default ExaminationPage;
