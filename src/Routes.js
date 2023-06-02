import React from "react";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Routes,
} from "react-router-dom";
import { PanelLayout } from "./layout";
import { Toaster } from "react-hot-toast";
import {
  AccessDenied,
  ProtectedRoutes,
  ProtectedloginRoutes,
  NotFound,
} from "./components";
import {
  SignIn,
  Dashboard,
  Verification,
  Students,
  Assessments,
  BlogPage,
  InboxPage,
  PasswordReset,
  VerificationDetail,
  StudentDetail,
  Results,
  Lesson,
  Exercise,
  Quiz,
  AssessmentsDetail,
  AddQuiz,
  ViewQuiz,
  Levels,
  Units,
  AddLesson,
} from "./module";

const Routess = () => {
  return (
    <>
      <HashRouter>
        <Toaster
          toastOptions={{
            style: {
              fontSize: "18px",
            },
          }}
        />
        <Routes>
          <Route element={<ProtectedloginRoutes />}>
            <Route path="/" element={<SignIn />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="" element={<PanelLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/verification" element={<Verification />} />
              <Route
                path="/verification/:id?"
                element={<VerificationDetail />}
              />
              <Route path="/students" element={<Students />} />
              <Route path="/students/:id?" element={<StudentDetail />} />
              <Route path="/students/:id?/results" element={<Results />} />
              <Route
                path="/students/:id?/results/lesson"
                element={<Lesson />}
              />
              <Route
                path="/students/:id?/results/lesson/exercise"
                element={<Exercise />}
              />
              <Route
                path="/students/:id?/results/lesson/exercise/quiz"
                element={<Quiz />}
              />

              <Route path="/assessments" element={<Assessments />} />
              <Route
                path="/assessments/detail/:id?"
                element={<AssessmentsDetail />}
              />
              <Route
                path="/assessments/detail/viewquiz/:id?"
                element={<ViewQuiz />}
              />
              <Route
                path="/assessments/detail/addquiz/:id?"
                element={<AddQuiz />}
              />
              <Route
                path="/assessments/detail/levels/:id?/:heading?"
                element={<Levels />}
              />
              <Route
                path="/assessments/detail/units/:id?"
                element={<Units />}
              />
              <Route
                path="/assessments/detail/addlesson/:id?"
                element={<AddLesson />}
              />

              <Route path="/inbox" element={<InboxPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/password-reset" element={<PasswordReset />} />
            </Route>
          </Route>
          <Route
            path="/not-found"
            element={<h1 className="text-white">Not found</h1>}
          />
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </>
  );
};
export default Routess;
