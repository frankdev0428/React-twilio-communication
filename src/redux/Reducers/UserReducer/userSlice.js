import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOtherUsers, getHistory, sendInternalChat, setAllRead, getcommunicateUserInfo, setFacebook, setHD, importHDPhotoHub, setEmail, saveEmail, updatePassword, updateAvatar, setCall, setLiveChat, purchasePhoneNumber, migratePhoneNumber } from "./actions";

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo", 
  async () => getcommunicateUserInfo()
);
export const updateUserAvatar = createAsyncThunk(
  "user/updateUserAvatar", 
  async (payload) => updateAvatar(payload)
);
export const setFacebookEnable = createAsyncThunk(
  "user/setFacebookEnable", 
  async (payload) => setFacebook(payload)
);
export const setCallEnabled = createAsyncThunk(
  "user/setCallEnabled", 
  async (payload) => setCall(payload)
);
export const setLiveChatEnabled = createAsyncThunk(
  "user/setLiveChatEnabled", 
  async (payload) => setLiveChat(payload)
);
export const setHDEnable = createAsyncThunk(
  "user/setHDEnable", 
  async (payload) => setHD(payload)
);
export const setEmailEnabled = createAsyncThunk(
  "user/setEmailEnabled", 
  async (payload) => setEmail(payload)
);
export const saveEmailSetting = createAsyncThunk(
  "user/saveEmailSetting", 
  async (payload) => saveEmail(payload)
)
export const updatecommunicatePassword = createAsyncThunk(
  "user/updatePassword", 
  async (payload) => updatePassword(payload)
)
export const importHD = createAsyncThunk(
  "user/importHD", 
  async (payload) => importHDPhotoHub(payload)
);
export const buyPhoneNumber = createAsyncThunk(
  "user/buyPhoneNumber", 
  async (payload) => purchasePhoneNumber(payload)
);
export const portPhoneNumber = createAsyncThunk(
  "user/portPhoneNumber", 
  async (payload) => migratePhoneNumber(payload)
);
export const getUsers = createAsyncThunk(
  "user/getUsers", 
  async () => getOtherUsers()
);
export const getChatHistory = createAsyncThunk(
  "user/getChatHistory", 
  async (payload) => getHistory(payload)
);
export const sendChat = createAsyncThunk (
  "user/sendChat", 
  async (payload) => sendInternalChat(payload)
)
export const setChatAllRead = createAsyncThunk (
  "user/setChatAllRead", 
  async (payload) => setAllRead(payload)
)
export const enterChatRoom = createAsyncThunk (
  "user/enterChatRoom", 
  async (payload) => {
    const chat_history = await getHistory(payload)
    await setAllRead(payload)
    const users = await getOtherUsers()
    return {history:chat_history, users: users}
    
  } 
)
const initialState = {
  users: [],
  history: [],
  isLoading: true,
  totalUnread: 0,
  user: {}
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
 
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(setFacebookEnable.fulfilled, (state, action) => {
        state.user.isFacebookEnabled = !state.user.isFacebookEnabled
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.user.avatar = action.payload.avatar
      })
      .addCase(setEmailEnabled.fulfilled, (state, action) => {
        state.user.isEmailEnabled = !state.user.isEmailEnabled
      })
      .addCase(setCallEnabled.fulfilled, (state, action) => {
        state.user.isCallEnabled = !state.user.isCallEnabled
      })
      .addCase(setLiveChatEnabled.fulfilled, (state, action) => {
        state.user.isLivechatEnabled = !state.user.isLivechatEnabled
      })
      .addCase(setHDEnable.fulfilled, (state, action) => {
        state.user.isHDEnabled = !state.user.isHDEnabled
      })
      .addCase(saveEmailSetting.fulfilled, (state, action) => {
        state.user.appPassword = action.payload.appPassword
        state.user.businessEmail = action.payload.businessEmail
      })
      .addCase(buyPhoneNumber.fulfilled, (state, action) => {
        state.user.phoneNumber = action.payload.phoneNumber
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.totalUnread = 0
        action.payload.map(user => {
          state.totalUnread += user.unreadCount
        })
      })
      .addCase(getChatHistory.fulfilled, (state, action) => {
        state.history = action.payload;
        state.isLoading = false
      })
      .addCase(sendChat.fulfilled, (state, action) => {
        state.history = [...state.history, action.payload];
      })
      .addCase(enterChatRoom.fulfilled, (state, action) => {
        state.history = action.payload.history;
        // console.log("history222---->", action.payload.history)
        state.isLoading = false
        state.users = action.payload.users
        state.totalUnread = 0
        action.payload.users.map(user => {
          state.totalUnread += user.unreadCount
        })
      });
  },
});

// export const { setMessages, initMessages, setHistory, setLoading, setCollapse } = inboxSlice.actions;
export default userSlice.reducer;
