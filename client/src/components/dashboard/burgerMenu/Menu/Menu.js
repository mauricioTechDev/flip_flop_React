import React, { useState, useEffect } from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';
import { Link } from 'react-router-dom'

const Menu = ({ setAuth, open, ...props }) => {
  const [individualUser, setIndividualUser] = useState({})

  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
      getProfile()
  }, [])

  const getProfile = async () => {
    try {
      const res = await fetch("/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setIndividualUser(parseData.userInfo[0])

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
    <Link to='/dashboard'>
      <a href="/" tabIndex={tabIndex}>
        <span aria-hidden="true">🏠</span>
        Home
      </a>
    </Link>
    <Link to={`/dashboard/newsfeed/${individualUser.user_id}`}>
      <a href="/" tabIndex={tabIndex}>
        <span aria-hidden="true">🆕</span>
        Feed
        </a>
    </Link>
    <Link to={`/followers/${individualUser.user_id}`}>
      <a href="/" tabIndex={tabIndex}>
        <span aria-hidden="true">❤️</span>
        Followers
        </a>
    </Link>
    <Link to={`/editprofile`}>
      <a href="/" tabIndex={tabIndex}>
        <span aria-hidden="true">🛠️</span>
        Edit Profile
        </a>
    </Link>
      <a onClick={e => logout(e)} tabIndex={tabIndex}>
        <span aria-hidden="true">👋</span>
        Log Out
        </a>
    </StyledMenu>
  )
}



Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;
