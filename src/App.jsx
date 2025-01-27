import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Details from "./components/detail/Details";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";  
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, clearUser } from "./lib/authSlice";
import { auth } from "./config/firebase";

function App() {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.authReducers);
    const {chatId}=useSelector((state)=>state.chatReducers)
    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                dispatch(fetchUser(authUser.uid)); // Fetch user only when logged in
            } else {
                dispatch(clearUser()); // Clear user on logout
            }
        });
        return () => unSub();  
    }, [dispatch]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="container">
            {user ? (
                <>
                    <List />
                    {chatId && <Chat />}
                    {chatId && <Details />}
                </>
            ) : (
                <Login />
            )}
            <Notification />
        </div>
    );
}

export default App;
