import React, { useEffect, useState } from "react";
import { httpService } from "../../../httpService";
import { Stack, Typography } from "@mui/material";
import { Table } from "react-bootstrap";

function MyStudents() {
  const [students, setStudents] = useState([]);
  const [classCategory, setClassCategory] = useState({});
  const [classData, setClassData] = useState({});
  const getStudents = async () => {
    const { data } = await httpService("teacher/students");

    if (data) {
      setStudents(data.students);
      setClassCategory(data.classCategory);
      setClassData(data.classData);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);
  return (
    <div>
      <div className="container">
        {classData && classCategory && (
          <div className="mb-4">
            <Typography variant="overline" gutterBottom>
              my students
            </Typography>
            <Stack direction={"row"} spacing={2}>
              <Typography
                variant="h5"
                fontWeight={700}
                textTransform={"uppercase"}
              >
                {classData.name} class
              </Typography>
              <Typography
                variant="h6"
                fontWeight={300}
                color="GrayText"
                textTransform={"uppercase"}
              >
                ({classCategory.name})
              </Typography>
            </Stack>

            <div className="mt-3">
              <Typography variant="h4" fontWeight={700} color="primary">
                {students.length}{" "}
                {students.length === 1 ? "student" : "students"}
              </Typography>
            </div>
          </div>
        )}

        <div className="col-lg-6 table-responsive">
          <Table striped borderless>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {students.map((c, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>
                    <Typography variant="body2" textTransform={"capitalize"}>
                      {c.firstName} {c.lastName}
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="body2" textTransform={"capitalize"}>
                      {c.phoneNumber}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default MyStudents;
