import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { theme, lightTheme } from '../theme';
import { GlobalStyles } from '../global';
import { ThemeProvider } from 'styled-components';

const Register = ({ setAuth, currentTheme, toggleTheme }) => {
  const [inputs, setInputs] = useState({
    first_name: '',
    last_name: '',
    email: "",
    password: "",
  });
  const [checkEmail, setCheckEmail] = useState('')

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
      console.log(parseRes);
      if(parseRes){
        setInputs({
          first_name: '',
          last_name: '',
          email: '',
          password: ''
        })
        setCheckEmail('A verification email is on its way.  Check your inbox and click the link to verify your email.')
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
    <ThemeProvider theme={currentTheme === 'dark' ? theme : lightTheme}>
    <Fragment>
    <div style={parentContainer}>
    <GlobalStyles />
      <div>
      <div style={{ margin: '1rem' }}>
        <button style={toggleStyle} onClick={toggleTheme}>{currentTheme === 'dark' ? 'LIGHT ☀️' : '🌚 DARK'}</button>
      </div>
        <Link className="btn btn-warning btn-lg" to='/' style={buttons}>HOME</Link>
        <Link className="btn btn-warning btn-lg" to='/login' style={buttons}>LOG IN</Link>
      </div>
      <div style={containerLeft}>
        <h1 style={h1} onMouseEnter={changeBackground} onMouseLeave={h1Out}>FLIP FLOP PHOTO APP</h1>
        <h2 style={verification}>{checkEmail}</h2>
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
            style={firstName}
          />
          <input
            type="text"
            name="last_name"
            value={last_name}
            placeholder="Last Name"
            onChange={e => onChange(e)}
            style={lastName}
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
      <div style={{textAlign: 'center'}}>
          <p>&copy; MAURICO ACOSTA</p>
        </div>
      </div>
    </Fragment>
    </ThemeProvider>
  );
};
const verification = {
  backgroundColor: '#ffa500',
  textAlign: 'center',
  boxShadow: 'inset 0 0 11px #000000',
  borderRadius: '3%'
}
const parentContainer = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  // border: '1px solid purple',
  justifyContent: 'center',
  // backgroundColor: '#fbcbd4',
  paddingBottom: '3%'
};
const buttons = {
  border: '3px solid black',
  boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 2px',
  backgroundColor: 'darksalmon',
  borderRadius: '15px',
  margin: '1rem'
};
const firstName = {
  width: '48%',
  height: 'calc(1.5em + .75rem + 2px)',
  padding: '.375rem .75rem',
  fontSize: '1rem',
  fontWeight: '400',
  lineHeight: '1.5',
  color: '#495057',
  backgroundColor: '#fff',
  backgroundClip: 'padding-box',
  border: '1px solid #ced4da',
  borderRadius: '.25rem',
}
const lastName = {
  width: '48%',
  marginLeft: '4%',
  height: 'calc(1.5em + .75rem + 2px)',
  padding: '.375rem .75rem',
  fontSize: '1rem',
  fontWeight: '400',
  lineHeight: '1.5',
  color: '#495057',
  backgroundColor: '#fff',
  backgroundClip: 'padding-box',
  border: '1px solid #ced4da',
  borderRadius: '.25rem',
}
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
  width: '90%',
  marginLeft: '5%'
};
const toggleStyle = {
  borderRadius: '15px',
    boxShadow: 'rgba(128, 128, 128, 0.45) 1px 2px 2px 2px',
    fontFamily: 'Balsamiq Sans, cursive',
    fontWeight: '900',
};

export default Register;
