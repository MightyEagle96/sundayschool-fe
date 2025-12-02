import React from "react";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import CandidateLogin from "../pages/public/candidate/CandidateLogin";
import AdminLogin from "../pages/public/admin/AdminLogin";
import NotFound from "../pages/NotFound";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponents from "../components/FooterComponents";
import SignUp from "../pages/public/candidate/SignUp";
import CandidateHomePage from "../pages/private/candidate/CandidateHomePage";
import { useAuth } from "./useAuth";
import AdminSignup from "../pages/public/admin/AdminSignup";
import AdminHomePage from "../pages/private/admin/AdminHomePage";
import QuestionBankPage from "../pages/private/admin/QuestionBankPage";
import Examinations from "../pages/private/admin/Examinations";
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import { useAppUser } from "../contexts/AppUserContext";
import ExamQuestions from "../pages/private/admin/ExamQuestions";

function MainRoutes() {
  const { user, loading } = useAuth();
  const publicRoutes = [
    { path: "/", component: <CandidateLogin /> },
    { path: "/signup", component: <SignUp /> },
    {
      path: "/admin",
      component: <AdminLogin />,
    },
    {
      path: "/admin/signup",
      component: <AdminSignup />,
    },
  ];

  const privateRoutes = [
    {
      path: "/",
      component: <CandidateHomePage />,
    },
    {
      path: "/admin",
      component: <AdminHomePage />,
    },
    {
      path: "/admin/questionbanks",
      component: <QuestionBankPage />,
    },
    {
      path: "/admin/examinations",
      component: <Examinations />,
    },
    {
      path: "/admin/examquestions",
      component: <ExamQuestions />,
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <div style={{ minHeight: "80vh" }}>
        <NavbarComponent />
        <Routes>
          {user ? (
            <>
              {privateRoutes.map((route, i) => (
                <Route key={i} path={route.path} element={route.component} />
              ))}
            </>
          ) : (
            <>
              {publicRoutes.map((route, i) => (
                <Route key={i} path={route.path} element={route.component} />
              ))}
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <FooterComponents />
    </BrowserRouter>
  );
}

export default MainRoutes;

export function ApplicationNavigation({ links, pageTitle }) {
  const user = useAppUser();
  return (
    <Stack spacing={2} className="mb-4">
      <Breadcrumbs separator={<NavigateNext />}>
        <Link
          style={{ color: "GrayText", textDecoration: "none" }}
          component={Router}
          to={user?.user?.role === "candidate" ? "/" : "/admin"}
          color="inherit"
        >
          Home
        </Link>
        {links.map((link) => (
          <Link
            style={{ color: "GrayText", textDecoration: "none" }}
            component={Router}
            to={link.path}
            color="inherit"
          >
            {link.name}
          </Link>
        ))}
        <Typography color="text.secondary" className="text-wrap">
          {pageTitle}
        </Typography>
      </Breadcrumbs>
    </Stack>
  );
}
