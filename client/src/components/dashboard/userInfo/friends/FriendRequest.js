import React, { Fragment, useState, useEffect } from "react";


const FriendRequest = ({ friendRequest, setFriendActivity }) => {
  const [friends_id, setFriends_id] = useState(0)
  const [rejectedFriendId, setRejectedFriendId] = useState(0)

  const triggerFriendRequest = (e) => {
    setFriends_id(prevState => prevState + Number(e))
  }


  const acceptFriend = async e => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const response = await fetch("http://localhost:5000/dashboard/acceptRequest", {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({
          'friends_id': friends_id
        })
      });
      const parseResponse = await response.json();
      setFriendActivity(true)
    } catch (err) {
      console.error(err.message);
    }
  };
  const triggerRejectFriendRequest = (e) => {
    setRejectedFriendId(prevState => prevState + Number(e))
  }


  const rejectFriend = async e => {
    try {
      const myHeaders = new Headers();
      // I want to ad more than one header in post so I can send the Token
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const response = await fetch("http://localhost:5000/dashboard/declineRequest", {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({
          'friends_id': rejectedFriendId
        })
      });
      const parseResponse = await response.json();
      setFriendActivity(true)
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(()=>{
    acceptFriend()
  },[friends_id])
  useEffect(()=>{
    rejectFriend()
  },[rejectedFriendId])


  return (
    <Fragment>
      <p>
        <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          Friend Request
        </button>
      </p>
      <div className="collapse" id="collapseExample">
        <div className="card card-body">
        <ul className='list-group'>
        {
          friendRequest.length !== 0 &&
          friendRequest.map(e => (
            <li className='list-group-item'>
              <p className='h5 text-center'>{e.first_name}</p>
              <button
                className='list-group-item list-group-item-action'
                data-requesterid={e.friends_id}
                onClick={event => triggerFriendRequest(event.target.getAttribute('data-requesterid'))}>ACCEPT
              </button>
              <button
                className='list-group-item list-group-item-action'
                data-requesterid={e.friends_id}
                onClick={event => triggerRejectFriendRequest(event.target.getAttribute('data-requesterid'))}>DECLINE
              </button>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </Fragment>

  )
};

export default FriendRequest;
