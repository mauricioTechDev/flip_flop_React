import React, {Fragment, useState, useEffect} from 'react'
import { Link, useLocation } from "react-router-dom";

const Caption = ({ setCaption }) => {
  const [caption, setNewCaption] = useState('')
  const [pictureId, setPictureId] = useState('')

  let location = useLocation();
  let path = location.pathname;
  useEffect(() => {
    let id;
    for(let i = path.length - 1; i > 0; i--){
      if(path[i] == '/'){
        id = path.slice(i+1)
        break;
      }
    }
    setPictureId(id);
      }, [])

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { caption, pictureId };
      const response = await fetch("http://localhost:5000/dashboard/caption", {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();

      setCaption(true)
      setNewCaption('')
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
    <span className='text-white'>Add/Edit caption</span>
    <form onSubmit={onSubmitForm}>
      <input value={caption} onChange={e => setNewCaption(e.target.value)} ></input>
      <button>SUBMIT</button>
    </form>
    </Fragment>
  )
};


export default Caption;
