import { getSocket } from "config/socket";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTwilioToken, setDevice, setConnection, setCallState, getCustomerByNumber, setCallSid } from "redux/Reducers/CallReducer/callSlice";
import { getUserInfo } from "redux/Reducers/UserReducer/userSlice"
import { getMessages } from "redux/Reducers/InboxReducer/inboxSlice"
// import { Device } from "@twilio/voice-sdk";
import states from "./states";
import { getInquiries } from "redux/Reducers/InboxReducer/inboxSlice";

const AuthorizedRoute = () => {
  const { token } = useSelector(({ call }) => call);
  const { incomingCustomer } = useSelector(({ call }) => call);

  const dispatch = useDispatch();
  const user = localStorage.getItem("communicateUser");
  const location = useLocation();
  const [number, setNumber] = useState("");
  useEffect(() => {
    if (!token) {
      return;
    }
    const device = new window.Twilio.Device(token, { 
      // Set Opus as our preferred codec. Opus generally performs better, requiring less bandwidth and
      // providing better audio quality in restrained network conditions. Opus will be default in 2.0.
      codecPreferences: ["opus", "pcmu"],
      // Use fake DTMF tones client-side. Real tones are still sent to the other end of the call,
      // but the client-side DTMF tones are fake. This prevents the local mic capturing the DTMF tone
      // a second time and sending the tone twice. This will be default in 2.0.
      fakeLocalDTMF: true,
      // Use `enableRingingState` to enable the device to emit the `ringing`
      // state. The TwiML backend also needs to have the attribute
      // `answerOnBridge` also set to true in the `Dial` verb. This option
      // changes the behavior of the SDK to consider a call `ringing` starting
      // from the connection to the TwiML backend to when the recipient of
      // the `Dial` verb answers.
      enableRingingState: true,
      debug: true,
     });
    // console.log("device--->", device)
    device.on("ready", () => {
      // alert("ready")
      dispatch(setCallState(states.READY))
      dispatch(setDevice(device))
      // setDevice(device);
      // setState(states.READY);
    });
    device.on("connect", connection => {
      // alert("connect")
      dispatch(setCallState(states.ON_CALL))
      dispatch(setConnection(connection))
      // setConn(connection);
      // setState(states.ON_CALL);
    });
    device.on("disconnect", () => {
      // alert("disconnect")
      dispatch(setCallState(states.READY))
      dispatch(setConnection(null))
      // setState(states.READY);
      // setConn(null);
    });
    device.on("incoming", connection => {
      // alert("incoming")
      // console.log(connection)
      dispatch(setCallSid(connection.parameters.CallSid))
      dispatch(setCallState(states.INCOMING))
      dispatch(setConnection(connection))
      dispatch(getCustomerByNumber(connection.parameters.From))
      // setState(states.INCOMING);
      // setConn(connection);
      connection.on("reject", () => {
        dispatch(setCallState(states.READY))
        dispatch(setConnection(null))
        // setState(states.READY);
        // setConn(null);
      });
    });
    device.on("cancel", (connection) => {
      dispatch(setCallState(states.READY))
      dispatch(setConnection(null))
      dispatch(getMessages(incomingCustomer.id))
      // dispatch(getInquiries());
      // setState(states.READY);
      // setConn(null);
    });
    device.on("reject", () => {
      // alert("reject")
      dispatch(setCallState(states.READY))
      dispatch(setConnection(null))
      // setState(states.READY);
      // setConn(null);
    });

    return () => {
      device.destroy();
      dispatch(setCallState(states.OFFLINE))
      dispatch(setDevice(null))

      // setDevice(null);
      // setState(states.OFFLINE);
    };
  }, [token]);

  useEffect(() => {
    dispatch(getTwilioToken())
    dispatch(getUserInfo())
  }, [])

  if (!window.socket) {
    window.socket = getSocket();
    if (!window.socket) {
      return;
    }
    window.socket.on("connect", () => {
      console.log("connected");
    });
  }
  
  return user ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: "/login", state: { from: location } }} />
  );
};

export default AuthorizedRoute;
