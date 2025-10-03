import React, { useState } from "react";
import logo from "../../assets/logo.png";
import {
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { httpService } from "../../httpService";
import { toast } from "react-toastify";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Login, Visibility, VisibilityOff } from "@mui/icons-material";

function CandidateLogin() {
  const [candidate, setCandidate] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState(false);
  const loginCandidate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await httpService.post("auth/login", candidate);
    if (data) {
      window.location.href = "/";
    }
    if (error) {
      toast.error(error);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="container mt-5 mb-5">
        <div className="row  d-flex justify-content-center">
          <div className="col-lg-4  ">
            <div className="d-flex justify-content-center mb-3">
              <img
                src={logo}
                alt="logo"
                className="d-inline-block align-top me-2"
                height={70}
              />
            </div>
            <div className="d-flex justify-content-center mb-5">
              <Typography variant="h5" fontWeight={700}>
                Candidate Login
              </Typography>
            </div>
            <form onSubmit={loginCandidate}>
              <div className="mb-4">
                <TextField
                  fullWidth
                  label="Email Address"
                  onChange={(e) =>
                    setCandidate({ ...candidate, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <TextField
                  fullWidth
                  label="Password"
                  type={passwordType ? "text" : "password"}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setPasswordType(!passwordType)}
                          >
                            {passwordType ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  onChange={(e) =>
                    setCandidate({ ...candidate, password: e.target.value })
                  }
                />
              </div>
              <Button
                type="submit"
                loading={loading}
                loadingPosition="end"
                color="error"
                variant="contained"
                endIcon={<Login />}
                fullWidth
              >
                Login
              </Button>
              <div className="mt-4 text-center">
                <Typography color="GrayText" variant="body2">
                  <Nav.Link as={Link} to={"/signup"} className="text-success">
                    Don't have an account? Sign up now
                  </Nav.Link>
                  {/* <a href="/admin/login" className="text-success">
                      Login as admin
                    </a> */}
                </Typography>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateLogin;
