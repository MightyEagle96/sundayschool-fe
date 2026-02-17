import React, { useEffect, useState } from "react";
import { httpService } from "../../../httpService";
import { useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function ExaminationResults() {
  const [params] = useSearchParams();
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid uses 0-based index
    pageSize: 50, // rows per page
  });

  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const examination = params.get("examination");
  const getData = async () => {
    setLoading(true);
    const { data } = await httpService("examination/examinationresults", {
      params: {
        examination,
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      },
    });

    if (data) {
      setTotal(data.total);
      setResults(data.results);
      console.log(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [paginationModel]);

  const columns = [
    { field: "id", headerName: "S/N", width: 70 },
    {
      field: "student",
      headerName: "Student",
      width: 300,
      renderCell: (params) => (
        <div className="text-capitalize">
          {params.row.student.firstName} {params.row.student.lastName}
        </div>
      ),
    },
    {
      field: "questionCategory",
      headerName: "Class Category",
      width: 300,
      renderCell: (params) => (
        <div className="text-uppercase">{params.row.questionCategory.name}</div>
      ),
    },
    {
      field: "score",
      headerName: "Score",
      width: 300,
    },
  ];

  return (
    <div>
      <div className="container">
        <div className="mb-4">
          <Typography variant="h5">Examination Results</Typography>
        </div>
        <DataGrid
          loading={loading}
          rows={results}
          columns={columns}
          rowCount={total}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[50, 100]}
        />
      </div>
    </div>
  );
}

export default ExaminationResults;
