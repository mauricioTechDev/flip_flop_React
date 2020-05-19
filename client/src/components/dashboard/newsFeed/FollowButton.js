import React, { useState } from 'react';

const FollowButton = ({ individualPicture }) => {
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
  const changeBackground = (e) => {
    e.target.style.transform = 'scale(1.1)';
  }
  const changeBackgroundOut = (e) => {
    e.target.style.transform = ''
  }

  return (
    <div className='text-center mb-5'>
      <button style={buttons} className="btn btn-success" onClick={sendFriendRequest} onMouseEnter={changeBackground}
      onMouseLeave={changeBackgroundOut}>{ buttonText ? buttonText : "Follow" }</button>
    </div>
  )
};
const buttons = {
  border: '3px solid black',
  boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 2px',
  margin: '1%'
};


export default FollowButton;
