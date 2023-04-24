import React,{ useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getApiResponse } from "../env";
import Form from "../components/form";
import { adddata } from '../components/context/ContextProvider';

const Create = () => {
  const navigate = useNavigate();
  const { udata, setUdata } = useContext(adddata);
  const handleFormSubmit = async (e, inputVal) => {
    e.preventDefault();

    const { name, email, work, add, mobile, userId, age } = inputVal;
    const res = await fetch(`${getApiResponse()}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        work,
        add,
        mobile,
        userId,
        age,
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      alert("Error - " + data);
    } else {
      setUdata(data)
      navigate("/");
    
    }
  };

  return <Form onSubmit={handleFormSubmit} />
};
export default Create;
