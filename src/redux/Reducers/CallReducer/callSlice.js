import { SignalCellularNullSharp } from "@mui/icons-material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getToken, getIncomingCustomer, beginRecording, killRecording, holdRecording, playRecording } from "./actions";

export const getTwilioToken =createAsyncThunk(
  "call/getToken", 
  async () => getToken()
)

export const getCustomerByNumber = createAsyncThunk(
  "call/getCustomerByNumber",
  async (payload) => getIncomingCustomer(payload)
)

export const startRecording = createAsyncThunk(
  "call/beginRecording",
  async (payload) => beginRecording(payload) 
)
export const stopRecording = createAsyncThunk(
  "call/stopRecording",
  async (payload) => killRecording(payload) 
)
export const pauseRecording = createAsyncThunk(
  "call/pauseRecording",
  async (payload) => holdRecording(payload) 
)
export const resumeRecording = createAsyncThunk(
  "call/resumeRecording",
  async (payload) => playRecording(payload) 
)

const initialState = {
  token: null,
  device: null,
  connection: null,
  state: 'Connecting',
  incomingCustomer: null,
  callSid: '',
  recordSid: ''
};

export const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    setDevice: (state, action) => {
      state.device = action.payload
    },
    setConnection: (state, action) => {
      state.connection = action.payload
    },
    setCallState: (state, action) => {
      state.state = action.payload
    },
    setCallSid: (state, action) => {
      state.callSid = action.payload
    },

  },
  extraReducers: (builder) => {
     builder
      .addCase(getTwilioToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
      })
      .addCase(getCustomerByNumber.fulfilled, (state, action) => {
        state.incomingCustomer = action.payload
      })
      .addCase(startRecording.fulfilled, (state, action) => {
        state.recordSid = action.payload.recordSid
      })
  },
});

export const { setDevice, setConnection, setCallState, setCallSid } = callSlice.actions;
export default callSlice.reducer;
