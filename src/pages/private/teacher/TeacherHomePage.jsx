import React, { useState } from "react";
import { useAppUser } from "../../../contexts/AppUserContext";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { stringAvatar } from "../candidate/CandidateHomePage";
import { motion } from "framer-motion";

function TeacherHomePage() {
  const { user } = useAppUser();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  return (
    <div>
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
        </Box>
      )}
    </div>
  );
}

export default TeacherHomePage;
