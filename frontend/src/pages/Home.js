import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { IconButton, TablePagination } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink } from "react-router-dom";
import { getApiResponse } from "../env";
import Spinner from "../components/spinner";
import {
  adddata,
  deldata,
  updatedata,
} from "../components/context/ContextProvider";

const Home = () => {
  const [getAlldata, setAlldata] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { udata, setUdata } = useContext(adddata);
  const { updata, setUPdata } = useContext(updatedata);
  const { dltdata, setDLTdata } = useContext(deldata);

  const getAllEmployeeDetail = async () => {
    setIsLoading(true);
    const res = await fetch(`${getApiResponse()}/getallemployee`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      setIsError(true);
      setIsLoading(false);
    } else {
      setAlldata(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllEmployeeDetail();
  }, []);

  const deleteEmployee = async (id) => {
    setIsLoading(true);
    const res2 = await fetch(`${getApiResponse()}/deleteemployee/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();

    if (res2.status === 400 || !deletedata) {
      setIsError(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setDLTdata(deletedata);
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
      setIsError(true);
    } else {
      setAlldata(searchRes);
    }
  };

  if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        Something Went Wrong - Try Again later
      </div>
    );
  }

  return (
    <div className="mt-5">
      <div className="container">
        {udata ? (
          <>
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <strong>{udata.name}</strong> added succesfully!
            </div>
          </>
        ) : (
          ""
        )}
        {updata ? (
          <>
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <strong>{updata.name}</strong> updated succesfully!
            </div>
          </>
        ) : (
          ""
        )}

        {dltdata ? (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>{dltdata.name}</strong> deleted succesfully!
          </div>
        ) : (
          ""
        )}

        <div className="col-md-4">
          <form className="d-flex input-group mb-3 " onSubmit={searchEmployee}>
            <input
              className="form-control"
              type="search"
              placeholder="Search by name, email, job, user id "
              aria-label="Search"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
        {isLoading ? (
          <Spinner />
        ) : getAlldata.length ? (
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
              {getAlldata
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((employee, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
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
                  );
                })}
            </tbody>
          </table>
        ) : (
          <>No data Found</>
        )}
        {getAlldata.length > 10 && (
          <TablePagination
            component="div"
            count={getAlldata.length}
            page={page}
            onPageChange={(e, newpage) => setPage(newpage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(+e.target.value);
              setPage(0);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
