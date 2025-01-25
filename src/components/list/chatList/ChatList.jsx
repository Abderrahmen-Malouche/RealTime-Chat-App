import React, { useState, useEffect } from "react";
import "./chatList.css";
import AddUser from "./addUser/AddUser";
import { useSelector } from "react-redux";
import { getDoc, onSnapshot, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";

function ChatList() {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const { user,loading } = useSelector((state) => state.authReducers);

  useEffect(() => {
    if (!user?.id) return;
    const unSub = onSnapshot(doc(db, "userchats", user.id), async (res) => {
      try {
        const items = res.data()?.chats || [];
        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userSnap = await getDoc(userDocRef);
          const user = userSnap.data();
          return { ...item, user };
        });
        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)));
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    });
    return () => unSub();
  }, [user?.id]);

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="search" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt="plus"
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {chats.map((chat) => (
        <div className="item" key={chat.chatId}>
          <img src={chat.user.avatar} alt="User Avatar" />
          <div className="text">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
      {addMode && <AddUser />}
    </div>
  );
}

export default ChatList;
