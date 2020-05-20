import React, { useState, useEffect } from 'react';
import FollowButton from '../../newsFeed/FollowButton'

const UnfollowButton = ({ friendsId, setUnFollowed, followed, setFollowed }) => {
  const [buttonText, setButtonText] = useState('')
console.log('firednsif', friendsId);
  const unFollow = async () => {
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const response = await fetch(`/dashboard/unFollow`, {
        method: "DELETE",
        headers: myHeaders,
        body: JSON.stringify({
          'friendsId': friendsId
        })
      })
      const parseData = await response.json()
      if(parseData){
        getFollowers()
      }
      setUnFollowed(true)
      setFollowed(false)
      // setButtonText('Sent')
    } catch (err) {
        console.error(err.message);
    }
  }

  const [allFollowers, setFollowers] = useState([])
  const [myFollowers, setMyFollowers] = useState([])
  const [whoImFollowing, setWhoImFollowing] = useState([])
  // console.log('allFollowers', allFollowers);
  // console.log('myFollowers', myFollowers);
  console.log('whoImFollowing', whoImFollowing);

  useEffect(() => {
    getFollowers()
  }, [])
  useEffect(() => {
    getFollowers()
  },[followed])
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
  const button =[]
  console.log('button',button);
  for(let i = 0; i < whoImFollowing.length; i++){
    if(whoImFollowing[i].addresseeid === friendsId){
      button.push(<div></div>)
    }
  }

  return (
    <div className='text-center'>
    {
      button.length !== 0 &&
      <button
         style={buttons}
         className="btn btn-success"
         onClick={unFollow}
         onMouseEnter={changeBackground}
         onMouseLeave={changeBackgroundOut}>UNFOLLOW</button>
    }
    </div>


  )
};
const buttons = {
  border: '3px solid black',
  boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 2px',
  margin: '1%'
};


export default UnfollowButton;
