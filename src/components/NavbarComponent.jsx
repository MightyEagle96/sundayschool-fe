import Container from "react-bootstrap/Container";
import { Navbar, Nav } from "react-bootstrap";
import { appColors } from "../assets/appTheme";
import { Button, Typography } from "@mui/material";
import { useAppUser } from "../contexts/AppUserContext";
import { Login, Logout } from "@mui/icons-material";
import { httpService } from "../httpService";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function NavbarComponent() {
  const { user } = useAppUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const adminLinks = [
    { path: "/admin/dashboard", text: "Home" },
    { path: "/admin/officers", text: "Desk Officers" },
    { path: "/admin/candidates", text: "Candidates" },
    {
      path: `/admin/promorecommended/`,
      text: "Recommendations",
    },
    {
      path: `/admin/approvedcandidates/`,
      text: "Approvals",
    },
    {
      path: `/admin/searchcandidate/`,
      text: "Search Candidate(s)",
    },
    {
      path: `/admin/corrections/`,
      text: "Correction(s)",
    },
  ];

  const hrLinks = [
    { path: "/admin/dashboard", text: "Home" },
    { path: `/admin/hrcandidates/${user?.mda}`, text: "Candidates" },
    {
      path: `/admin/recommendedcandidates/${user?.mda}`,
      text: "Recommended ",
    },
  ];
  const promotionLinks = [
    { path: "/admin/dashboard", text: "Home" },

    {
      path: `/admin/promorecommended/`,
      text: "Recommended",
    },
    {
      path: `/admin/approvedcandidates/`,
      text: "Approved",
    },
  ];

  const candidateLinks = [
    { path: "/", text: "Home" },
    { path: "/documentstoupload", text: "Documents to upload" },
    { path: "/datacorrection", text: "Data Correction" },
  ];

  // ✅ Centralized link resolver
  const getLinks = () => {
    if (!user) return [];
    if (user.role === "admin" && user.specificRole === "admin") {
      document.title = "Admin Dashboard";
      return adminLinks;
    }
    if (user.role === "admin" && user.specificRole === "hr") {
      document.title = "HR Dashboard";
      return hrLinks;
    }
    if (user.role === "admin" && user.specificRole === "promotion") {
      document.title = "Promotion Dashboard";
      return promotionLinks;
    }
    if (user.role === "candidate") {
      document.title = "Candidate Dashboard";
      return candidateLinks;
    }
    return [];
  };
  const handleLogout = async () => {
    setLoading(true);
    try {
      const { data } = await httpService("auth/logout");
      if (data) {
        window.location.href = "/";
      }
    } finally {
      setLoading(false);
    }
  };

  const links = getLinks();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand
          onClick={() =>
            navigate(user && user.role === "admin" ? "/admin/dashboard" : "/")
          }
          style={{ cursor: "pointer" }}
        >
          <div className="d-flex align-items-center">
            <img
              alt=""
              src={logo}
              height="30"
              className="d-inline-block align-top me-2"
            />{" "}
            <span
              style={{
                color: appColors.primary2,
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              NLA SUNDAY SCHOOL
            </span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {links.map((c, i) => (
              <Nav.Link key={i} as={Link} to={c.path}>
                <Typography variant="body2">{c.text}</Typography>
              </Nav.Link>
            ))}
          </Nav>
          <Nav className="ms-auto">
            {user ? (
              <Button
                onClick={handleLogout}
                loading={loading}
                loadingPosition="end"
                color="error"
                endIcon={<Logout />}
              >
                <Typography
                  variant="body2"
                  sx={{ textTransform: "capitalize" }}
                >
                  Logout
                </Typography>
              </Button>
            ) : (
              <>
                {/* <Button
                color="error"
                endIcon={<Login />}
                sx={{ textTransform: "capitalize" }}
                onClick={() => navigate("/")}
              >
                <Typography variant="body2">Login</Typography>
              </Button> */}
                <Nav.Link as={Link} to="/">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/admin">
                  Admin-Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
