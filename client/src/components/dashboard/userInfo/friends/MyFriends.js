import React, { Fragment, useState } from "react";
import { Link } from 'react-router-dom'




const MyFriends = ({ friendsList }) => {

  return (
    <Fragment>
      <p>
        <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#friendsCollapse" aria-expanded="false" aria-controls="collapseExample">
          Friends
        </button>
      </p>
      <div className="collapse" id="friendsCollapse">
        <div className="card card-body">
          <ul className='list-group'>
            {
              friendsList.length !== 0 &&
              friendsList.map(e => (
                  <li className='list-group-item' key={e.requesterid}>
                    <Link  to={`/friend/${e.requesterid}`}>
                      <span className='fropdown-item' href='#'>{ e.first_name }</span>
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
