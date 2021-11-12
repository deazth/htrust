import { createSlice } from '@reduxjs/toolkit';
import Constants from 'expo-constants';

const initialState = {
  isLoading: true,
  userToken: null,
  userID: null,
  tokerr: null,
  userobj: null,
  baseurl: null
}

// setters
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    doneLoading: state => {
      state.isLoading = false;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload
    },
    setUserID: (state, action) => {
      state.userID = action.payload
    },
    setTokerr: (state, action) => {
      state.tokerr = action.payload
    },
    setUserObj: (state, action) => {
      state.userobj = action.payload
    },
    setBaseUrl: (state, action) => {
      state.baseurl = action.payload
    }
  },
});

export const { doneLoading, setUserToken, setUserID, setTokerr, setUserObj, setBaseUrl } = userSlice.actions;

// selectors to get the data back
export const selectIsLoading = state => state.user.isLoading;
export const selectUserToken = state => state.user.userToken;
export const selectUserID = state => state.user.userID;
export const selectTokerr = state => state.user.tokerr;
export const selectUserObj = state => state.user.userobj;
export const selectBaseUrl = state => state.user.baseurl ?? Constants.manifest.extra.base_url;

export default userSlice.reducer;

