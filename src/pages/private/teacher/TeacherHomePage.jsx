import React from "react";
import { useAppUser } from "../../../contexts/AppUserContext";
import { useTheme } from "@mui/material/styles";
import { Avatar, Typography, useMediaQuery } from "@mui/material";
import { stringAvatar } from "../candidate/CandidateHomePage";

function TeacherHomePage() {
  const { user } = useAppUser();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      {user && (
        <div>
          <div className="container mt-5 mb-5">
            <div
              className="bg-light rounded d-flex align-items-center"
              style={{ minHeight: isMobile ? "auto" : "30vh" }}
            >
              <div className="w-100 p-4">
                <div className="row align-items-center text-center text-md-start">
                  {/* Avatar */}
                  <div
                    className={`col-lg-3 col-md-4 d-flex justify-content-center ${
                      !isMobile ? "border-end" : ""
                    } mb-3 mb-md-0`}
                  >
                    <Avatar
                      {...stringAvatar(user.firstName + " " + user.lastName)}
                      sx={{
                        width: isMobile ? 70 : 100,
                        height: isMobile ? 70 : 100,
                        fontSize: isMobile ? 28 : 40,
                        textTransform: "uppercase",
                      }}
                    />
                  </div>

                  {/* Welcome Text */}
                  <div className="col-lg-9 col-md-8 d-flex align-items-center justify-content-center justify-content-md-start">
                    <div>
                      <Typography
                        variant={isMobile ? "h6" : "h4"}
                        fontWeight={300}
                        gutterBottom
                      >
                        Welcome back,&nbsp;
                        <span className="text-uppercase fw-bold">
                          {user.firstName} {user.lastName}
                        </span>
                      </Typography>
                      <Typography
                        variant={isMobile ? "body1" : "h6"}
                        fontWeight={300}
                      >
                        You are logged in as a teacher
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherHomePage;
