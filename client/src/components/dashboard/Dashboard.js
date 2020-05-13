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

const Dashboard = ({ setAuth }) => {
  const [individualUser, setIndividualUser] = useState({})
  const [userInfo, setUserInfo] = useState([]);
  const [friendRequest, setFriendRequest] = useState([])
  const [friendsList, setFriendsList] = useState([])
  const [commentCount, setCommentCount] = useState([])
  console.log('userInfo', userInfo);
  console.log('friendRequest',friendRequest);
  console.log('friensdList', friendsList);

  const [avatarChange, setAvatarChange] = useState(false);
  const [uploadNewImg, setUploadNewImg] = useState(false);
  const [friendActivity, setFriendActivity] = useState(false)
  const [avatarImg, setAvatarImg] = useState('')

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      console.log(parseData);

      setIndividualUser(parseData.userInfo[0])
      setUserInfo(parseData.userInfo);
      setFriendRequest(parseData.friendRequest)
      setFriendsList(parseData.friendsList)
      setCommentCount(parseData.commentCount)
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

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

  return (
    <div>
      <div className="d-flex justify-content-center">
        <h1 className='text-white mr-5'>Welcome to Flip - Flop {individualUser.first_name}</h1>
        <button onClick={e => logout(e)} className="btn btn-primary">
          Logout
        </button>
      </div>
      <div className="row">
        <Link to='/dashboard' className='mr-5 mt-5 ml-5 display-3'>PROFILE</Link>
        <Link to={`/dashboard/newsfeed/${individualUser.user_id}`} className='mr-5 mt-5 ml-5 display-3' >FEED</Link>
      </div>
      <div className="row">
        <div className="col-8">
          <UserInfo userInfo={userInfo} individualUser={individualUser} />
          <AvatarInput setAvatarChange={setAvatarChange} />
        </div>
        <div className="col-4">
          <FriendRequest friendRequest={friendRequest} setFriendActivity={setFriendActivity}/>
          <MyFriends friendsList={friendsList} />
        </div>
      </div>
      <div className="row justify-content-center">
        <ImgFeedInput setUploadNewImg={setUploadNewImg} />
      </div>
      <div class="row">
        <PersonalImg userInfo={userInfo}/>
      </div>
    </div>
  );
};

export default Dashboard;
