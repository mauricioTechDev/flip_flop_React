import React, { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import Caption from './Caption'


const IndividualUserPostedImg = ({ setAuth }) =>{
  const [imgId, setImgId] = useState('')
  const [img, setImg] = useState({})
  const [commentCount, setCommentCount] = useState('')
  const [individualUserImg, setIndividualUserImg] = useState([])
  const [userNames, setUserNames] = useState([])
  const [newCaption, setCaption] = useState(false)

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
  useEffect(() => {
    getProfile();
    setCaption(false);
      }, [newCaption])

  return(
    <Fragment>
      <Link className="btn btn-warning mb-5 mt-5" to='/dashboard'>BACK</Link>
      <h1 className='text-white'>{img.description ? img.description : 'Caption'}</h1>
      <button className="btn btn-danger mb-5 mt-5" >
        DELETE PICTURE
      </button>
      <div>
        <img src={img.img} key={img.img_post_id} alt='user posted picture'/>
      </div>
      <Caption setCaption={setCaption} />


    </Fragment>
  )
};

export default IndividualUserPostedImg;
