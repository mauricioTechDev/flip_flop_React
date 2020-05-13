import React, { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";


const IndividualUserPostedImg = ({ setAuth }) =>{
  const [imgId, setImgId] = useState('')
  const [img, setImg] = useState({})
  const [commentCount, setCommentCount] = useState('')
  const [individualUserImg, setIndividualUserImg] = useState([])
  const [userNames, setUserNames] = useState([])

  // let imgId = this.props.match.params.id
  // console.log(imgId);


let location = useLocation();
let path = location.pathname;

// ACTS LIKE COMPONENTDIDMOUTN BECOUASE OF BRACKETS AS SECOND PARAMATER
useEffect(() => {
  let id;
  for(let i = path.length - 1; i > 0; i--){
    if(path[i] == '/'){
      id = path.slice(i+1)
      break;
    }
  }
  setImgId(id);
    }, [])


  const getProfile = async () => {
    try {
      const res = await fetch(`http://localhost:5000/dashboard/individualUserImg/${imgId}`, {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      console.log(parseData);
      setCommentCount(parseData.commentCount)
      setIndividualUserImg(parseData.individualUserImg)
      setUserNames(parseData.setUserNames)
      setImg(parseData.img)

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
      }, [imgId])




  return(
    <Fragment>
      <Link className="badge badge-warning" to='/dashboard'>BACK</Link>
      <h1>THIS IS THE INDIVIDUAL PICTURE PAGE AYYYYYY</h1>
      <img src={img.img} key={img.img_post_id} alt='user posted picture'/>

    </Fragment>
  )
};

export default IndividualUserPostedImg;
