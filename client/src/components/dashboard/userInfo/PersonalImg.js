import React, { Fragment, useState } from 'react';
import { Link } from "react-router-dom";


const PersonalImg = ({ userInfo }) => {

  return (
    <Fragment>
      <div className="d-flex flex-wrap">
        <div className="p-2 flex-wrap mt-5">
          {userInfo.length !== 0 &&
            userInfo[0].img_post_id !== null &&
            userInfo.map(e => (
                <Link to={`/dashboard/${e.img_post_id}`} key={e.img_post_id}>
                  <img src={e.img} key={e.img_post_id} alt='user posted picture' className='img-thumbnail rounded w-50'/>
                </Link>
            ))}
          </div>
        </div>

    </Fragment>

  )
};

export default PersonalImg;
