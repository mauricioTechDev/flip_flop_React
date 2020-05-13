import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    first_name: '',
    last_name: '',
    email: "",
    password: "",
    // name: ""
  });

  const { first_name, last_name, email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { first_name, last_name, email, password };
      const response = await fetch(
        "http://localhost:5000/authentication/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Register Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="mt-5 text-center text-white">Register</h1>
      <Link className="badge badge-warning" to='/'>BACK</Link>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="first_name"
          value={first_name}
          placeholder="First Name"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="last_name"
          value={last_name}
          placeholder="Last Name"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link className="badge badge-warning" to="/login">LOGIN</Link>
    </Fragment>
  );
};

export default Register;
