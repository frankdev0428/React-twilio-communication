import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listInquiries, listMessages, sendMessage, sendEmail, sendFacebook, sendLiveChat } from "./actions";

export const getInquiries = createAsyncThunk(
  "inbox/listInquiries", 
  async () => listInquiries()
);
export const getMessages = createAsyncThunk(
  "inbox/listMessages",
  async (payload) => listMessages(payload)
);

export const postMessage = createAsyncThunk(
  "inbox/sendMessage",
  async (payload) => sendMessage(payload)
);
export const postEmail = createAsyncThunk(
  "inbox/sendEmail",
  async (payload) => sendEmail(payload)
);
export const postFacebook = createAsyncThunk(
  "inbox/sendFacebook",
  async (payload) => sendFacebook(payload)
);
export const postLiveChat = createAsyncThunk(
  "inbox/postLiveChat",
  async (payload) => sendLiveChat(payload)
);

const initialState = {
  inquiries: [],
  messages: [],
  emails: [],
  history: [],
  facebook: [],
  webchat: [],
  customer: null,
  isLoading: false,
  collapse: false,
  c_refresh: 0,
  commType: ''
};

export const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = [...state.messages, ...action.payload];
    },
    initMessages: (state, action) => {
      state.messages = [];
    },
    setHistory: (state, action) => {
      state.history = []
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setCollapse: (state, action) => {
      state.collapse = !state.collapse
    },
    setCommunicationType: (state, action) => {
      state.commType = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInquiries.fulfilled, (state, action) => {
        state.inquiries = action.payload.map((item) => {
          return {
            ...item,
            agent: item.agent || 'You' ,
            priority: item.priority || 'Medium' ,
            department: item.department || 'Marketing' ,
            status: item.status || 'New',
            label: item.firstName + ' ' + item.lastName
          }
        })
        // state.inquiries = action.payload;
     
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.customer = action.payload;
        state.messages = action.payload.sms.map((item) => {
          return {
            ...item,
            history_type: 'SMS'
          }
        })
        state.emails = action.payload.emails.map((item) => {
          return {
            ...item,
            history_type: 'Email'
          }
        })
        state.voices = action.payload.voices.map((item) => {
          return {
            ...item,
            history_type: 'Voice'
          }
        })
        state.facebook = action.payload.facebook.map((item) => {
          return {
            ...item,
            history_type: 'Messenger'
          }
        })
        state.webchat = action.payload.webchat.map((item) => {
          return {
            ...item,
            history_type: 'LiveChat'
          }
        })
        state.history = [...state.messages, ...state.emails, ...state.voices, ...state.facebook, ...state.webchat]
        state.history.sort((a, b) => {
          const date1 = new Date(a.createdDate)
          const date2 = new Date(b.createdDate)
          return date1 - date2
        })
      })
      .addCase(postMessage.fulfilled, (state, action) => {
        const newMessage = {
          ...action.payload,
          history_type: 'SMS'
        }
        state.history = [...state.history, newMessage];
        state.c_refresh++;
      })
      .addCase(postEmail.fulfilled, (state, action) => {
        const newEmail = {
          ...action.payload,
          history_type: 'Email'
        }
        state.history = [...state.history, newEmail];
        state.c_refresh++;
      })
      .addCase(postFacebook.fulfilled, (state, action) => {
        const newFacebook = {
          ...action.payload,
          history_type: 'Messenger'
        }
        state.history = [...state.history, newFacebook];
        state.c_refresh++;
      })
      .addCase(postLiveChat.fulfilled, (state, action) => {
        const newLiveChat = {
          ...action.payload,
          history_type: 'LiveChat'
        }
        state.history = [...state.history, newLiveChat];
        state.c_refresh++;
      })

  },
});

export const { setMessages, initMessages, setHistory, setLoading, setCollapse, setCommunicationType } = inboxSlice.actions;
export default inboxSlice.reducer;
