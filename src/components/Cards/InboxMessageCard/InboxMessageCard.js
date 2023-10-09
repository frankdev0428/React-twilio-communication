import React from "react";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import MessageIcon from "@mui/icons-material/Message";
import Card from "@mui/material/Card";
import styles from "./InboxMessageCard.module.css";
import moment from "moment";
import Grid from '@mui/material/Grid';
import MDBox from "components/MDBox";
import SmsIcon from 'assets/img/small-logos/logo-sms.png';
import EmailIcon from 'assets/img/small-logos/logo-email.png';
import FacebookIcon from 'assets/img/small-logos/logo-facebook.png';
import ChatIcon from 'assets/img/small-logos/logo-livechat.png';
import MDAvatar from "components/MDAvatar";

const InboxMessageCard = ({ customer, handleCardClick }) => {

  const {
    firstName = "First",
    lastName = "Last",
    sms,
    email,
    emails,
    avatar,
    street = "Street",
    city = "City",
    state = "State",
    zipCode = "Zipcode",
    number,
    createdDate,
    updatedAt,
    dueDate,
    latest
  } = customer;
  const states = ['success', 'error', 'warning', 'info', 'dark', 'primary', 'secondary']
  const history = latest.obj
  console.log(latest)
  if(history == null) {
    return null
  }
  const type = history.type; 
  const name = `${firstName} ${lastName}`;
  const dueDays = moment(dueDate).diff(moment(), "day");
  const address = `${street ? street + ", " : ""} ${state ? state + ", "  : ""} ${city ? city : ""} `;
  
  const Icon = () => {
    if (latest.history_type === 'Email') {
      // email
      return <MDAvatar src={EmailIcon} variant="square" alt="SMS" sx={{width: '21px', height: '21px', ml: 1}} />;
    } else if (latest.history_type === 'Voice') {
      // call
      return <PhoneInTalkIcon />;
    } else if (latest.history_type === 'SMS') {
      // sms
      return <MDAvatar src={SmsIcon} alt="SMS" sx={{width: 24, height: 24, ml: 1}} />;
    } else if (latest.history_type === 'Messenger') {
      // facebook message
      return <MDAvatar src={FacebookIcon} alt="Messenger" sx={{width: 24, height: 24, ml: 1}} />;
    } else if (latest.history_type === 'LiveChat') {
      return <MDAvatar src={ChatIcon} alt="LiveChat" sx={{width: 24, height: 24, ml: 1}} />;
    } else {
      return null;
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

  return (
    <MDBox className={styles.inboxListMessageCard} onClick={handleCardClick}>
      <Card sx={{p: 3}}>
        <Grid container spacing={2}>
          <Grid item xs={3} >
            <CardHeader
              classes={{
                root: styles.cardHeader,
                title: styles.title,
                avatar: styles.cardAvatar,
                subheader: styles.subheader,
              }}
              avatar={
                avatar ? 
                <Avatar src={avatar} /> :
                <Avatar {...stringAvatar(firstName + " " + lastName)} src={avatar} />
              }
              title={name.length > 25 ? name.slice(0, 25).concat("...") : name}
              subheader={
                <>
                  <SubHeader title={"(" + number.slice(2, 5) + ") " + number.slice(5, 8) + "-" + number.slice(8)} className={styles.overflow} />
                  <SubHeader title={email.length > 25 ? email.slice(0, 25).concat("...") : email} className={styles.overflow} />
                  <SubHeader title={address.length > 25 ? address.slice(0, 25).concat("...") : address} className={styles.overflow} />
                </>
              }
            />
            
          </Grid>
        
          <Grid item md={9} sx={{ display: "flex" }} >
            <Divider orientation="vertical" sx={{ ml: 2, mr: 2 }} />
            {
              history ? 
              <div className={styles.userMessageDetails}>
                <div className={styles.messageInfoHeader}>
                  <h3 className={styles.title}>{type ? "Incoming" : "Sent"} {latest.history_type}</h3>
                  <div className={styles.durationWrapper}>
                    <h4 className={styles.dueDuration}>{`Due in ${dueDays} days`}</h4>
                    <Icon />
                  </div>
                </div>
                <div className={styles.messageContent}>
                  <p className={styles.message}>
                    {
                      latest.history_type == 'SMS' ? (history.body && history.body.length > 65 ? history.body.slice(0, 65).concat("...") : history.body) : (latest.history_type == 'Email' ? (history.content && history.content.replace(/<[^>]+>/g, '').length > 65 ? history.content.replace(/<[^>]+>/g, '').slice(0, 65).concat("...") : history.content.replace(/<[^>]+>/g, '')) : (latest.history_type == 'Voice' && history.dialCallStatus === 'no-answer' ? 'Missed call from ' + customer.firstName + ' ' + customer.lastName : (latest.history_type == 'Messenger' ? (history.body && history.body.length > 65 ? history.body.slice(0, 65).concat("...") : history.body) : latest.history_type == 'LiveChat' ? (history.body && history.body.length > 65 ? history.body.slice(0, 65).concat("...") : history.body) : "")))
                    }
                  </p>
                  <p className={styles.timeStamp}>
                    {`Updated ${moment(
                      history.updatedDate
                    ).fromNow()}, Support, Created ${moment(createdDate).fromNow()}`}
                  </p>
                </div>

              </div> : ""
            }

          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
};

export default InboxMessageCard;

const SubHeader = ({ title, ...other }) => {
  return (
    <>
      <p className={styles.subheader} {...other}>
        {title}
      </p>
    </>
  );
};
