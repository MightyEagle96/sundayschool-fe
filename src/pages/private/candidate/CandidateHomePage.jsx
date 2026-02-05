import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAppUser } from "../../../contexts/AppUserContext";
import { httpService } from "../../../httpService";
import { useEffect, useState } from "react";
import { ArrowRight } from "@mui/icons-material";
import { Link } from "react-router-dom";

function CandidateHomePage() {
  const { user } = useAppUser();
  const [activeExamination, setActiveExamination] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getActiveExamination = async () => {
    const { data, error } = await httpService.get(
      "examination/viewactiveexamination",
    );

    if (data) {
      setActiveExamination(data);
    }

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getActiveExamination();
  }, []);
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container mb-5">
            {activeExamination ? (
              <div className="col-lg-4">
                <Alert severity="success">
                  <AlertTitle>Active Examination</AlertTitle>
                  <Typography
                    fontWeight={700}
                    variant="body2"
                    textTransform={"uppercase"}
                  >
                    {activeExamination.title}
                  </Typography>
                  <div className="text-end">
                    <Button
                      sx={{ textTransform: "capitalize" }}
                      endIcon={<ArrowRight />}
                      component={Link}
                      to={`/examination?examination=${activeExamination._id}`}
                    >
                      <Typography variant="caption">Proceed</Typography>
                    </Button>
                  </div>
                </Alert>
              </div>
            ) : (
              <div className="col-lg-4">
                <Alert severity="error">
                  <AlertTitle>No active examination</AlertTitle>
                  There is no active examination at this time or the current
                  examination hasn't been activated by the admin.
                </Alert>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CandidateHomePage;

function stringToColor(string) {
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

function stringAvatar(name) {
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
