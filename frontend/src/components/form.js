import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Form = ({ editValue, onSubmit }) => {

  const [inpval, setINP] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    add: "",
    desc: "",
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (editValue) setINP(editValue);
  }, []);

  return (
    <div className="container">
      <nav aria-label="breadcrumb" className="mt-2">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <NavLink className="breacrumb" to="/">
              Home
            </NavLink>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create
          </li>
        </ol>
      </nav>
      <form className="mt-4" onSubmit={(e) => onSubmit(e,inpval)}>
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={inpval.name}
              onChange={setdata}
              placeholder="Vijay"
              name="name"
              className="form-control"
              id="name"
              required
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="userId" className="form-label">
              User Id
            </label>
            <input
              type="number"
              value={inpval.userId}
              onChange={setdata}
              name="userId"
              className="form-control"
              id="userId"
              placeholder="123"
              min="1"
              required
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={inpval.email}
              onChange={setdata}
              name="email"
              placeholder="vijay@gmail.com"
              className="form-control"
              id="email"
              required
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              value={inpval.age}
              onChange={setdata}
              name="age"
              placeholder="12"
              className="form-control"
              id="age"
              min="1"
              required
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="mobile" className="form-label">
              Mobile
            </label>
            <input
              type="text"
              value={inpval.mobile}
              onChange={setdata}
              name="mobile"
              className="form-control"
              id="mobile"
              placeholder="8600067000"
              pattern="[6-9]{1}[0-9]{9}"
              required
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="work" className="form-label">
              Designation
            </label>
            <input
              type="text"
              value={inpval.work}
              onChange={setdata}
              name="work"
              placeholder="Software Developer"
              className="form-control"
              id="work"
              required
            />
          </div>
          <div className="mb-3 col-lg-12 col-md-12 col-12">
            <label htmlFor="description" className="form-label">
              Address
            </label>
            <textarea
              type="text"
              name="add"
              value={inpval.add}
              onChange={setdata}
              className="form-control"
              id="description"
              placeholder="XYZ-street,XYZ"
              cols="30"
              rows="5"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
