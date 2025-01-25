import React from 'react'
import "./addUser.css"
function AddUser() {
  return (
    <div className='addUser'>
      <form action="">
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      <div className='user'>
        <div className="detail">
          <img src="./avatar.png" alt="" />
          <span>Jane Doe</span>
        </div>
          <button>Add user</button>
      </div>
      
    </div>
  )
}

export default AddUser