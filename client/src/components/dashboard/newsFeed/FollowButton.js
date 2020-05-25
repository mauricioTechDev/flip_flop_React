import React, { useState, useEffect } from 'react';

const FollowButton = ({ individualPicture }) => {
  const [buttonText, setButtonText] = useState('')
  // const [button, setButton] = useState([])

  const sendFriendRequest = async () => {
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const id_of_img_poster = individualPicture.id_of_img_poster
      const response = await fetch(`/dashboard/individualPicture/friendReguest`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          'id_of_img_poster': id_of_img_poster
        })
      })
      setButtonText('FOLLOWING')
    } catch (err) {
        console.error(err.message);
    }
  }

  const [allFollowers, setFollowers] = useState([])
  const [myFollowers, setMyFollowers] = useState([])
  const [whoImFollowing, setWhoImFollowing] = useState([])


  useEffect(() => {
    getFollowers()
  }, [])
  const getFollowers = async () => {
    try {
      const res = await fetch("/dashboard/getFollowers", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      // console.log('FOLLOWER', parseData);
      setFollowers(parseData.allFollowers)
      setMyFollowers(parseData.myFollowers)
      setWhoImFollowing(parseData.whoImFollowing)

    } catch (err) {
      console.error(err.message);
    }
  };



  const changeBackground = (e) => {
    e.target.style.transform = 'scale(1.1)';
  }
  const changeBackgroundOut = (e) => {
    e.target.style.transform = ''
  }
  const id_of_img_poster = individualPicture.id_of_img_poster
  const button =[]
  for(let i = 0; i < whoImFollowing.length; i++){
    if(whoImFollowing[i].addresseeid === id_of_img_poster){
      button.push(<button style={buttons} className="btn btn-success"onMouseEnter={changeBackground}
      onMouseLeave={changeBackgroundOut}> FOLLOWING </button>)
    }
  }

  return (
    <div className='text-center'>
    {
      button.length >= 1
      ? button[0]
      : <button style={buttons} className="btn btn-success" onClick={sendFriendRequest} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>{buttonText ? buttonText : 'FOLLOW'}</button>
    }
    </div>
  )
};
const buttons = {
  margin:' 9% 4% 2% 15%',
  border: '3px solid black',
  boxShadow: 'rgba(128, 128, 128, 0.45) 1px 2px 2px 2px',
  fontFamily: 'Balsamiq Sans, cursive',
  fontWeight: '900',
  borderRadius: '15px'
};


export default FollowButton;
