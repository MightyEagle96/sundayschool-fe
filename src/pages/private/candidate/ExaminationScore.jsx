import React, { useEffect, useState } from "react";
import { httpService } from "../../../httpService";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function ExaminationScore() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getData = async () => {
    setLoading(true);
    const { data } = await httpService("examination/results");
    if (data) setResults(data);
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
      width: 400,
      renderCell: (params) => (
        <div className="text-uppercase">{params.row.examination.title}</div>
      ),
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
          to={`/examtranscript?examination=${params.row.examination._id}`}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <Typography variant={isMobile ? "h6" : "h5"}>All Results</Typography>
      </div>

      {/* ================= MOBILE ================= */}
      {isMobile ? (
        <>
          {loading &&
            [1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                variant="rounded"
                height={90}
                className="mb-3"
              />
            ))}

          {!loading &&
            results.map((r) => (
              <Card key={r.id} className="mb-3">
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Examination
                  </Typography>

                  <Typography
                    fontWeight={700}
                    textTransform="uppercase"
                    gutterBottom
                  >
                    {r.examination.title}
                  </Typography>

                  <Typography variant="body2">Score</Typography>

                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {r.score}%
                  </Typography>

                  <Button
                    fullWidth
                    variant="outlined"
                    component={Link}
                    to={`/examtranscript?examination=${r.examination._id}`}
                  >
                    View Transcript
                  </Button>
                </CardContent>
              </Card>
            ))}
        </>
      ) : (
        /* ================= DESKTOP ================= */
        <DataGrid
          rows={results}
          columns={columns}
          loading={loading}
          autoHeight
          pageSizeOptions={[5, 10, 20]}
        />
      )}
    </div>
  );
}

export default ExaminationScore;
