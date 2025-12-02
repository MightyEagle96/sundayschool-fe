import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ApplicationNavigation } from "../../../routes/MainRoutes";
import { Modal } from "react-bootstrap";

function ExamQuestions() {
  const [params, setParams] = useSearchParams();
  const [classCategory, setClassCategory] = useState("");
  const [show, setShow] = useState(false);

  const examination = params.get("examination");
  const title = params.get("title");

  console.log({ examination, title });
  return (
    <div>
      <div className="mt-5">
        <div className="container">
          <ApplicationNavigation
            links={[{ path: "/admin/questionbanks", name: "Question Banks" }]}
            pageTitle={title.toLocaleUpperCase()}
          />
          <div className="row">
            <div className="col-lg-4">
              <Button
                onClick={() => {
                  setClassCategory("adult");
                  setShow(true);
                }}
              >
                Add Questions for adult class
              </Button>
            </div>
            <div className="col-lg-4">
              <Button
                color="error"
                onClick={() => {
                  setClassCategory("yaya");
                  setShow(true);
                }}
              >
                Add Questions for YAYA class
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        size="xl"
        centered
        show={show}
        onHide={() => {
          setShow(false);
          setClassCategory("");
        }}
      >
        <Modal.Header closeButton className="border-0 bg-light">
          <Modal.Title style={{ textTransform: "" }}>
            Set question for{" "}
            <span className="text-uppercase fw-bold">{classCategory}</span>{" "}
            class.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typography>Modal body text goes here.</Typography>
        </Modal.Body>
        <Modal.Footer>
          <Button>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ExamQuestions;
