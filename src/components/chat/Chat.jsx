import React, { useEffect } from "react";
import "./chat.css";
import { useState } from "react";
import { useRef } from "react";
import EmojiPicker from "emoji-picker-react";
function Chat() {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text,setText]=useState('')
  const endRef=useRef(null);
  useEffect(()=>{
    endRef.current?.scrollIntoView({behavior:'smooth'})
  },[])
  const handleEmoji = (event) => {
      setText((prev)=>prev+event.emoji)
      setOpenEmoji(false)
  };
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>John doe</span>
            <p>Lorem ipsum dolor sit amet </p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, numquam perferendis. Molestiae, ad? Beatae nobis esse repellat, molestias temporibus commodi libero necessitatibus dolorem natus animi doloribus sed provident cum quisquam?</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, numquam perferendis. Molestiae, ad? Beatae nobis esse repellat, molestias temporibus commodi libero necessitatibus dolorem natus animi doloribus sed provident cum quisquam?</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, numquam perferendis. Molestiae, ad? Beatae nobis esse repellat, molestias temporibus commodi libero necessitatibus dolorem natus animi doloribus sed provident cum quisquam?</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, numquam perferendis. Molestiae, ad? Beatae nobis esse repellat, molestias temporibus commodi libero necessitatibus dolorem natus animi doloribus sed provident cum quisquam?</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, numquam perferendis. Molestiae, ad? Beatae nobis esse repellat, molestias temporibus commodi libero necessitatibus dolorem natus animi doloribus sed provident cum quisquam?</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, numquam perferendis. Molestiae, ad? Beatae nobis esse repellat, molestias temporibus commodi libero necessitatibus dolorem natus animi doloribus sed provident cum quisquam?</p>
            <span>1 min ago</span>
          </div>
        </div>
      <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" placeholder="Type a message .." value={text} onChange={(e)=>setText(e.target.value)} />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpenEmoji((prev) => !prev)}
          />
          <div className="picker">
          <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji}/>
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
}

export default Chat;
