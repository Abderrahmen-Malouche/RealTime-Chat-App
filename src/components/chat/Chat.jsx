import React, { useEffect } from "react";
import "./chat.css";
import { useState } from "react";
import { useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useSelector } from "react-redux";
import { arrayUnion } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import upload from "../../config/upload";
function Chat() {
  const [chat, setChat] = useState();
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState("");
  const { chatId,user ,isCurrentUserBlocked, isReceivedBlocked} = useSelector((state) => state.chatReducers);
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  const endRef = useRef(null);
  const handleImg = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setImg({ file, url: objectURL });
    }
  };
  const { user: currentUser } = useSelector((state) => state.authReducers);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);
  console.log(chat);
  const handleEmoji = (event) => {
    setText((prev) => prev + event.emoji);
    setOpenEmoji(false);
  };
  const handleSend = async () => {
    if (text === "") return;
    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: user,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });
      const userIDs = [currentUser.id, user.id];
      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", currentUser.id);
        const userChatsSnap = await getDoc(userChatsRef);
        if (userChatsSnap.exists()) {
          const userChatsData = userChatsSnap.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();
          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
    setImg({ file: null, url: "" });
    setText("");
  };
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || ".avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
            <p>Friend </p>
          </div>
        </div>
        <div className="icons">
            <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((message) => (
          <div
            className={message.senderId.id===currentUser.id?"message":"message  own "}
            key={message.createdAt}
          >
            {/* <img
              src={
                message.sender == currentUser.id
                  ? currentUser.avatar
                  : user.avatar
              }
              alt=""
            /> */}
            <div className="texts">
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
              {/* <span>{message.c}</span> */}
            </div>
          </div>
        ))}
        {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
        <label htmlFor="file">
          <img src="./img.png" alt="" />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImg}
          />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Type a message .."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceivedBlocked}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpenEmoji((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton" onClick={handleSend} disabled={isCurrentUserBlocked || isReceivedBlocked}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
