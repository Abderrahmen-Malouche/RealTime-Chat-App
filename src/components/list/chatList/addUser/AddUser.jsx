import React, { useEffect } from "react";
import "./addUser.css";
import {
  collection,
  query,
  where,
  doc,
  serverTimestamp,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { useState } from "react";
import { getDocs, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
function AddUser() {
  const [searchedUser, setSearchedUser] = useState(null);
  const { user, loading } = useSelector((state) => state.authReducers);
  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setSearchedUser(querySnapshot.docs[0].data());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      // Create a new chat document
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });
      

      // Update the userChats collection for the selected user
      await updateDoc(doc(userChatsRef, searchedUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });

      // Update the userChats collection for the current user
      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: searchedUser.id,
          updatedAt: Date.now(),
        }),
      });

      console.log(newChatRef.id);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {searchedUser && (
        <div className="user">
          <div className="detail">
            <img src={searchedUser.avatar || "./avatar.png"} alt="" />
            <span>{searchedUser.username}</span>
          </div>
          <button onClick={handleAdd}>Add user</button>
        </div>
      )}
    </div>
  );
}

export default AddUser;
