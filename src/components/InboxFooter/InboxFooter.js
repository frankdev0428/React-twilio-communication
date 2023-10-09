import React, { useState, useEffect, useRef } from "react";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { postMessage, postLiveChat } from "redux/Reducers/InboxReducer/inboxSlice";
import { postEmail } from "redux/Reducers/InboxReducer/inboxSlice";
import { postFacebook, setCommunicationType } from "redux/Reducers/InboxReducer/inboxSlice";
import Typography from "components/Typography/Typography";
import Img1 from "assets/img/user-male-1.jpg";
import Img2 from "assets/img/user-female-1.jpg";
import styles from "./InboxFooter.module.css";
import cx from "classnames";
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
// import SmsIcon from '@mui/icons-material/Sms';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDEditor from "components/MDEditor";
import { Experimental_CssVarsProvider } from "@mui/material";
import { current } from "@reduxjs/toolkit";
import SmsIcon from 'assets/img/small-logos/logo-sms.png';
import EmailIcon from 'assets/img/small-logos/logo-email.png';
import ChatIcon from 'assets/img/small-logos/logo-livechat.png';
import FacebookIcon from 'assets/img/small-logos/logo-facebook.png';
import MDAvatar from "components/MDAvatar";
import Picker from 'emoji-picker-react';
// import { useDetectClickOutside } from 'react-detect-click-outside';

const InboxFooter = () => {
  const [value, setValue] = useState("");
  const [subject, setSubject] = useState("")
  const dispatch = useDispatch();
  const { customer } = useSelector(({ inbox }) => inbox);
  const { history } = useSelector(({ inbox }) => inbox);
  const { device } = useSelector(({ call }) => call);
  const [currentType, setCurrentType] = useState("SMS"); 
  const { user } = useSelector(({ user }) => user);
  const [emojiView, setEmojiView] = useState(false)
  const [ref, setRef] = useState(null)
  const emojiRef = useRef(null)
  // const closeEmoji = () => {
  //   setEmojiView(false)
  //   alert()
  // }

  // const emojiRef = useDetectClickOutside({ onTriggered: closeEmoji });
  
  const handleSend = (e) => {
    if(e.code === 'Enter' && e.shiftKey) {
      return;
    }
    if (value && e.code === 'Enter' && customer && currentType === "SMS") {
      
      dispatch(postMessage({ to: customer.number, body: ref.getEditor().getText() }));
      setValue("");
    } else if (value && e.code === 'Enter' && customer && currentType === "Messenger" && user.isFacebookEnabled) {
      setValue(ref.getEditor().getText())
      dispatch(postFacebook({ to: customer.facebookMessageSid, content: ref.getEditor().getText() }));
      setValue("");
    } else if (value && e.code === 'Enter' && customer && currentType === "LiveChat") {
      dispatch(postLiveChat({ customerId: customer.id, body: ref.getEditor().getText() }));
      setValue("");
    } 
  };
  const handleSendByButton = () => {
    if (value && customer && currentType === "SMS") {
      dispatch(postMessage({ to: customer.number, body: value }));
      setValue("");
    } else if (value && customer && currentType === "Email") {
      const isSpaceOnly = ref.getEditor().getText().replace(/ |\n/g, '').length;
      if (!isSpaceOnly) return;
      dispatch(postEmail({ customerId: customer.id, email: customer.email, content: '<html>' + value  + '</html>', subject: subject}));
      setValue("");
    } else if (value && customer && currentType === "Messenger") {
      dispatch(postFacebook({ to: customer.facebookMessageSid, content: value }));
      setValue("");
    } else if (value && customer && currentType === "LiveChat") {
      dispatch(postLiveChat({ customerId: customer.id, body: ref.getEditor().getText() }));
      setValue("");
    } 
  }
  
  const handleType = (action) => {
    if(currentType === 'Email' && action.name === 'SMS') {
      setValue(ref.getEditor().getText())
    }
    if(currentType === 'Email' && action.name == 'Messenger') {
      setValue(ref.getEditor().getText())
    }
    setCurrentType(action.name)
    dispatch(setCommunicationType(action.name))
  }
  const handleCall = () => {
    device.connect({ To: customer.number, From: '+15622573655' });
  }
  const actions = [
    { icon: <MDAvatar src={SmsIcon} alt="SMS" sx={{width: 24, height: 24}} />, name: 'SMS' },
  ];
  if (user.isFacebookEnabled) {
    actions.push({ icon: <MDAvatar src={FacebookIcon} alt="Messenger" sx={{width: 23, height: 23}} />, name: 'Messenger' })
  }
  if (user.isEmailEnabled) {
    actions.push({ icon: <MDAvatar src={EmailIcon} variant="square" alt="Email" sx={{width: 21, height: 21}} />, name: 'Email' })
  }
  if (user.isLivechatEnabled) {
    actions.push( { icon: <MDAvatar src={ChatIcon} alt="LiveChat" sx={{width: 23, height: 23}} />, name: 'LiveChat' })
  }
  const onEmojiClick = (event, emojiObject) => {
    setEmojiView(false)
  };

  useEffect(() => {
    if(history.length) {
      if(history[history.length - 1].history_type === 'Voice') {
        setCurrentType('SMS')
        return;
      }
      if(history[history.length - 1].history_type === 'Messenger' && !user.isFacebookEnabled) {
        setCurrentType('SMS')
        return;
      } else if (history[history.length - 1].history_type === 'Email' && !user.isEmailenabled) {
        setCurrentType('SMS')
        return;
      } else if (history[history.length - 1].history_type === 'LiveChat' && !user.isLivechatEnabled) {
        setCurrentType('SMS')
        return;
      }

      if(customer.latestReceivedEmail) {
        setSubject(customer.latestReceivedEmail.subject)
      }
      setCurrentType(history[history.length - 1].history_type )
      dispatch(setCommunicationType(history[history.length - 1].history_type))
    }
  }, [history]);
  
  useEffect(() => {
    const itm = document.getElementsByClassName('ql-editor')[0];
    if (currentType == 'Messenger') {
      itm.setAttribute('data-placeholder', 'Reply with Messenger');  
      return;
    }
    itm.setAttribute('data-placeholder', 'Reply with an ' + currentType);
  }, [currentType])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiView && emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiView(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <div className={styles.container}>
      {/* <div>
        <CardHeader
          avatar={
            <AvatarGroup max={2}>
              <Avatar
                className={styles.avatarPrimary}
                alt="user image"
                src={Img2}
              />
              <Avatar
                className={styles.avatarSecondary}
                alt="user image"
                src={Img1}
              />
            </AvatarGroup>
          }
          classes={{
            root: styles.cardHeader,
            avatar: styles.cardHeaderAvatar,
            title: styles.cardHeaderTitle,
            subheader: styles.cardHeaderSubheader,
          }}
          title="Assigned"
          subheader="VIP Response Team--Michele Smith"
        />
      </div> */}
      <div className={styles.inputWrapper}>
        { currentType == 'Email' ? 
          <input 
            placeholder="Subject"
            value={subject}
            className={styles.replyInput}
            onChange={(e) => setSubject(e.target.value)}
          /> : ""
        }
        <MDEditor className={cx(currentType === 'Email' ? styles.inputEmailEditor : styles.inputEditor)} 
          value={value} 
          onChange={setValue} 
          placeholder={"Reply with an " + currentType} 
          onKeyDown={(e) => handleSend(e)}
          setRef={setRef}
        /> 
        {
          emojiView ? 
          <MDBox className={styles.emoji} ref={emojiRef}  >
            <Picker onEmojiClick={onEmojiClick} lazyLoadEmojis={true} /> 
          </MDBox> :
          ""
        }
        <MDBox display="flex" alignItems="center" justifyContent="space-between" className={styles.inputWidget} >
          <div>
            <IconButton
              size="small"
              sx={{ mr: 1, ml: 5.5 }}
              color="secondary" 
              onClick={() => setEmojiView(!emojiView)}
            >
              <SentimentSatisfiedAltIcon />
            </IconButton> 
            <IconButton
              size="small"
              sx={{ mr: 1 }}
              color="secondary" 
            >
              <AttachFileIcon />
            </IconButton> 
            <IconButton
              size="small"
              sx={{ mr: 1 }}
              color="secondary" 
            >
              <ScheduleIcon />
            </IconButton> 
            {
              customer && user?.isCallEnabled ? 
                <IconButton
                  size="small"
                  sx={{ mr: 2 }}
                  color="success" 
                  onClick={handleCall}
                >
                  <LocalPhoneIcon />
                </IconButton> : ""
            }
            
            <div className={styles.speedDial}>
                <SpeedDial
                  ariaLabel="SpeedDial openIcon example"
                  icon={<SpeedDialIcon  />}
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      onClick={() => handleType(action)}
                    />
                  ))}
                </SpeedDial>
            </div>
          </div>
          <MDButton color="success" variant="gradient" size="small" onClick={handleSendByButton}>Send</MDButton>
        </MDBox>
      </div>
      
      {/* <div>
        <Typography className={styles.topic}>Topic</Typography>
        <Typography className={styles.topicValue}>Upgrade</Typography>
      </div>
      <div>
        <IconButton className={styles.expandBtn} component="label">
          <ExpandMoreIcon />
        </IconButton>
      </div> */}
    </div>
  );
};

export default InboxFooter;
