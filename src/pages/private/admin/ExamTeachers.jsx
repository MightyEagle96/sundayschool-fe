import React, { useEffect, useState } from "react";
import { ApplicationNavigation } from "../../../routes/MainRoutes";
import { httpService } from "../../../httpService";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";

function ExamTeachers() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // DataGrid uses 0-based index
    pageSize: 50, // rows per page
  });

  const [teachers, setTeachers] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getCandidatess = async () => {
    setLoading(true);
    const { data, error } = await httpService.get("/auth/teachers", {
      params: {
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      },
    });

    if (data) {
      setTeachers(data.teachers);
      setRowCount(data.total);
    }

    if (error) {
      toast.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCandidatess();
  }, [paginationModel]);

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
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 250,
      renderCell: (params) => (
        <div className="text-lowercase">{params.row.phoneNumber}</div>
      ),
    },
    {
      field: "classData",
      headerName: "Class",
      width: 250,
      renderCell: (params) => (
        <div className="text-uppercase">{params.row.classData.name}</div>
      ),
    },
    {
      field: "classCategory",
      headerName: "Class Category",
      width: 250,
      renderCell: (params) => (
        <div className="text-uppercase">{params.row.classCategory.name}</div>
      ),
    },
  ];

  return (
    <div>
      <div className="container my-5">
        <ApplicationNavigation links={[]} pageTitle={"Teachers"} />

        <DataGrid
          loading={loading}
          columns={columns}
          rows={teachers}
          rowCount={rowCount}
          onPaginationModelChange={setPaginationModel}
          paginationMode="server"
        />
      </div>
    </div>
  );
}

export default ExamTeachers;
