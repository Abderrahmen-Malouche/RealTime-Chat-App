import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {doc,getDoc} from 'firebase/firestore';
import {db} from '../config/firebase';
const initialState = {
    user:null,
    loading:null,
};
export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async (uid, { rejectWithValue }) => {
        try {
            if (!uid) return null; // Handle case when user logs out
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            }
            return null;
        } catch (error) {
            console.error('Error fetching user:', error);
            return rejectWithValue(error.message);
        }
    }
);
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        clearUser: (state) => {
            state.user = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchUser.rejected, (state) => {
                state.user = null;
                state.loading = false;
            });
    },
})
export const { clearUser } = authSlice.actions;
export default authSlice.reducer;