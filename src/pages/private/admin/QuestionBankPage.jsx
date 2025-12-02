import React, { useEffect, useState } from "react";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { httpService } from "../../../httpService";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { Modal } from "react-bootstrap";
import Alert from "@mui/material/Alert";

function QuestionBankPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    const { data, error } = await httpService("questionbank/count");

    if (data) {
      console.log(data);
    }
    if (error) {
      toast(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="mt-5 mb-5">
        <div className="container">
          <div className="mb-4">
            <Typography variant="h4" fontWeight={700}>
              Question Banks
            </Typography>
          </div>
          <div>
            <Button onClick={() => setShow(!show)}>Create new bank</Button>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={() => setShow(!show)}>
        <Modal.Header className="border-0 bg-light" closeButton>
          <Modal.Title>New Question Bank</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert severity="info" className="mb-3">
            To create a new question bank, enter the name of the examination you
            wish to add questions to. For example, 1st Quarter 2025/2026 Sunday
            school examination.
          </Alert>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button color="error" onClick={() => setShow(!show)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default QuestionBankPage;
