import React, { useState, useEffect } from "react";
import "../App.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { IconButton, TablePagination } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink } from "react-router-dom";
import { getApiResponse } from "../env";
import Spinner from "../components/spinner";

const Home = () => {
  const [getAlldata, setAlldata] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const getAllEmployeeDetail = async () => {
    const res = await fetch(`${getApiResponse()}/getallemployee`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      console.log("error ");
    } else {
      setAlldata(data);
    }
  };

  useEffect(() => {
    getAllEmployeeDetail();
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
      console.log("error");
    } else {
      getAllEmployeeDetail();
    }
  };

  const searchEmployee = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${getApiResponse()}/searchemployee/${searchInput}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const searchRes = await res.json();
    if (res.status === 400 || !searchRes) {
      return <>No Data Found</>;
    } else {
      setAlldata(searchRes);
    }
  };

  return (
      <div className="mt-5">
        <div className="container">
          <div className="col-md-4">
            <form
              className="d-flex input-group mb-3 "
              onSubmit={searchEmployee}
            >
              <input
                className="form-control"
                type="search"
                placeholder="Search by name, email, Job, user id "
                aria-label="Search"
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </form>
          </div>
          {getAlldata.length ? (
            <table className="table table-bordered">
              <thead>
                <tr className="table-light">
                  <th scope="col">S.No</th>
                  <th scope="col">User ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Position</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {getAlldata.map((employee, id) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{id + 1}</th>
                        <td>{employee.userId}</td>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.work}</td>
                        <td>{employee.mobile}</td>
                        <td className="d-flex">
                          <NavLink to={`/view/employee/${employee._id}`}>
                            <IconButton color="primary">
                              <RemoveRedEyeIcon />
                            </IconButton>
                          </NavLink>
                          <NavLink to={`/edit/employee/${employee._id}`}>
                            <IconButton color="primary">
                              <CreateIcon />
                            </IconButton>
                          </NavLink>

                          <IconButton
                            color="error"
                            onClick={() => deleteEmployee(employee._id)}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <Spinner />
          )}

          <TablePagination
            component="div"
            count={getAlldata.length}
            page={page}
            onPageChange={() => setPage()}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) =>
              setRowsPerPage(parseInt(e.target.value, 10))
            }
          />
        </div>
      </div>
  );
};

export default Home;
