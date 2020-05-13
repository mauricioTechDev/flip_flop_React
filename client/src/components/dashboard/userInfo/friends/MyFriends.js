import React, { Fragment, useState } from "react";


const MyFriends = () => {

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
          <li className='list-group-item'>
            <a className='fropdown-item' href=''>SAM</a>
          </li>
          <li className='list-group-item'>
            <a className='fropdown-item' href=''>FRED</a>
          </li>
        </ul>
        </div>
      </div>
    </Fragment>
  )
};

export default MyFriends;
