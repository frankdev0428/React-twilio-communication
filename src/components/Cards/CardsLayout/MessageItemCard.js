import React, { useState } from "react";
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
import SmsIcon from 'assets/img/small-logos/logo-sms.png';
import { style } from "@mui/system";
import testImg from 'assets/img/1.jpg'
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";

const MessageItemCard = ({ className, children, type, message, ...other }) => {
  const { body, createdDate, media } = message;
  const { customer } = useSelector(({ inbox }) => inbox);
  const { user } = useSelector(({ user }) => user);
  const [visible, setVisible] = useState(false)
  const [mmsView, setMmsView] = useState(false)
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
  const handleCloseMMSView = () => {
    setMmsView(false)
  }
  return (
    <div className={cx(styles.messageItemWrapper)}>
      {
        mmsView ? 
        <MDBox className={styles.mask}  onClick={handleCloseMMSView} ></MDBox>: ""
      }
      <Typography className={cx(styles.messageTimestamp, addClass(type), visible ? styles.timeShow : "")}>
        <MDAvatar src={SmsIcon} alt="SMS" sx={{width: '24px', height: '24px', mr: 1}} />
        {`${
          type === "received" ?
            (customer ? customer.firstName : "Customer") :
            "I"
        } sent an sms - ${moment(createdDate).fromNow()}`}
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
        {
          media && media.length ? 
          media.map((item) => (
            <MDBox sx={{maxWidth: 400}} >
              <img src={item.url} className={cx(styles.mmsImg, mmsView ? styles.mmsImgActive : "")} onClick={() => setMmsView(true)}  />
              {/* <img src={testImg} className={cx(styles.mmsImg, mmsView ? styles.mmsImgActive : "")} onClick={() => setMmsView(true)} /> */}
            </MDBox>
          ))
          : 
            <div 
              className={styles.cardContent} 
              onMouseEnter={handleShowTime}
              onMouseLeave={handleShowTime}
            >
              <div
                className={cx(styles.messageItemCard, className ? className : "", addBg(type))}
                {...other}
              >
                <div className={styles.messageContent}>
                  <Typography className={styles.message}>{body}</Typography>
                </div>
              
              </div>
            </div>
        }
      
      </div>
    </div>
  );
};

export default      MessageItemCard;
