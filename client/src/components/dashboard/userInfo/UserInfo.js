import React, { Fragment, useState } from "react";

const UserInfo = ({ individualUser }) => {


  return (
    <Fragment>
    <div className="d-flex mt-5 align-content-start">
      <div className="d-flex mt-5 align-content-start flex-column w-10">
        <span className='h2'> { individualUser.first_name } </span>
        { individualUser.profile_img
          ? <img src={individualUser.profile_img} alt='User Profile Image' className='img-thumbnail rounded w-50'/>
          : <img src='https://via.placeholder.com/150' alt='User Profile Image' className='img-thumbnail rounded w-50'/>
        }
      </div>
    </div>
    </Fragment>
  )
};

export default UserInfo;
