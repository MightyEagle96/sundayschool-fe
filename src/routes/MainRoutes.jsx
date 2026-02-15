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
import Users from "../pages/public/admin/Users";
import ExaminationPage from "../pages/private/candidate/ExaminationPage";
import TakeExamination from "../pages/private/candidate/TakeExamination";
import ExaminationConcluded from "../pages/private/candidate/ExaminationConcluded";
import ExaminationScore from "../pages/private/candidate/ExaminationScore";
import ExamTranscript from "../pages/private/candidate/ExamTranscript";
import TeacherLogin from "../pages/public/teacher/TeacherLogin";
import TeacherSignup from "../pages/public/teacher/TeacherSignup";
import TeacherHomePage from "../pages/private/teacher/TeacherHomePage";
import ClassesPage from "../pages/private/admin/ClassesPage";

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
    { path: "/teacher", component: <TeacherLogin /> },
    { path: "/teacher/signup", component: <TeacherSignup /> },
  ];

  const candidateRoutes = [
    {
      path: "/",
      component: <CandidateHomePage />,
    },

    { path: "/examination", component: <ExaminationPage /> },
    { path: "/takeexamination", component: <TakeExamination /> },
    { path: "/examinationconcluded", component: <ExaminationConcluded /> },
    { path: "/examinationscore", component: <ExaminationScore /> },
    { path: "/examtranscript", component: <ExamTranscript /> },
    { path: "*", component: <NotFound /> },
  ];

  const adminRoutes = [
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
    {
      path: "/admin/candidates",
      component: <Users />,
    },
    { path: "/admin/classes", component: <ClassesPage /> },
    { path: "*", component: <NotFound /> },
  ];

  const teacherRoutes = [{ path: "/teacher", component: <TeacherHomePage /> }];

  // const teacherRoutes = [{ path: "/teacher", component: <TeacherLogin /> }];

  if (loading) {
    return <div>Loading...</div>;
  }

  // const privateRoutes =
  //   user?.role === "student" ? candidateRoutes : adminRoutes;

  function showRoutes(role) {
    switch (role) {
      case "student":
        return candidateRoutes;
      case "teacher":
        return teacherRoutes;

      case "admin":
        return adminRoutes;
      default:
        return candidateRoutes;
    }
  }

  return (
    <BrowserRouter>
      <div style={{ minHeight: "80vh" }}>
        <NavbarComponent />
        <Routes>
          {user ? (
            <>
              {showRoutes(user.role).map((route, i) => (
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
      {user && <FooterComponents />}
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
