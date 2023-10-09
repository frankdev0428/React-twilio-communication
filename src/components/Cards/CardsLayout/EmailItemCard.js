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
import EmailIcon from 'assets/img/small-logos/logo-email.png';
import MDAvatar from "components/MDAvatar";
import defaultUser from 'assets/img/small-logos/people.png'

const EmailItemCard = ({ className, children, type, email, ...other }) => {
  const { content, createdDate } = email;
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
  const handleShowTime = () => {
    setVisible(!visible)
  }
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
  return (
    <div className={cx(styles.messageItemWrapper)}>
      <Typography className={cx(styles.messageTimestamp, addClass(type),  visible ? styles.timeShow : "")}>
        <MDAvatar src={EmailIcon} variant="square" alt="SMS" sx={{width: '21px', height: '21px', mr: 1}} />
        {`${
          type === "received" ?
            (customer ? customer.firstName : "Customer") :
            "I"
        } sent an email - ${moment(createdDate).fromNow()}`}
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
            className={cx(styles.messageItemCard, className ? className : "")}
            {...other}
          >
            <div className={styles.messageContent}>
              <Typography className={styles.message} dangerouslySetInnerHTML={{ __html: content}}></Typography>
           
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default EmailItemCard;
