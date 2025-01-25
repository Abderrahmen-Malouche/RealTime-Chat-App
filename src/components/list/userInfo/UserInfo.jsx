import React from 'react'
import "./userInfo.css"
import { useSelector } from 'react-redux'

function userInfo() {
  const {user,loading}=useSelector((state) => state.authReducers);

  return (
    <div className='userInfo'>
        <div className='user'>
            <img src={user.avatar || "./avatar.png" } alt="avatar" />
            <h2>{user.username}</h2>
        </div>
        <div className='icons'>
            <img src="./more.png" alt="" />
            <img src="./video.png" alt="" />
            <img src="./edit.png" alt="" />
        </div>
    </div>
  )
}

export default userInfo