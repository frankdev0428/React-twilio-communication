import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./UserChatCard.module.css";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import IconButton from "@mui/material/IconButton";
import SendIcon from '@mui/icons-material/Send';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { getChatHistory, sendChat, setChatAllRead, enterChatRoom }  from 'redux/Reducers/UserReducer/userSlice'
import CircularProgress from '@mui/material/CircularProgress';
import { scrollToBottom } from "utils/helpers/helpers";
import Badge from '@mui/material/Badge';
import { getUsers }  from 'redux/Reducers/UserReducer/userSlice'
import NorthRoundedIcon from '@mui/icons-material/NorthRounded';

const UserChatCard = ({ user, setSelectedUser }) => {
  const dispatch = useDispatch()
  const [content, setContent] = useState('')
  const { history } = useSelector(({ user }) => user);
  // console.log("chathistory--->", history)
  const { isLoading } = useSelector(({ user }) => user);
  const { totalUnread } = useSelector(({ user }) => user);
  const scrollContainer = useRef(null);
  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  const handleSendByEnter = (e) => {
    if (e.keyCode === 13 && content) {
      dispatch(sendChat({toUserId: user.id, body: content}))
      setContent('')
    }
  }
  const handleSend = () => {
    dispatch(sendChat({toUserId: user.id, body: content}))
    setContent('')
  }
  const handleBack = () => {
    setSelectedUser(null)
    dispatch(getUsers())
  }
  useEffect(() => {
    // dispatch(getChatHistory(user.id))
    // dispatch(setChatAllRead(user.id))
    // dispatch(getUsers())
    dispatch(enterChatRoom(user.id))
    if (window.socket) {
      window.socket.removeListener("new_chat");
      window.socket.on("new_chat", (sms) => {
        // dispatch(getChatHistory(user.id))
        // dispatch(setChatAllRead(user.id))
        // dispatch(getUsers())
        dispatch(enterChatRoom(user.id))
      });
    }
  }, [])
  useEffect(() => {
    scrollToBottom(scrollContainer);
  }, [history])
  return (
    <div>
      <MDBox className={styles.internalChatHeader}>
        <MDBox sx={{position: 'relative'}}>
          <IconButton
            color="secondary"
            sx={{mt: 1, position: 'absolute', left: 0}}
            onClick={handleBack}
          >
            <ChevronLeftIcon />
          </IconButton>
          {
            totalUnread == 0 ? "" : 
            <Badge badgeContent={totalUnread} color="info" sx={{mt: 3.5, position: 'absolute', left: 41}} ></Badge>
          }
          <MDBox display="flex" justifyContent="center">
            <Avatar {...stringAvatar(user.firstName + ' ' + user.lastName)} sx={{ width: 56, height: 56 }} />
          </MDBox>
        </MDBox>
        <MDTypography variant="p" className={styles.internalAvatarName}>{user.firstName}</MDTypography>
      </MDBox>
      <Divider />
      <div className={styles.userChatCardWrapper} >
        {/* <div  > */}
          
        <MDBox className={styles.chatBox} ref={scrollContainer} >
          {
            isLoading ? 
            <div className={styles.loading} >
              <CircularProgress color="success" /> 
            </div> : 
            history.map((item) => (
              user.id == item.fromUser.id ? 
              <div className={styles.receiveCard}>
                <span>{item.body}</span>
              </div> : 
              user.id == item.toUser.id ?
                <div className={styles.sendCard}>
                  <span>{item.body}</span>
                  
                </div> : ""
            ))
          }
          
        </MDBox>
      
       
        <MDBox class={styles.sendWrapper}>
          <MDBox display="flex" justifyContent="between" alignItems="center" className={styles.inputWrapper}>
            <input
              placeholder="Type text here..."
              type="text"
              className={styles.sendInput}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleSendByEnter}
              value={content}
            />
            <IconButton sx={{position: 'absolute', right: 5}}  onClick={handleSend} >
              <NorthRoundedIcon className={styles.sendIcon} disabled={content ? false : true}  />
            </IconButton>
          </MDBox>
        </MDBox>
      </div>
    </div>
  );
};

export default UserChatCard;
