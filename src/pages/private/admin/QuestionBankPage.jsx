import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { httpService } from "../../../httpService";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { ApplicationNavigation } from "../../../routes/MainRoutes";
import { KeyboardArrowRight } from "@mui/icons-material";
import { Link } from "react-router-dom";

function QuestionBankPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [examinations, setExaminations] = useState([]);

  const getExaminations = async () => {
    setLoading(true);
    const { data } = await httpService("examination/view");

    if (data) {
      setExaminations(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getExaminations();
  }, []);

  const columns = [
    { field: "id", headerName: "S/N", width: 70 },
    { headerName: "Title", field: "title", width: 400 },
    {
      headerName: "Yaya Questions",
      field: "yayaQuestions",
      width: 200,
      renderCell: () => 10,
    },
    {
      headerName: "Adult Questions",
      field: "adultQuestions",
      width: 200,
      renderCell: () => 15,
    },
    {
      headerName: "Action",
      field: "description",
      width: 400,
      renderCell: (params) => (
        <Button
          //onClick={() => console.log(params.row)}
          as={Link}
          to={`/admin/examquestions?examination=${params.row._id}&title=${params.row.title}`}
          endIcon={<KeyboardArrowRight />}
          sx={{ textTransform: "capitalize", textDecoration: "none" }}
        >
          view
        </Button>
      ),
    },
  ];
  return (
    <div>
      <div className="mt-5 mb-5">
        <div className="container">
          <div className="mb-4">
            <ApplicationNavigation links={[]} pageTitle={"Question Banks"} />
          </div>
          <div>
            <DataGrid
              columns={columns}
              rows={examinations}
              rowCount={examinations.length}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionBankPage;
