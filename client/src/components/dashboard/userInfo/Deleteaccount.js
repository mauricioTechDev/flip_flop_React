import React, {useState, useEffect} from 'react';

const Deleteaccount = ({ logout }) => {
  const [email, setEmail] = useState('')
  const [cancelationBox, setCancelationBox] = useState(false)
  const [canceled, setCanceled] = useState('')

  const deleteTheAccount = async e => {
    e.preventDefault()
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);
      const res = await fetch('/dashboard/deleteAccount', {
        method: "DELETE",
        headers: myHeaders,
        body: JSON.stringify({
          'email': email
        })
      })
      logout(e)

    } catch (err) {
      console.error(err.message);
    }
  }
  const activateCanelationBox = () => {
    setCancelationBox(true)
  }


  return (
    <div style={parentContainer}>
    {
      cancelationBox
      ? <div style={inputContainer}>
        <h3>Are you sure you want to delete you account? Enter you email below.</h3>
        <form onSubmit={deleteTheAccount}>
          <input type='text' style={{ height: '37px', borderRadius: '2px' }} value={email} onChange={e => setEmail(e.target.value)} placeholder='Email'></input>
          <button className="btn btn-danger"> Submit </button>
        </form>
      </div>
      : <span style={dangerBox}>
        <h3>❌ Danger Zone ❌</h3>
        <h4>Click below to delete your account</h4>
        <button className="btn btn-danger" onClick={activateCanelationBox}>DELETE</button>
        </span>
    }

    </div>
  )
};
const inputContainer = {
  border: '3px solid black',
    width: '60%',
    marginLeft: '20%',
    padding: '1%',
    // backgroundColor: 'rgb(244, 186, 0)',
    boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 2px',
    borderRadius: '2%',
    marginTop: '3%',
};
const dangerBox = {
  width: '59rem',
  margin: 'auto',
  boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 2px',
  border: '1px solid black',
  padding: '1rem'
}
const parentContainer = {
  display: 'flex',
  marginTop: '5%',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  // backgroundColor: '#fbcbd4',
  textAlign: 'center'
};


export default Deleteaccount;
