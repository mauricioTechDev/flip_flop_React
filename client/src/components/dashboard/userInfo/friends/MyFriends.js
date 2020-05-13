import React, { Fragment, useState } from "react";
import { Link } from 'react-router-dom'




const MyFriends = ({ friendsList }) => {

  return (
    <Fragment>
      <p>
        <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#friendsCollapse" aria-expanded="false" aria-controls="collapseExample">
          Friends
        </button>
      </p>
      <div class="collapse" id="friendsCollapse">
        <div class="card card-body">
          <ul className='list-group'>
            {
              friendsList.length !== 0 &&
              friendsList.map(e => (
                  <li className='list-group-item'>
                    <Link  to={`/friend/${e.requesterid}`}>
                      <a className='fropdown-item' href=''>{ e.first_name }</a>
                    </Link>
                  </li>
              ))
            }
          </ul>
        </div>
      </div>
    </Fragment>
  )
};

export default MyFriends;
