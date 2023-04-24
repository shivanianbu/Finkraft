import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WorkIcon from "@mui/icons-material/Work";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { getApiResponse } from "../env";

const ViewEmployee = () => {
  const [getuserdata, setUserdata] = useState([]);

  const { id } = useParams("");
  const history = useNavigate();

  const getEmployee = async () => {
    const res = await fetch(`${getApiResponse()}/getemployee/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      console.log("error ");
    } else {
      setUserdata(data);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

  const deleteEmployee = async (id) => {
    const res2 = await fetch(`${getApiResponse()}/deleteemployee/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();

    if (res2.status === 400 || !deletedata) {
    } else {
      history.push("/");
    }
  };

  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>Welcome</h1>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add_btn">
            <NavLink to={`/edit/employee/${getuserdata.id}`}>
              {" "}
              <button className="btn btn-primary mx-2">
                <CreateIcon />
              </button>
            </NavLink>
            <button
              className="btn btn-danger"
              onClick={() => deleteEmployee(getuserdata.id)}
            >
              <DeleteOutlineIcon />
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <h3 className="mt-3">
                Name: <span>{getuserdata.name}</span>
              </h3>
              <h3 className="mt-3">
                User ID: <span>{getuserdata.userId}</span>
              </h3>
              <p className="mt-3">
                Age: <span>{getuserdata.age}</span>
              </p>
              <p className="mt-3">
                <MailOutlineIcon />
                Email: <span>{getuserdata.email}</span>
              </p>
            </div>
            <div className="right_view  col-lg-6 col-md-6 col-12">
              <p className="mt-5">
                <WorkIcon />
                Occuption: <span>{getuserdata.work}</span>
              </p>
              <p className="mt-3">
                <PhoneAndroidIcon />
                mobile: <span>+91 {getuserdata.mobile}</span>
              </p>
              <p className="mt-3">
                <LocationOnIcon />
                Address: <span>{getuserdata.add}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewEmployee;
