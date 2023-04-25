import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { IconButton } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink } from "react-router-dom";
import { sortByStringAsc, sortByStringDesc } from "../utils";

const Table = ({ getAlldata, page, rowsPerPage, deleteEmployee }) => {
  const [sortName, setSortName] = useState();
  const [sortEmail, setSortEmail] = useState();
  const [sortPosition, setSortPosition] = useState();

  const [getAllEmployeedata, setAlldata] = useState(getAlldata);

  const onHandleSort = (columnName) => {
    let sortedData;
    if(sortName || sortEmail || sortPosition) {
        sortedData = sortByStringAsc(getAllEmployeedata, columnName)
        setAlldata(sortedData)
    } else {
        sortedData = sortByStringDesc(getAllEmployeedata, columnName)
        setAlldata(sortedData)
    }
  }

  return (
    <>
      {getAllEmployeedata.length ? (
        <table className="table table-bordered">
          <thead>
            <tr className="table-light">
              <th scope="col">S.No</th>
              <th scope="col">User ID</th>
              <th scope="col" onClick={(e) => {
                    setSortName(!sortName);
                    onHandleSort("name")
                  }}>
                Name  {sortName ?"▼" : "▲"}    
              </th>
              <th scope="col" onClick={(e) => {
                    setSortEmail(!sortEmail);
                    onHandleSort("email")
                  }}>Email  {sortEmail ?"▼" : "▲"}</th>
              <th scope="col" onClick={(e) => {
                    setSortPosition(!sortPosition);
                    onHandleSort("position")
                  }}>Position  {sortPosition ?"▼" : "▲"}</th>
              <th scope="col">Mobile</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {getAllEmployeedata
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
    </>
  );
};

export default Table;
