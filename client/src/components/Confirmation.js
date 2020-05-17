import React, {useState, useEffect} from "react";
import { Link, useLocation } from 'react-router-dom'



const Confirmation = ({ setAuth }) => {
  const [authId, setAuthId] = useState('')
  const [thankYou, setThankYou] = useState('')


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
      console.log('authid', authId);
      const myHeaders = new Headers();
      console.log('JWT TOKEN',localStorage.token);
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
      setThankYou('Thanks for confirming.  You can log in and enjoy 🚀')

      console.log('data for confimring email',parseData);
    } catch (err) {
      console.error(err.message);
    }
  };
  console.log('thank you', thankYou);


  return (
    <div className="jumbotron mt-5">
      <h1>FLIP FLOP PHOTO APP</h1>
      <p>Click bellow to Confirm Your Email</p>
      <p>{ thankYou }</p>
      <button onClick={emailConfirmation}>CONFIRM</button>
      <Link to="/login" className="btn btn-primary">
        Login
      </Link>
    </div>
  );
};

export default Confirmation;
