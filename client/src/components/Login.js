import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { theme, lightTheme } from '../theme';
import { GlobalStyles } from '../global';
import { ThemeProvider } from 'styled-components';

import { toast } from "react-toastify";

const Login = ({ setAuth, currentTheme, toggleTheme }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const { email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "/authentication/login",
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
  }
  const h1Out = (e) => {
    e.target.style.background = ''
  }
  const changeButtonBackground = (e) => {
    e.target.style.background = '#00c2ff'
  }
  const buttonOut = (e) => {
    e.target.style.background = ''
  }

  return (
    <ThemeProvider theme={currentTheme === 'dark' ? theme : lightTheme}>
    <Fragment>
    <div style={parentContainer}>
    <GlobalStyles />
  <div>
    <div style={{ margin: '1rem' }}>
      <button style={toggleStyle} onClick={toggleTheme}>{currentTheme === 'dark' ? 'LIGHT ☀️' : '🌚 DARK'}</button>
    </div>
    <div>
      <Link className="btn btn-warning btn-lg" to='/' style={buttons}>HOME</Link>
    </div>

  </div>
    <div style={containerLeft}>
      <h1 style={h1} onMouseEnter={changeBackground} onMouseLeave={h1Out}>FLIP FLOP PHOTO APP</h1>
      <h2 style={h2} onMouseEnter={changeBackground} onMouseLeave={h1Out}>
        LOG IN
      </h2>
      <form onSubmit={onSubmitForm} style={form}>
          <input
            type="text"
            name="email"
            value={email}
            placeHolder='Email'
            onChange={e => onChange(e)}
            className="form-control my-3 mt-5"
          />
          <input
            type="password"
            name="password"
            value={password}
            placeHolder='Password'
            onChange={e => onChange(e)}
            className="form-control my-3"
          />
          <button className="btn btn-success btn-block">Submit</button>
        </form>
    </div>
      <div style={containerCenter}>
        <p style={noAccount}>Dont have an account?</p>
        <p>Thats fine just sign up 😜</p>
        <Link className="btn btn-warning btn-lg mb-5" to="/register" style={buttons}>SIGN UP</Link>
      </div>
      <div style={{textAlign: 'center'}}>
          <p>&copy; MAURICO ACOSTA</p>
      </div>
    </div>
    </Fragment>
    </ThemeProvider>
  );
};
const parentContainer = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  // border: '1px solid purple',
  justifyContent: 'center',
  // backgroundColor: '#fbcbd4',
  paddingBottom: '3%'
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
  border: '2px solid rgb(249, 167, 196)',
  boxShadow: '2px 3px 3px 9px #80808073'
};
const containerCenter = {
  textAlign: 'center'
}
const h1 = {
  marginTop: '25px',
  fontSize: '3rem',
  textAlign: 'center',
  fontFamily: '-webkit-pictograph',
  marginLeft: '15%',
  marginRight: '16%',
  borderRadius: '4%',
  fontFamily: 'Anton , sans-serif',
}
const h2 = {
  marginTop: '25px',
  fontSize: '2rem',
  textAlign: 'center',
  marginLeft: '15%',
  marginRight: '16%',
  fontFamily: '-webkit-pictograph',
  borderRadius: '4%',
  fontFamily: 'Anton , sans-serif',
};
const form = {
  width: '40%',
  marginLeft: '30%'
};
const noAccount = {
  marginTop: '10px'
};
const buttons = {
  border: '3px solid black',
  boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 2px',
  borderRadius: '15px',
  backgroundColor: 'darksalmon'
};
const toggleStyle = {
  borderRadius: '15px',
    boxShadow: 'rgba(128, 128, 128, 0.45) 1px 2px 2px 2px',
    fontFamily: 'Balsamiq Sans, cursive',
    fontWeight: '900',
};

export default Login;
