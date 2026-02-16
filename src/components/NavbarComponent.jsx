import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppUser } from "../contexts/AppUserContext";
import { httpService } from "../httpService";
import { appColors } from "../assets/appTheme";
import logo from "../assets/logo.png";

function NavbarComponent() {
  const { user } = useAppUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { data } = await httpService("auth/logout");
      if (data) window.location.href = "/";
    } finally {
      setLoading(false);
    }
  };

  const adminLinks = [
    { text: "Home", path: "/admin" },
    { text: "Examinations", path: "/admin/examinations" },
    // { text: "Question Banks", path: "/admin/questionbanks" },
    { text: "Candidates", path: "/admin/candidates" },
    { text: "Classes", path: "/admin/classes" },
  ];

  const teacherLinks = [
    { text: "Home", path: "/teacher" },
    { text: "Examinations", path: "/teacher/examinations" },
    { text: "Attendance", path: "/teacher/attendance" },
  ];

  const studentLinks = [
    { text: "Home", path: "/" },
    { text: "Examination Score", path: "/examinationscore" },
  ];

  function switchNavLinks(role) {
    switch (role) {
      case "teacher":
        return teacherLinks;
      case "admin":
        return adminLinks;
      case "student":
        return studentLinks;
      default:
        return studentLinks;
    }
  }

  // const navLinks = user?.role === "teacher" ? adminLinks : studentLinks;

  const navLinks = switchNavLinks(user?.role);
  return (
    <>
      <AppBar position="sticky" elevation={2} sx={{ bgcolor: "white" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* LOGO */}
          <Box
            display="flex"
            alignItems="center"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(user?.role === "teacher" ? "/admin" : "/")}
          >
            <img src={logo} alt="logo" height={34} />
            <Typography
              ml={1}
              fontWeight="bold"
              fontSize={14}
              sx={{ color: appColors.primary2 }}
            >
              NLA SUNDAY SCHOOL
            </Typography>
          </Box>

          {/* DESKTOP LINKS */}
          {user && (
            <Stack
              direction="row"
              spacing={3}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {navLinks.map((link) => (
                <Button
                  key={link.text}
                  component={Link}
                  to={link.path}
                  sx={{ textTransform: "capitalize", color: "text.primary" }}
                >
                  {link.text}
                </Button>
              ))}
            </Stack>
          )}

          {/* RIGHT SIDE */}
          <Box display="flex" alignItems="center" gap={2}>
            {user ? (
              <Button
                onClick={handleLogout}
                color="error"
                endIcon={<LogoutIcon />}
                disabled={loading}
                sx={{
                  textTransform: "capitalize",
                  display: { xs: "none", md: "flex" },
                }}
              >
                Logout
              </Button>
            ) : (
              <Stack direction="row" spacing={2}>
                <Button component={Link} to="/">
                  Login
                </Button>
                {/* <Button component={Link} to="/admin">
                  Admin Login
                </Button> */}
              </Stack>
            )}

            {/* MOBILE HAMBURGER */}
            {user && (
              <IconButton
                sx={{ display: { xs: "flex", md: "none" } }}
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 260, p: 2 }}>
          <Typography fontWeight="bold" mb={2}>
            Menu
          </Typography>

          <Divider />

          <List>
            {navLinks.map((link) => (
              <ListItemButton
                key={link.text}
                component={Link}
                to={link.path}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={link.text} />
              </ListItemButton>
            ))}
          </List>

          <Divider />

          <Box mt={2}>
            {user ? (
              <Button
                fullWidth
                color="error"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                disabled={loading}
              >
                Logout
              </Button>
            ) : (
              <Stack spacing={2}>
                <Button component={Link} to="/">
                  Login
                </Button>
                {/* <Button component={Link} to="/admin">
                  Admin Login
                </Button> */}
              </Stack>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default NavbarComponent;
