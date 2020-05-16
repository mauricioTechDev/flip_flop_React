import React, { useState } from 'react';

const FriendRequestButton = ({ individualPicture }) => {
  const [buttonText, setButtonText] = useState('')

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
      setButtonText('Sent')
    } catch (err) {
        console.error(err.message);
    }
  }

  return (
    <div className='text-center mb-5'>
      <button className="btn btn-success" onClick={sendFriendRequest}>{ buttonText ? buttonText : "Send Friend Request" }</button>
    </div>
  )
};


export default FriendRequestButton;
