import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    first_name: '',
    last_name: '',
    email: "",
    password: "",
  });

  const { first_name, last_name, email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { first_name, last_name, email, password };
      const response = await fetch(
        "/authentication/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();
      setInputs({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      })

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
  const changeBackground = (e) => {
    e.target.style.background = 'orange'
  };
  const h1Out = (e) => {
    e.target.style.background = ''
  };
  const changeButtonBackground = (e) => {
    e.target.style.background = '#00c2ff'
  };
  const buttonOut = (e) => {
    e.target.style.background = ''
  };

  return (
    <Fragment>
    <div style={parentContainer}>
    <div>
      <Link className="btn btn-warning btn-lg mt-5 ml-5" to='/' style={buttons}>HOME</Link>
      <Link className="btn btn-warning btn-lg mt-5 ml-5" to='/login' style={buttons}>Log In</Link>
    </div>
    <div style={containerLeft}>
      <h1 style={h1} onMouseEnter={changeBackground} onMouseLeave={h1Out}>FLIP FLOP PHOTO APP</h1>
      <h2 style={h2} onMouseEnter={changeBackground} onMouseLeave={h1Out}>
        Register
      </h2>
      <form onSubmit={onSubmitForm} style={form}>
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
    </div>
    </div>
    </Fragment>
  );
};
const parentContainer = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  border: '1px solid purple',
  justifyContent: 'center',
  backgroundColor: '#fbcbd4',
  paddingBottom: '15%'
};
const buttons = {
  border: '3px solid black',
  boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 2px'
};
const containerLeft ={
  backgroundImage: `url(${'/images/girl-friends-laughing.jpg'})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  fontWeight: 'bolder',
  color: 'white',
  paddingTop: '10%',
  paddingLeft: '15%',
  paddingRight: '15%',
  paddingBottom: '10%',
  margin: '3%',
  border: '1px solid purple',
  boxShadow: '2px 3px 3px 9px #80808073'
};
const h1 = {
  marginTop: '25px',
  fontSize: '3rem',
  textAlign: 'center',
  fontFamily: '-webkit-pictograph',
  marginLeft: '15%',
  marginRight: '16%',
  borderRadius: '4%'
}
const h2 = {
  marginTop: '25px',
  fontSize: '2rem',
  textAlign: 'center',
  marginLeft: '15%',
  marginRight: '16%',
  fontFamily: '-webkit-pictograph',
  borderRadius: '4%'
};
const form = {
  width: '40%',
  marginLeft: '30%'
};

export default Register;
