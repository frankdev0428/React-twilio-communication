import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import moment from "moment";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "components/Typography/Typography";
import { useSelector } from "react-redux";
import { ReactComponent as ChatIcon } from "assets/icons/svg/chat.svg";
import user1 from "assets/img/user-female-1.jpg";
import user2 from "assets/img/user-male-1.jpg";
import styles from "./CardsLayout.module.css";
import SmsIcon from '@mui/icons-material/Sms';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { style } from "@mui/system";
import WaveSurfer from 'wavesurfer.js'
import IconButton from "@mui/material/IconButton";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';

const VoiceItemCard = ({ className, children, type, createdDate, voice, ...other }) => {
  console.log("voice--->", voice)
  const containerRef = useRef()
  const waveSurferRef = useRef()
  const [isPlaying, toggleIsPlaying] = useState(false)
  const { customer } = useSelector(({ inbox }) => inbox);
  const { user } = useSelector(({ user }) => user);
  const [visible, setVisible] = useState(false)
  const addClass = (type) => {
    if (type === "received") {
      return styles.receivedMessageWrapper;
    } else if (type === "sent") {
      return styles.sentMessageWrapper;
    } else {
      return "";
    }
  };
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
  const addBg = (type) => {
    if (type === "received") {
      return styles.receivedBg;
    } else if (type === "sent") {
      return styles.sentBg;
    } else {
      return "";
    }
  }
  const handleShowTime = () => {
    setVisible(!visible)
  }
  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      responsive: true,
      cursorWidth: 0,
      barWidth: 1,
      barHeight: 4,
      progressColor: '#3DBD3A',
      waveColor: '#8DC191'
    })
    waveSurfer.load(voice.mediaUrl)
    waveSurfer.on('ready', () => {
      waveSurferRef.current = waveSurfer
      // waveSurfer.play()
    })
    return () => {
      waveSurfer.destroy()
    }

  }, [voice])
  return (
    <div className={cx(styles.messageItemWrapper)} >
      <Typography className={cx(styles.messageTimestamp, addClass(type), visible ? styles.timeShow : "")}>
        <RecordVoiceOverIcon />
        {`${
          type === "received" ?
            (customer ? customer.firstName : "Customer") :
            "I"
        } started a call - ${moment(createdDate).fromNow()}`}
      </Typography>
      <div
        className={cx(styles.messageItemCardWrapper, {
          [styles.receivedWrapper]: type === "received",
          [styles.sentWrapper]: type === "sent",
        })}
      >
        {
          customer.avatar ? 
          <Avatar src={type === "received" ? customer.avatar : user2} className={styles.userAvatar} /> :
          type == "received" ? 
          <Avatar {...stringAvatar(customer.firstName + " " + customer.lastName)} className={styles.userAvatar} /> : 
          <Avatar
            src={user?.avatar}
            className={styles.userAvatar}
            aria-label="recipe"
          >
          </Avatar>
        }
        <div 
          className={styles.cardContent} 
          onMouseEnter={handleShowTime}
          onMouseLeave={handleShowTime}
        >
          <div
            className={cx(styles.messageItemCard, styles.voiceItemCard, className ? className : "", addBg(type))}
            {...other}
          >
            {
              isPlaying ? 
              <IconButton onClick={() => {
                waveSurferRef.current && waveSurferRef.current.playPause();
                toggleIsPlaying(waveSurferRef.current.isPlaying());
              }} type="button">
                <PauseCircleOutlineIcon />
              </IconButton> : 
              <IconButton onClick={() => {
                waveSurferRef.current && waveSurferRef.current.playPause();
                toggleIsPlaying(waveSurferRef.current.isPlaying());
              }} type="button">
                <PlayCircleOutlineIcon />
              </IconButton>
            }
            
            <div ref={containerRef}>
            </div>
          
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default VoiceItemCard;
