import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {

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
    <div style={parentContainer}>
      <div style={containerLeft}>
        <h1 style={h1} onMouseEnter={changeBackground} onMouseLeave={h1Out}>FLIP FLOP PHOTO APP</h1>
        <h2 style={h2} onMouseEnter={changeBackground} onMouseLeave={h1Out}>
          Not your ordinary photo app
        </h2>
      </div>
      <div style={containerRight}>
        <div>
          <p style={signIn} onMouseEnter={changeBackground} onMouseLeave={h1Out}>Sign In 📷 to start sharing with others</p>
        </div>
        <div>
          <div>
            <Link to="/login"
              className="btn btn-primary"
              style={button}
              onMouseEnter={changeButtonBackground}
              onMouseLeave={buttonOut}>
              Login
            </Link>
          </div>
          <div>
            <Link to="/register"
              className="btn btn-primary mt-5"
              style={button}
              onMouseEnter={changeButtonBackground}
              onMouseLeave={buttonOut}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div style={{textAlign: 'center'}}>
        <p>&copy; MAURICO ACOSTA</p>
      </div>
    </div>
  );
};
const parentContainer = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  border: '1px solid purple',
  justifyContent: 'center',
  backgroundColor: '#fbcbd4'
};
const containerLeft ={
  backgroundImage: `url(${'/images/girl-friends-laughing.jpg'})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  fontWeight: 'bolder',
  color: 'white',
  height: '536px',
  paddingTop: '10%',
  paddingLeft: '15%',
  paddingRight: '15%',
  paddingBottom: '10%',
  margin: '3%',
  border: '1px solid purple',
  boxShadow: '2px 3px 3px 9px #80808073'
}
const containerRight = {
  backgroundImage: `url(${'/images/new-york-street-style.jpg'})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  textAlign: 'center',
  paddingTop:'5%',
  paddingLeft: '15%',
  paddingRight: '15%',
  paddingBottom: '5%',
  margin: '3%',
  fontWeight: 'bolder',
  color: 'white',
  border: '1px solid purple',
  boxShadow: '2px 3px 3px 9px #80808073'
}
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
}
const signIn = {
  fontSize: '3rem',
  fontFamily: '-webkit-pictograph',
  marginLeft: '20%',
  marginRight: '20%',
}
const button = {
  width: '30%',
}


export default Landing;
