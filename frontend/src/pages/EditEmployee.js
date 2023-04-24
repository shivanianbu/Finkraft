import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "../components/form";
import { getApiResponse } from "../env";
import Spinner from "../components/spinner";
import { updatedata } from '../components/context/ContextProvider'

const EditEmployee = () => {
  const navigate = useNavigate("");
  const { id } = useParams("");

  const [showForm, setShowForm] = useState(false);
  const {updata, setUPdata} = useContext(updatedata)

  const [inpval, setINP] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    add: "",
    desc: "",
  });

  const getEmployeeData = async () => {
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
      setINP(data);
      setShowForm(true);
    }
  };

  useEffect(() => {
    getEmployeeData()
  }, []);

  const handleFormSubmit = async (e, inputValue) => {
    e.preventDefault();

    const { name, email, work, add, mobile, desc, age } = inputValue;

    const res2 = await fetch(`${getApiResponse()}/updateemployee/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        work,
        add,
        mobile,
        desc,
        age,
      }),
    });

    const data2 = await res2.json();

    if (res2.status === 400 || !data2) {
      alert("Something Went wrong - Try again later");
    } else {
      navigate("/");
      setUPdata(data2);
    }
  };

  return (
    <>
      {showForm ? (
        <Form editValue={inpval} onSubmit={handleFormSubmit} />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default EditEmployee;
