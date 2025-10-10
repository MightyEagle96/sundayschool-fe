import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
      path: "/admin/questionbank",
      component: <QuestionBankPage />,
    },
  ];

  return (
    <BrowserRouter>
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
      <FooterComponents />
    </BrowserRouter>
  );
}

export default MainRoutes;
