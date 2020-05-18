import React, {useState, useEffect} from "react";
import { useLocation, useHistory } from 'react-router-dom'



const Confirmation = ({ setAuth }) => {
  const [authId, setAuthId] = useState('')

  let history = useHistory();
  let location = useLocation();
  let path = location.pathname;

  useEffect(() => {
    let id;
    for(let i = path.length - 1; i > 0; i--){
      if(path[i] === '/'){
        id = path.slice(i+1)
        break;
      }
    }
    setAuthId(id);
      }, [])


  const emailConfirmation = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // myHeaders.append("jwt_token", localStorage.token);
      const res = await fetch(`/authentication/confirmation/${authId}`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          'authId': authId
        })
      });

      const parseData = await res.json();
      if(parseData){
        console.log('HISTROY', history.push('/Login'))
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
    <div style={parentContainer}>
    <div style={containerLeft}>
      <h1 style={h1} onMouseEnter={changeBackground} onMouseLeave={h1Out}>FLIP FLOP PHOTO APP</h1>
      <h2 style={h2} onMouseEnter={changeBackground} onMouseLeave={h1Out}>
        Click bellow to Confirm Your Email
      </h2>
      <button onClick={emailConfirmation} className="btn btn-success btn-block" style={button}>CONFIRM</button>
    </div>
    <div style={containerCenter}>
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
const h1 = {
  marginTop: '25px',
  fontSize: '3rem',
  textAlign: 'center',
  fontFamily: '-webkit-pictograph',
  marginLeft: '15%',
  marginRight: '16%',
  borderRadius: '4%'
};
const h2 = {
  marginTop: '25px',
  fontSize: '2rem',
  textAlign: 'center',
  marginLeft: '15%',
  marginRight: '16%',
  fontFamily: '-webkit-pictograph',
  borderRadius: '4%'
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
  marginTop: '22%',
  border: '1px solid purple',
  boxShadow: '2px 3px 3px 9px #80808073'
};
const containerCenter = {
  textAlign: 'center'
}
const button = {
  width: '40%',
  marginLeft: '30%'
}
const buttons = {
  border: '3px solid black',
  boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 2px',
  marginBottom: '20%'
};


export default Confirmation;
