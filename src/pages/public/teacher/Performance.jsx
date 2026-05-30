import { Button, MenuItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { httpService } from "../../../httpService";
import { Table } from "react-bootstrap";

function Performance() {
  const [loading, setLoading] = useState(false);
  const [examinations, setExaminations] = useState([]);
  const [examination, setExamination] = useState("");
  const [results, setResults] = useState([]);

  const getData = async () => {
    setLoading(true);
    const { data } = await httpService("examination/view");

    if (data) {
      console.log(data);
      setExaminations(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const getResult = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await httpService("teacher/performance", {
      params: { examination },
    });

    if (data) {
      setResults(data);
      console.log(data);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="container">
        <div className="mb-4">
          <Typography variant="overline" gutterBottom>
            class Performance
          </Typography>
        </div>
        <div className="col-lg-4 mb-4">
          <form onSubmit={getResult}>
            <TextField
              fullWidth
              select
              label="Examination"
              className="text-uppercase"
              sx={{ mb: 2 }}
              onChange={(e) => setExamination(e.target.value)}
            >
              {examinations.map((c) => (
                <MenuItem className="text-uppercase" value={c._id}>
                  {c.title}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" type="submit" loading={loading}>
              get results
            </Button>
          </form>
        </div>
        <div className="mb-4">
          <div className="col-lg-6 table-responsive">
            <Table striped borderless>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {results.map((c, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                      <Typography variant="body2" textTransform={"capitalize"}>
                        {c.studentName}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="body2" textTransform={"capitalize"}>
                        {c.score}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Performance;
