import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

//components
import AvatarInput from './pictureUploads/AvatarInput'
import UserInfo from './userInfo/UserInfo'
import FriendRequest from './userInfo/friends/FriendRequest'
import MyFriends from './userInfo/friends/MyFriends'
import ImgFeedInput from './pictureUploads/ImgFeedInput'
import PersonalImg from './userInfo/PersonalImg'
import AboutMeInput from './userInfo/AboutMeInput'

const Dashboard = ({ setAuth, logout }) => {
  const [individualUser, setIndividualUser] = useState({})
  const [userInfo, setUserInfo] = useState([]);
  const [friendRequest, setFriendRequest] = useState([])
  const [friendsList, setFriendsList] = useState([])
  const [commentCount, setCommentCount] = useState([])

  const [avatarChange, setAvatarChange] = useState(false);
  const [uploadNewImg, setUploadNewImg] = useState(false);
  const [friendActivity, setFriendActivity] = useState(false)
  const [avatarImg, setAvatarImg] = useState('')

  const getProfile = async () => {
    try {
      const res = await fetch("/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();

      setIndividualUser(parseData.userInfo[0])
      setUserInfo(parseData.userInfo);
      setFriendRequest(parseData.friendRequest)
      setFriendsList(parseData.friendsList)
      setCommentCount(parseData.commentCount)
    } catch (err) {
      console.error(err.message);
    }
  };

  // const logout = async e => {
  //   e.preventDefault();
  //   try {
  //     localStorage.removeItem("token");
  //     setAuth(false);
  //     toast.success("Logout successfully");
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

// put in arguments and keep track when changes are done to fire again
  useEffect(() => {
    getProfile();
    setAvatarChange(false);
  }, [avatarChange]);
  useEffect(() => {
    getProfile();
    setUploadNewImg(false);
  }, [uploadNewImg]);
  useEffect(() => {
    getProfile();
    setFriendActivity(false);
  }, [friendActivity]);
  const changeBackground = (e) => {
    e.target.style.transform = 'scale(1.1)';
  }
  const changeBackgroundOut = (e) => {
    e.target.style.transform = ''
  }

  return (
    <div style={parentContainer}>
    <div>
      <header style={{ textAlign: 'center' }}>
        <div>
          <h1 style={h1} className='text-white'>Flip - Flop</h1>
        </div>
        <Link to='/dashboard' className="btn btn-warning btn-lg" to='/' style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>HOME</Link>
        <Link to={`/dashboard/newsfeed/${individualUser.user_id}`} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>FEED</Link>
        <Link to={`/dashboard/newsfeed/${individualUser.user_id}`} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>FRIENDS</Link>
        <Link to={`/editprofile`} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>EDIT PROFILE</Link>
        <button onClick={e => logout(e)} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>LOG OUT</button>
      </header>
    </div>
      <div className="">
        <div className="">
          <UserInfo userInfo={userInfo} individualUser={individualUser} />
          <AboutMeInput setAvatarChange={setAvatarChange} individualUser={individualUser} />
          <AvatarInput setAvatarChange={setAvatarChange} />
        </div>
        <div className="">
          <FriendRequest friendRequest={friendRequest} setFriendActivity={setFriendActivity}/>
          <MyFriends friendsList={friendsList} />
        </div>
      </div>
      <div className="">
        <ImgFeedInput setUploadNewImg={setUploadNewImg} />
      </div>
      <div className="">
        <PersonalImg userInfo={userInfo}/>
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
  backgroundColor: '#fbcbd4',
  paddingBottom: '3%'
};
const buttons = {
  border: '3px solid black',
  boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 2px',
  margin: '1%'
};
const h1 = {
  marginTop: '25px',
  fontSize: '3rem',
  textAlign: 'center',
  fontFamily: '-webkit-pictograph',
  borderRadius: '4%'
}

export default Dashboard;
