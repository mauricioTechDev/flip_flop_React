import React, { Fragment, useState } from "react";


const FriendRequest = ({ friendRequest }) => {


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

        {
          friendRequest.length !== 0 &&
          friendRequest.map(e => (
            <li className='list-group-item'>
              <p className='h5 text-center'>{e.first_name}</p>
              <button className='list-group-item list-group-item-action' data-requesterid={e.requesterid}>ACCEPT</button>
              <button className='list-group-item list-group-item-action' data-requesterid={e.requesterid}>DECLINE</button>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </Fragment>

  )
};

export default FriendRequest;
