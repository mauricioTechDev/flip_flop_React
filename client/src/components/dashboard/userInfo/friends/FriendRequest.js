import React, { Fragment, useState } from "react";


const FriendRequest = () => {


  return (
    <Fragment>
      <p>
        <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          Friend Request
        </button>
      </p>
      <div class="collapse" id="collapseExample">
        <div class="card card-body">
        <ul className='list-group'>
          <li className='list-group-item'>
            <p className='h5 text-center'>SAM</p>
            <button className='list-group-item list-group-item-action'>ACCEPT</button>
            <button className='list-group-item list-group-item-action'>DECLINE</button>
          </li>
          <li className='list-group-item'>
            <p className='h5 text-center'>FRED</p>
            <button className='list-group-item list-group-item-action'>ACCEPT</button>
            <button className='list-group-item list-group-item-action'>DECLINE</button>
          </li>
        </ul>
        </div>
      </div>
    </Fragment>

  )
};

export default FriendRequest;
