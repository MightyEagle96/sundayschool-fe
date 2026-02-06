import React, { useEffect, useState } from "react";
import { httpService } from "../../../httpService";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function ExaminationScore() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    const { data, error } = await httpService("examination/results");

    if (data) {
      setResults(data);
      console.log(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "examination",
      headerName: "Examination",
      renderCell: (params) => (
        <div className="text-uppercase">{params.row.examination.title}</div>
      ),
      width: 400,
    },
    { field: "score", headerName: "Score", width: 100 },
    {
      field: "_id",
      headerName: "View Transcript",
      width: 200,
      renderCell: (params) => (
        <Button
          sx={{ textTransform: "capitalize" }}
          component={Link}
          to={`/examtranscript?examination=${params.row.examination._id}  `}
        >
          view
        </Button>
      ),
    },
  ];
  return (
    <div>
      <div className="container mt-5">
        <div className="mb-4">
          <Typography>All Results</Typography>
        </div>
        <DataGrid rows={results} columns={columns} loading={loading} />
      </div>
    </div>
  );
}

export default ExaminationScore;
