import React from "react";
import "./detail.css";
import { useDispatch } from "react-redux";
import { clearUser } from "../../lib/authSlice";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { updateDoc } from "firebase/firestore";
function Details() {
  const { user: currentUser, loading } = useSelector(
    (state) => state.authReducers
  );
  const { chatId, user, isCurrentUserBlocked, isReceivedBlocked } = useSelector((state) => state.chatReducers);
  const dispatch = useDispatch();
  const handleLogout = () => {
    signOut(auth);
    dispatch(clearUser());
  };
  const handleBlock = async () => {
    if (!user) return;
    try {
      await updateDoc(doc(db, "users", currentUser.id), {
        blocked: isReceivedBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      dispatch(toggleBlock());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Friend</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Setting</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
                  alt=""
                />
                <span>Photo_23.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
                  alt=""
                />
                <span>Photo_23.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
                  alt=""
                />
                <span>Photo_23.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
                  alt=""
                />
                <span>Photo_23.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button className="block" onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isReceivedBlocked
            ? "User Blocked : Unblock"
            : "Block"}
        </button>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Details;
