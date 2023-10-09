import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initMessages } from "redux/Reducers/InboxReducer/inboxSlice";
import cx from "classnames";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Avatar from "@mui/material/Avatar";
import Button from "components/Button/Button.js";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import styles from "./Header.module.css";
import MDTypography from "components/MDTypography";
import { People } from "@mui/icons-material";
import logo from "assets/img/visa.png"
import CallEndIcon from '@mui/icons-material/CallEnd';
import Call from '@mui/icons-material/Call';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
// import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import PauseIcon from '@mui/icons-material/Pause';
import ForwardIcon from '@mui/icons-material/Forward';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DialpadIcon from '@mui/icons-material/Dialpad';
import CircleIcon from '@mui/icons-material/Circle';
import MenuIcon from '@mui/icons-material/Menu';
import Card from "@mui/material/Card";
import { deepOrange, deepPurple } from '@mui/material/colors';
import states from "../../router/states";
import { getTwilioToken, setDevice, setConnection, setCallState, startRecording, stopRecording, pauseRecording, resumeRecording } from "redux/Reducers/CallReducer/callSlice";
import { useStopwatch } from 'react-timer-hook';
import user from "assets/img/user-male-1.jpg";
import Divider from "@mui/material/Divider";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import InboxIcon from '@mui/icons-material/Inbox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaymentIcon from '@mui/icons-material/Payment';

const Header = () => {
  const dispatch = useDispatch();
  const { state } = useSelector(({ call }) => call);
  const { incomingCustomer } = useSelector(({ call }) => call);
  const { callSid } = useSelector(({ call }) => call);
  const { recordSid } = useSelector(({ call }) => call);

  const { connection } = useSelector(({ call }) => call);
  const { device } = useSelector(({ call }) => call);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(true)
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false)
  // const [callActive, setCallActive] = useState(false);
  const open = Boolean(anchorEl);
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoBack = () => {
    dispatch(initMessages([]));
    navigate("/");
  };
  const navigateToInbox = () => {
    navigate("/");
    setMenuOpen(false)
  }
  const handleLogout = () => {
    localStorage.removeItem("communicateUser");
    navigate("/login");
  };

  const navigateToCustomer = () => {
    navigate("/customers");
    setMenuOpen(false)
  };
  const navigateToAccount = () => {
    navigate("/accountSetting");
    setMenuOpen(false)
  }
  const navigateToPricing = () => {
    navigate("/pricing");
    setMenuOpen(false)
  }
  const handleAccept = () => {
    connection.accept();
    start()
    dispatch(setCallState(states.ON_CALL))
  }
  const handleDecline = () => {
    connection.reject();
    reset()
    dispatch(setCallState(states.READY))
  }
  const handleMute = () => {
    connection.mute(!muted);
    setMuted(!muted);
  };
  const handleHangup = () => {
    device.disconnectAll();
  };
  const handleRecord = () => {
    if(stopped) {
      dispatch(startRecording(callSid))
      setStopped(!stopped)
    } else {
      dispatch(stopRecording(recordSid))
      setStopped(!stopped)
      setPaused(false)
    }
  }
  const handlePause = () => {
    if(paused) {
      setPaused(!paused)
      dispatch(resumeRecording(recordSid))
    } else {
      setPaused(!paused)
      dispatch(pauseRecording(recordSid))
    }
   
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
  const handleCloseMenu = () => {
    setMenuOpen(false)
  }
  useEffect(() => {
    if(menuOpen) {
      document.body.classList.add("no-scroll")
    } else {
      document.body.classList.remove("no-scroll")
    }
  }, [menuOpen])
  return (
    <div className={styles.headerWrapper}>
      {
        menuOpen ?
        <MDBox className={styles.mask}  onClick={handleCloseMenu} ></MDBox>: ""
      }
      {
        <Card className={cx(styles.leftMenu , menuOpen ? styles.menuActive : '')}>
         
          
            {/* <Avatar sx={{width: 56, height: 56, ml: 2}} src={user} ></Avatar>
            <MDTypography variant="p" sx={{mt: 2, ml: 2}} >communicate User</MDTypography>
            <Divider /> */}
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={navigateToInbox} >
                  <MDBox display="flex" alignItems="center">
                    <InboxIcon sx={{mr: 2}} className={styles.inboxIcon} />
                    Inbox
                  </MDBox>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton >
                  <MDBox display="flex" alignItems="center">
                    <DashboardIcon sx={{mr: 2}} className={styles.dashboardIcon} />
                    Dashboard
                  </MDBox>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={navigateToCustomer} >
                  <MDBox display="flex" alignItems="center">
                    <GroupIcon sx={{mr: 2}} className={styles.customerIcon} />
                    Customers
                  </MDBox>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={navigateToAccount} >
                  <MDBox display="flex" alignItems="center">
                    <AccountBoxIcon sx={{mr: 2}} className={styles.accountIcon} />
                    Account
                  </MDBox>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={navigateToPricing} >
                  <MDBox display="flex" alignItems="center">
                    <PaymentIcon sx={{mr: 2}} className={styles.pricingIcon} />
                    Pricing
                  </MDBox>
                </ListItemButton>
              </ListItem>
            </List>
        
        </Card>        
      }
      <div className={styles.header}>
        
        <IconButton onClick={() => setMenuOpen(true)} >
          <MenuIcon  />
        </IconButton>
        
        {location.pathname.includes("/inbox/") && (
          <Button
            size="small"
            classes={{ startIcon: styles.startIcon }}
            className={styles.rootBtn}
            startIcon={<KeyboardArrowLeftIcon />}
            onClick={handleGoBack}
          >
            Inbox
          </Button>
        )}
      </div>
      { state == 'On call' ? 
        <MDBox display="flex" justifyContent="space-between" alignItems="center" className={styles.callProcess}>
          <MDBox display="flex" alignItems="center" >
            <IconButton
              size="small"
              sx={{ mr: 2 }}
              color="success" 
            >
              <PhoneInTalkIcon />
            </IconButton>
            {
              incomingCustomer ? 
              <MDBox>
                <MDTypography variant="h6" sx={{mr: 1}}>{(incomingCustomer.firstName + ' ' + incomingCustomer.lastName).length > 30 ? (incomingCustomer.firstName + ' ' + incomingCustomer.lastName).slice(0, 30).concat("...") : (incomingCustomer.firstName + ' ' + incomingCustomer.lastName)}</MDTypography>
                <MDTypography variant="p">{incomingCustomer ? incomingCustomer.number : ""}</MDTypography>
              </MDBox> : ""
            }
          </MDBox>
          <MDBox>
            {
              muted ? 
                <IconButton
                  size="small"
                  sx={{ mr: 2 }}
                  color="error" 
                  onClick={handleMute}
                >
                  <MicOffIcon />
                </IconButton>
                 : 
                <IconButton
                  size="small"
                  sx={{ mr: 2 }}
                  color="success" 
                  onClick={handleMute}
                >
                  <MicIcon />
                </IconButton>
            }
            {
              paused ? 
                <IconButton
                  size="small"
                  sx={{ mr: 2 }}
                  color="error" 
                  disabled={stopped ? true : false}
                  onClick={handlePause}
                >
                  <PauseIcon />
                </IconButton> : 
                <IconButton
                  size="small"
                  sx={{ mr: 2 }}
                  color="success" 
                  disabled={stopped ? true : false}
                  onClick={handlePause}
                >
                  <PauseIcon />
                </IconButton> 
                
            }
            <IconButton
              size="small"
              sx={{ mr: 2 }}
              color="success" 
            >
              <ForwardIcon />
            </IconButton>
            <IconButton
              size="small"
              sx={{ mr: 2 }}
              color="success" 
            >
              <PersonAddIcon />
            </IconButton>
            <IconButton
              size="small"
              sx={{ mr: 2 }}
              color="success" 
            >
              <DialpadIcon />
            </IconButton>
            <IconButton
              size="small"
              sx={{ mr: 2 }}
              color="error" 
              onClick={handleHangup}
            >
              <CallEndIcon />
            </IconButton>
            {
              stopped == true ? 
                <IconButton
                  sx={{ mr: 2}}
                  color="success" 
                  onClick={handleRecord}
                >
                  <CircleIcon sx={{fontSize: 18 }} />
                </IconButton> : 
                <IconButton
                  sx={{ mr: 2}}
                  color="error" 
                  onClick={handleRecord}
                  disabled={recordSid ? false : true}
                >
                  <CircleIcon sx={{fontSize: 18 }} />
                </IconButton>  
            }
          </MDBox>
          <MDBox>
            <MDTypography variant="p" color="success">{"Live " + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds) }</MDTypography>
          </MDBox>
        </MDBox> : 
        ""
      }
      
      <MDBox display="flex" alignItems="center" justifyContent="space-between" className={styles.incomingCall + ' ' + (state == 'Incoming' && incomingCustomer ? styles.active : '')}>
        <MDBox display="flex" alignItems="center" >
          <MDBox display="flex" alignItems="center" className={styles.incomingSign} sx={{ml: 5}} >
            <Call sx={{mr: 3, color: 'white'}} />
            <MDTypography variant="p" sx={{color: 'white', mr: 6}} >Incoming Call</MDTypography>
            <MDTypography variant="p" sx={{color: 'white', mr: 3}} >|</MDTypography>
          </MDBox>
          <MDBox display="flex" alignItems="center" className={styles.incomingSign}>
            {
              incomingCustomer ? 
              <Avatar {...stringAvatar(incomingCustomer.firstName + " " + incomingCustomer.lastName)} />
              : ""
            }
            <div className={styles.incomingAvatar}>
              {
                incomingCustomer ? <MDBox display="flex" alignItems="center">
                  <p>{(incomingCustomer.firstName + ' ' + incomingCustomer.lastName).length > 30 ? (incomingCustomer.firstName + ' ' + incomingCustomer.lastName).slice(0, 30).concat("...") : (incomingCustomer.firstName + ' ' + incomingCustomer.lastName)}</p>
                  <span>{incomingCustomer.number}</span>
                </MDBox> : ""
              }
            </div>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" sx={{mr: 5}}>
          <IconButton
            variant="contained"
            className={styles.declineBtn}
            onClick={handleDecline}
          >
              <CallEndIcon  />
          </IconButton>
          <IconButton 
            className={styles.callAnimation}
            sx={{ ml: 2 }}
            variant="contained"
            onClick={handleAccept} 
          >
            <Call className={styles.imgCircle} />
          </IconButton>

        </MDBox>
      </MDBox>
      {
        state == 'Ready' ? 
          <div>
            <h2>communicate</h2>
            {/* <MDButton variant="text" color="dark" className={styles.menuItem} onClick={navigateToInbox} >Inbox</MDButton>
            <MDButton variant="text" color="dark" className={styles.menuItem}>Dashbaord</MDButton>
            <MDButton variant="text" color="dark" className={styles.menuItem} onClick={navigateToCustomer}>Customers</MDButton>
            <MDButton variant="text" color="dark" className={styles.menuItem} onClick={navigateToAccount}>Account</MDButton>
            <MDButton variant="text" color="dark" className={styles.menuItem} onClick={navigateToPricing}>Pricing</MDButton> */}
          </div> : ""
      }
      <div className={styles.header}>
       
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar className={styles.userAvatar}>M</Avatar>
          </IconButton>
        </Tooltip>
      
      
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {/* <MenuItem onClick={navigateToAccount}>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            <MDTypography variant="button" color="text">
              Account
            </MDTypography>
          </MenuItem>
          <MenuItem onClick={navigateToCustomer}>
            <ListItemIcon>
              <People fontSize="small" />
            </ListItemIcon>
            <MDTypography variant="button" color="text">
              Customer
            </MDTypography>
          </MenuItem> */}
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <MDTypography variant="button" color="text">
              Logout
            </MDTypography>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
