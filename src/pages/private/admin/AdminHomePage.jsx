import React, { useEffect, useState } from "react";
import { Typography, Card, CardActionArea } from "@mui/material";
import { useAppUser } from "../../../contexts/AppUserContext";

import { People, School } from "@mui/icons-material";
import { httpService } from "../../../httpService";
import { Link } from "react-router-dom";

function AdminHomePage() {
  const { user } = useAppUser();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const { data } = await httpService("admin/dashboard");

    if (data) {
      setDashboardData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="mt-5 mb-5 container">
        <div className="mb-5">
          <div className="text-muted">
            <Typography gutterBottom>Hi There</Typography>
            <Typography variant="h4" fontWeight={700}>
              {user.firstName} {user.lastName}
            </Typography>
          </div>
        </div>

        {dashboardData && (
          <div className="row gx-4">
            <div className="p-3 bg-light rounded shadow-sm col-lg-4 d-flex justify-content-between align-items-center bg-light">
              <div>
                <div>
                  <Typography variant="overline">Students</Typography>
                </div>
                <div>
                  <Typography variant="h4">{dashboardData.students}</Typography>
                </div>
              </div>
              <div>
                <People fontSize="large" />
              </div>
            </div>
            <div className="p-3 bg-light rounded shadow-sm col-lg-4 d-flex justify-content-between align-items-center bg-light">
              <div>
                <div>
                  <Typography variant="overline">Teachers</Typography>
                </div>
                <div>
                  <Typography variant="h4">{dashboardData.teachers}</Typography>
                </div>
              </div>
              <div>
                <People fontSize="large" />
              </div>
            </div>
            <Card className="col-lg-4 p-0 bg-light shadow-sm border-0">
              <CardActionArea
                component={Link}
                to="/admin/classes"
                className="p-3"
              >
                <div className=" d-flex justify-content-between align-items-center rounded">
                  <div>
                    <Typography variant="overline">Classes</Typography>
                    <Typography variant="h4">
                      {dashboardData.adultClasses}
                    </Typography>
                  </div>

                  <School fontSize="large" />
                </div>
              </CardActionArea>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminHomePage;
