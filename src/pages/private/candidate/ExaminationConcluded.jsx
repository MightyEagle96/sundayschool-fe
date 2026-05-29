import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function ExaminationConcluded() {
  return (
    // <div>
    //   <div className="container my-5">
    //     <div className="text-center mb-3">
    //       <Typography variant="h4" fontWeight={700} gutterBottom>
    //         Examination Concluded
    //       </Typography>
    //       <Typography variant="body1">
    //         You have successfully completed the examination.
    //       </Typography>
    //     </div>
    //     <div className="text-center">
    //       <Button component={Link} to="/examinationscore">
    //         <Typography variant="body2" color="success">
    //           View examination score
    //         </Typography>
    //       </Button>
    //     </div>
    //   </div>
    // </div>
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f4f6f8",
        px: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={4}
          sx={{
            maxWidth: 500,
            width: "100%",
            p: 5,
            textAlign: "center",
            borderRadius: 4,
          }}
        >
          {/* ICON AREA (optional emoji for now) */}
          <Typography sx={{ fontSize: 60, mb: 2 }}>🎉</Typography>

          {/* TITLE */}
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Examination Completed
          </Typography>

          {/* SUBTEXT */}
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            You have successfully completed your examination. Your responses
            have been submitted and recorded.
          </Typography>

          {/* CTA */}
          <Button
            component={Link}
            to="/examinationscore"
            variant="contained"
            color="success"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 700,
              textTransform: "none",
            }}
          >
            View My Score
          </Button>

          {/* SECONDARY TEXT */}
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mt: 3 }}
          >
            You may now safely close this page.
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default ExaminationConcluded;
