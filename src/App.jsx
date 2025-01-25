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

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (authUser) => {
                dispatch(fetchUser(authUser.uid)); 
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
                    <Chat />
                    <Details />
                </>
            ) : (
                <Login />
            )}
            <Notification />
        </div>
    );
}

export default App;
