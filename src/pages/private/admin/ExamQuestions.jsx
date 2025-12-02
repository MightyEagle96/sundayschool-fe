import { Typography } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { ApplicationNavigation } from "../../../routes/MainRoutes";

function ExamQuestions() {
  const [params, setParams] = useSearchParams();

  const examination = params.get("examination");
  const title = params.get("title");

  console.log({ examination, title });
  return (
    <div>
      <div className="mt-5">
        <div className="container">
          <ApplicationNavigation
            links={[{ path: "/admin/questionbanks", name: "Question Banks" }]}
            pageTitle={title.toWellFormed()}
          />
        </div>
      </div>
    </div>
  );
}

export default ExamQuestions;
