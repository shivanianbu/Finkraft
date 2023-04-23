import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
// import { adddata } from './context/ContextProvider';

const Create = () => {
  // const { udata, setUdata } = useContext(adddata);

  // const history = useHistory();

  const [inpval, setINP] = useState({
    name: "",
    email: "",
    userId: "",
    age: "",
    mobile: "",
    work: "",
    add: "",
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

  const addinpdata = async (e) => {
      e.preventDefault();

    //   const { name, email, work, add, mobile, desc, age } = inpval;
console.log("input",inpval)
    //   const res = await fetch("https://crudappreactjs.herokuapp.com/register", {
    //       method: "POST",
    //       headers: {
    //           "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({
    //           name, email, work, add, mobile, desc, age
    //       })
    //   });

    //   const data = await res.json();
    //   console.log(data);

    //   if (res.status === 422 || !data) {
    //       console.log("error ");
    //       alert("error");

    //   } else {
    //       history.push("/")
    //       setUdata(data)
    //       console.log("data added");

    //   }
  }

  return (
    <div className="container">
      <nav aria-label="breadcrumb" className="mt-2">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            {" "}
            <NavLink className="breacrumb" to="/">
              Home
            </NavLink>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create
          </li>
        </ol>
      </nav>
      <form className="mt-4">
        <div className="row">
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="name" class="form-label">
              Name
            </label>
            <input
              type="text"
              value={inpval.name}
              onChange={setdata}
              name="name"
              class="form-control"
              id="name"
              required
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="userId" class="form-label">
              User Id
            </label>
            <input
              type="number"
              value={inpval.userId}
              onChange={setdata}
              name="userId"
              class="form-control"
              id="userId"
              min="1"
              required
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="email" class="form-label">
              Email
            </label>
            <input
              type="email"
              value={inpval.email}
              onChange={setdata}
              name="email"
              class="form-control"
              id="email"
              required
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="age" class="form-label">
              Age
            </label>
            <input
              type="number"
              value={inpval.age}
              onChange={setdata}
              name="age"
              class="form-control"
              id="age"
              min='1'
              required
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="mobile" class="form-label">
              Mobile
            </label>
            <input
              type="tel"
              value={inpval.mobile}
              onChange={setdata}
              name="mobile"
              class="form-control"
              id="mobile"
              required
            min='10'
            max='10'
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="work" class="form-label">
              Designation
            </label>
            <input
              type="text"
              value={inpval.work}
              onChange={setdata}
              name="work"
              class="form-control"
              id="work"
              required
            />
          </div>
          <div class="mb-3 col-lg-12 col-md-12 col-12">
            <label for="description" class="form-label">
              Address
            </label>
            <textarea
            type='text'
              name="add"
              value={inpval.add}
              onChange={setdata}
              className="form-control"
              id="description"
              cols="30"
              rows="5"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            onClick={addinpdata}
            class="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default Create;
