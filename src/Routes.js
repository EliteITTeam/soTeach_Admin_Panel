import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PanelLayout } from "./layout";
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
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="" element={<PanelLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/verification/:id" element={<VerificationDetail />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/:id" element={<StudentDetail />} />
            <Route path="/students/:id/results" element={<Results />} />
            <Route path="/students/:id/results/lesson" element={<Lesson />} />
            <Route
              path="/students/:id/results/lesson/exercise"
              element={<Exercise />}
            />
            <Route
              path="/students/:id/results/lesson/exercise/quiz"
              element={<Quiz />}
            />

            <Route path="/assessments" element={<Assessments />} />
            <Route path="/assessments/detail" element={<AssessmentsDetail />} />
            <Route path="/assessments/detail/viewquiz" element={<ViewQuiz />} />
            <Route path="/assessments/detail/addquiz" element={<AddQuiz />} />
            <Route path="/assessments/detail/levels" element={<Levels />} />
            <Route path="/assessments/detail/units" element={<Units />} />
            <Route
              path="/assessments/detail/addlesson"
              element={<AddLesson />}
            />

            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/password-reset" element={<PasswordReset />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};
export default Routess;
