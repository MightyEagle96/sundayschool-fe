import React, { useEffect, useState } from "react";
import { ApplicationNavigation } from "../../../routes/MainRoutes";
import { httpService } from "../../../httpService";
import { DataGrid } from "@mui/x-data-grid";

function Users() {
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid uses 0-based index
    pageSize: 50, // rows per page
  });
  const [students, setStudents] = useState([]);
  const [rowCount, setRowCount] = useState(0); // total records in DB

  const getCandidatess = async () => {
    setLoading(true);
    const { data, error } = await httpService.get("/auth/candidates", {
      params: {
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      },
    });

    if (data) {
      setStudents(data.candidates);
      setRowCount(data.total);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCandidatess();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "S/N",
      width: 100,
      renderCell: (params) => <div>{params.row.id}</div>,
    },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      renderCell: (params) => (
        <div className="text-capitalize">
          {params.row.firstName} {params.row.lastName}
        </div>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      renderCell: (params) => (
        <div className="text-lowercase">{params.row.email}</div>
      ),
    },
  ];
  return (
    <div>
      <div className="container mt-5 mb-5">
        <ApplicationNavigation links={[]} pageTitle={"Candidates"} />

        <DataGrid loading={loading} columns={columns} rows={students} />
      </div>
    </div>
  );
}

export default Users;
