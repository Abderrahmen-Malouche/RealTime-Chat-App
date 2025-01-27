import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isReceiverBlocked: false,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        changeChat: (state, action) => {
            const { chatId, user,currentUser} = action.payload;
            if (!currentUser) {
              console.error("currentUser is undefined!");
              return;
            }
            if (!user) {
              console.error("user is undefined!");
              return;
            }
      
            if (user.blocked.includes(currentUser.id)) {
                state.chatId = null;
                state.user = null;
                state.isCurrentUserBlocked = true;
                state.isReceiverBlocked = false;
            } else if (currentUser.blocked.includes(user.id)) {
                state.chatId = null;
                state.user = null;
                state.isCurrentUserBlocked = false;
                state.isReceiverBlocked = true;
            } else {
                state.chatId = chatId;
                state.user = user;
                state.isCurrentUserBlocked = false;
                state.isReceiverBlocked = false;
            }
        },
        toggleBlock: (state) => {
            state.isReceiverBlocked = !state.isReceiverBlocked;
        },
    },
});

export const { changeChat, toggleBlock } = chatSlice.actions;
export default chatSlice.reducer;