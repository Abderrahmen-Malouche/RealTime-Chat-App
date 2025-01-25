import React from 'react'
import "./chatList.css"
import { useState } from 'react'
import AddUser from './addUser/AddUser'
function ChatList() {
  const [addMode,setAddMode]=useState(false)
  return (
    <div className='chatList'>
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="search" />
          <input type="text" placeholder='Search' />
        </div>
        <img src={addMode?"./minus.png":"./plus.png"} alt="plus" className='add' onClick={()=>setAddMode(prev=>!prev)}/>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className='text'>
          <span>John doe</span>
          <p>Hello </p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className='text'>
          <span>John doe</span>
          <p>Hello </p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className='text'>
          <span>John doe</span>
          <p>Hello </p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className='text'>
          <span>John doe</span>
          <p>Hello </p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className='text'>
          <span>John doe</span>
          <p>Hello </p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className='text'>
          <span>John doe</span>
          <p>Hello </p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className='text'>
          <span>John doe</span>
          <p>Hello </p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className='text'>
          <span>John doe</span>
          <p>Hello </p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className='text'>
          <span>John doe</span>
          <p>Hello </p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className='text'>
          <span>John doe</span>
          <p>Hello </p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className='text'>
          <span>John doe</span>
          <p>Hello </p>
        </div>
      </div>
      {addMode&& <AddUser/>}
      
    </div>
  )
}

export default ChatList