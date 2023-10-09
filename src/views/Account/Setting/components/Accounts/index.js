/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import { grey } from '@mui/material/colors';
// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
// Images
import logoSlack from "assets/img/small-logos/logo-slack.svg";
import logoSpotify from "assets/img/small-logos/logo-spotify.svg";
import logoEmail from "assets/img/small-logos/logo-email.png";
import logoAtlassian from "assets/img/small-logos/logo-atlassian.svg";
import logoAsana from "assets/img/small-logos/logo-asana.svg";
import MessengerIcon from "assets/img/small-logos/logo-facebook.png";
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from 'assets/img/small-logos/logo-call.png'
import LiveChatIcon from 'assets/img/small-logos/logo-livechat.png'

// Material Dashboard 2 PRO React components
import { useMaterialUIController } from "context";
import { setFacebookEnable, setHDEnable, importHD, setEmailEnabled, saveEmailSetting, setCallEnabled, setLiveChatEnabled, buyPhoneNumber, portPhoneNumber } from 'redux/Reducers/UserReducer/userSlice'
import { useEffect } from "react";

function Accounts() {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => user);
  console.log("communicateuser---->", user)
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [hdApiKey, setHDApiKey] = useState('')
  const [atlassian2FA, setAtlassian2FA] = useState(true);
  const [asana2FA, setAsana2FA] = useState(false);
  const [businessEmail, setEmail] = useState('')
  const [appPassword, setPassword] = useState('')
  const [viewHD, setViewHD] = useState(false)
  const [viewEmail, setViewEmail] = useState(false)
  const [viewMessenger, setViewMessenger] = useState(false)
  const [viewCall, setViewCall] = useState(false)
  const [viewLiveChat, setViewLiveChat] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [portView, setPortView] = useState(false)
  const [buyView, setBuyView] = useState(false)
  const [portNumber, setPortNumber] = useState('')
  const [areaCode, setAreaCode] = useState('')

  const handleSetFacebook = () => {
    dispatch(setFacebookEnable(!user.isFacebookEnabled))
  }
  const handleSetHD = () => {
    dispatch(setHDEnable(!user.isHDEnabled))
  }
  const handleSetEmail = () => {
    dispatch(setEmailEnabled(!user.isEmailEnabled))
  }
  const handleSetCall = () => {
   dispatch(setCallEnabled(!user.isCallEnabled))
  }
  const handleSetLiveChat = () => {
    dispatch(setLiveChatEnabled(!user.isLivechatEnabled))
  }
  
  const handleImportHD = () => {
    dispatch(importHD({hdApiKey: hdApiKey}))
  }
  const handleSaveEmail = () => {
    dispatch(saveEmailSetting({email: businessEmail, password: appPassword}))
  }
  const handleBuyPhoneNumber = () => {
    // dispatch(buyPhoneNumber())
    setBuyView(true)
  }
  const handlePortPhoneNumber = () => {
    setPortView(true)
  }
  const handlePortClose = () => {
    setPortView(false)
  }
  const handleBuyClose = () => {
    setBuyView(false)
  }
  const handlePortConfirm = () => {
    dispatch(portPhoneNumber(portNumber))
    setPortView(false)
  }
  const handleBuyConfirm = () => {
    dispatch(buyPhoneNumber(areaCode))
    setBuyView(false)
  }

  useEffect(() => {
    if(user.hdApiKey) {
      setHDApiKey(user.hdApiKey)
    }
    if(user.businessEmail) {
      setEmail(user.businessEmail)
    }
    if (user.appPassword) {
      setPassword(user.appPassword)
    }
    if (user.phoneNumber) {
      setPhoneNumber(user.phoneNumber)
    }
  } ,[user])
  return (
    <Card id="accounts">
      <MDBox p={3} lineHeight={1}>
        <MDBox mb={1}>
          <MDTypography variant="h5">Accounts</MDTypography>
        </MDBox>
        <MDTypography variant="button" color="text">
          Here you can setup and manage your integration settings.
        </MDTypography>
      </MDBox>
      <MDBox pt={2} pb={3} px={3}>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <MDBox display="flex" alignItems="center">
            <MDAvatar alt="HD logo" variant="rounded" sx={{ bgcolor: grey[900], fontWeight: 'bold', fontSize: 20, width: 45, height: 45}}  >HD</MDAvatar>
            <MDBox ml={2}>
              <MDTypography variant="h5" fontWeight="medium">
                HDPhotoHub
              </MDTypography>
              <MDBox>
                {
                  viewHD ? 
                  <MDBox display="flex" alignItems="flex-end" onClick={() => setViewHD(!viewHD)} sx={{cursor: 'pointer'}}>
                    <MDTypography variant="button" color="text">
                      Show less
                    </MDTypography>
                    <MDTypography variant="button" color="text" sx={{ lineHeight: 0 }}>
                      <Icon fontSize="small">expand_less</Icon>
                    </MDTypography>
                  </MDBox> :
                  <MDBox display="flex" alignItems="flex-end" onClick={() => setViewHD(!viewHD)}  sx={{cursor: 'pointer'}}>
                    <MDTypography variant="button" color="text">
                      Show more
                    </MDTypography>
                    <MDTypography variant="button" color="text" sx={{ lineHeight: 0 }}>
                      <KeyboardArrowDownIcon fontSize="small">expand_less</KeyboardArrowDownIcon>
                    </MDTypography>
                  </MDBox>

                }
              </MDBox>
            </MDBox>
          </MDBox>
          <MDBox
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            width={{ xs: "100%", sm: "auto" }}
            mt={{ xs: 1, sm: 0 }}
          >
            <MDBox lineHeight={0} mx={2}>
              <MDTypography variant="button" color="text">
                {user.isHDEnabled ? "Enabled" : "Disabled"}
              </MDTypography>
            </MDBox>
            <MDBox mr={1}>
              <Switch color="success" checked={user.isHDEnabled} onChange={handleSetHD} />
            </MDBox>
          </MDBox>
        </MDBox>
        {
          user.isHDEnabled && viewHD && 
          <MDBox ml={2} pl={6} pt={2} lineHeight={1}>
            <MDTypography variant="button" color="text">
              You haven&apos;t added your HDPhotoHub yet or you aren&apos;t authorized. Please integrate 
              HDPhotoHub to your account by clicking Import button. 
            </MDTypography>
            <MDBox
              bgColor={darkMode ? "grey-900" : "grey-100"}
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }}
              my={3}
              py={1}
              pl={{ xs: 1, sm: 2 }}
              pr={1}
            >
              <MDTypography variant="button" fontWeight="medium" color="text">
                API Key
              </MDTypography>
              <MDBox
                display="flex"
                alignItems={{ xs: "flex-start", sm: "center" }}
                flexDirection={{ xs: "column", sm: "row" }}
              >
                <MDBox mr={2} mb={{ xs: 1, sm: 0 }} lineHeight={0}>
                  <MDInput value={hdApiKey} onChange={(e) => setHDApiKey(e.target.value)} />
                </MDBox>
                <MDButton variant="gradient" color="dark" size="small" onClick={handleImportHD} disabled={!hdApiKey} >
                  Import
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        }
        <Divider />
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <MDBox display="flex" alignItems="center">
            <MDAvatar src={logoEmail} variant="rounded" alt="Email logo"  />
            <MDBox ml={2}>
              <MDTypography variant="h5" fontWeight="medium">
                Email
              </MDTypography>
              <MDBox>
                {
                  viewEmail ? 
                  <MDBox display="flex" alignItems="flex-end" onClick={() => setViewEmail(!viewEmail)} sx={{cursor: 'pointer'}}>
                    <MDTypography variant="button" color="text">
                      Show less
                    </MDTypography>
                    <MDTypography variant="button" color="text" sx={{ lineHeight: 0 }}>
                      <Icon fontSize="small">expand_less</Icon>
                    </MDTypography>
                  </MDBox> :
                  <MDBox display="flex" alignItems="flex-end" onClick={() => setViewEmail(!viewEmail)}  sx={{cursor: 'pointer'}}>
                    <MDTypography variant="button" color="text">
                      Show more
                    </MDTypography>
                    <MDTypography variant="button" color="text" sx={{ lineHeight: 0 }}>
                      <KeyboardArrowDownIcon fontSize="small">expand_less</KeyboardArrowDownIcon>
                    </MDTypography>
                  </MDBox>

                }
              </MDBox>
            </MDBox>
          </MDBox>
          <MDBox
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            width={{ xs: "100%", sm: "auto" }}
            mt={{ xs: 1, sm: 0 }}
          >
            <MDBox lineHeight={0} mx={2}>
              <MDTypography variant="button" color="text">
                {user.isEmailEnabled ? "Enabled" : "Disabled"}
              </MDTypography>
            </MDBox>
            <MDBox mr={1}>
              <Switch color="success" checked={user.isEmailEnabled} onChange={handleSetEmail} />
            </MDBox>
          </MDBox>
        </MDBox>
        {
          user.isEmailEnabled && viewEmail &&
          <MDBox ml={2} pl={6} pt={2} lineHeight={1}>
            <MDTypography variant="button" color="text">
              Please add an email and app password (enable 2FA and IMAP service)
            </MDTypography>
            <MDBox
              bgColor={darkMode ? "grey-900" : "grey-100"}
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }}
              my={3}
              py={1}
              pl={{ xs: 1, sm: 2 }}
              pr={1}
            >
              <MDTypography variant="button" fontWeight="medium" color="text">
                Business Email
              </MDTypography>
              <MDBox
                display="flex"
                alignItems={{ xs: "flex-start", sm: "center" }}
                flexDirection={{ xs: "column", sm: "row" }}
              >
                <MDBox mb={{ xs: 1, sm: 0 }} lineHeight={0}>
                  <MDInput value={businessEmail} onChange={(e) => setEmail(e.target.value)} />
                </MDBox>
              </MDBox>
            </MDBox>
            <MDBox
              bgColor={darkMode ? "grey-900" : "grey-100"}
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }}
              my={3}
              py={1}
              pl={{ xs: 1, sm: 2 }}
              pr={1}
            >
              <MDTypography variant="button" fontWeight="medium" color="text">
                App Password
              </MDTypography>
              <MDBox
                display="flex"
                alignItems={{ xs: "flex-start", sm: "center" }}
                flexDirection={{ xs: "column", sm: "row" }}
              >
                <MDBox mb={{ xs: 1, sm: 0 }} lineHeight={0}>
                  <MDInput value={appPassword} type="password" onChange={(e) => setPassword(e.target.value)} />
                </MDBox>
              </MDBox>
            </MDBox>
            <MDBox display="flex" justifyContent="end">
              <MDButton variant="gradient" color="dark"  onClick={handleSaveEmail} >
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        }
        <Divider />
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <MDBox display="flex" alignItems="center">
            {/* <MDAvatar src={logoFacebook} alt="Messenger logo" variant="rounded" sx={{width: 140, height: 140}}/> */}
        
            <MDAvatar src={MessengerIcon} variant="rounded" alt="Email logo"  />
            <MDBox ml={2} lineHeight={0}>
              <MDTypography variant="h5" fontWeight="medium">
                Messenger
              </MDTypography>
              <MDBox>
                {
                  viewMessenger ? 
                  <MDBox display="flex" alignItems="flex-end" onClick={() => setViewMessenger(!viewMessenger)} sx={{cursor: 'pointer'}}>
                    <MDTypography variant="button" color="text">
                      Show less
                    </MDTypography>
                    <MDTypography variant="button" color="text" sx={{ lineHeight: 0 }}>
                      <Icon fontSize="small">expand_less</Icon>
                    </MDTypography>
                  </MDBox> :
                  <MDBox display="flex" alignItems="flex-end" onClick={() => setViewMessenger(!viewMessenger)}  sx={{cursor: 'pointer'}}>
                    <MDTypography variant="button" color="text">
                      Show more
                    </MDTypography>
                    <MDTypography variant="button" color="text" sx={{ lineHeight: 0 }}>
                      <KeyboardArrowDownIcon fontSize="small">expand_less</KeyboardArrowDownIcon>
                    </MDTypography>
                  </MDBox>

                }
              </MDBox>
            </MDBox>
          </MDBox>
          <MDBox
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width={{ xs: "100%", sm: "auto" }}
            mt={{ xs: 1, sm: 0 }}
          >
            <MDBox lineHeight={0} mx={2}>
              <MDTypography variant="button" color="text">
                {user.isFacebookEnabled ? "Enabled" : "Disabled"}
              </MDTypography>
            </MDBox>
            <MDBox mr={1}>
              <Switch color="success" checked={user.isFacebookEnabled} onChange={handleSetFacebook} />
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox>
          {
            user.isFacebookEnabled && viewMessenger &&
            <MDBox display="flex" justifyContent="end">
              <MDButton variant="gradient" color="dark" >
                Connect to Facebook
              </MDButton>
            </MDBox>
          }
        </MDBox>
        <Divider />
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <MDBox display="flex" alignItems="center">
            {/* <MDAvatar src={logoFacebook} alt="Messenger logo" variant="rounded" sx={{width: 140, height: 140}}/> */}
        
            <MDAvatar src={CallIcon} variant="rounded" alt="Email logo"  />
            <MDBox ml={2} lineHeight={0}>
              <MDTypography variant="h5" fontWeight="medium">
                Call
              </MDTypography>
              <MDBox>
                {
                  viewCall ? 
                  <MDBox display="flex" alignItems="flex-end" onClick={() => setViewCall(!viewCall)} sx={{cursor: 'pointer'}}>
                    <MDTypography variant="button" color="text">
                      Show less
                    </MDTypography>
                    <MDTypography variant="button" color="text" sx={{ lineHeight: 0 }}>
                      <Icon fontSize="small">expand_less</Icon>
                    </MDTypography>
                  </MDBox> :
                  <MDBox display="flex" alignItems="flex-end" onClick={() => setViewCall(!viewCall)}  sx={{cursor: 'pointer'}}>
                    <MDTypography variant="button" color="text">
                      Show more
                    </MDTypography>
                    <MDTypography variant="button" color="text" sx={{ lineHeight: 0 }}>
                      <KeyboardArrowDownIcon fontSize="small">expand_less</KeyboardArrowDownIcon>
                    </MDTypography>
                  </MDBox>

                }
              </MDBox>
            </MDBox>
          </MDBox>
          <MDBox
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width={{ xs: "100%", sm: "auto" }}
            mt={{ xs: 1, sm: 0 }}
          >
            <MDBox lineHeight={0} mx={2}>
              <MDTypography variant="button" color="text">
                {user.isCallEnabled ? "Enabled" : "Disabled"}
              </MDTypography>
            </MDBox>
            <MDBox mr={1}>
              <Switch color="success" checked={user.isCallEnabled} onChange={handleSetCall}  />
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox>
          {
            user.isCallEnabled && viewCall &&
            <MDBox ml={2} pl={6} pt={2} lineHeight={1}>
              <MDBox
                bgColor={darkMode ? "grey-900" : "grey-100"}
                borderRadius="lg"
                display="flex"
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                flexDirection={{ xs: "column", sm: "row" }}
                my={3}
                py={1}
                pl={{ xs: 1, sm: 2 }}
                pr={1}
              >
                <MDTypography variant="button" fontWeight="medium" color="text">
                  Phone number
                </MDTypography>
                <MDBox
                  display="flex"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  flexDirection={{ xs: "column", sm: "row" }}
                >
                  <MDBox mb={{ xs: 1, sm: 0 }} lineHeight={0}>
                    <MDInput value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} disabled={phoneNumber}/>
                  </MDBox>
                </MDBox>
            </MDBox>
            <MDBox display="flex" justifyContent="end">
              <MDButton variant="gradient" color="dark" size="small" onClick={handleBuyPhoneNumber} sx={{mr: 1}} disabled={phoneNumber}>
                Buy a phone number
              </MDButton>
              <MDButton variant="gradient" color="dark" size="small" onClick={handlePortPhoneNumber} disabled={phoneNumber}  >
                Port a phone number
              </MDButton>
            </MDBox>
          </MDBox>
          }
        </MDBox>
        <Modal
          open={portView}
          onClose={handlePortClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <MDBox sx={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
            <Card sx={{p: 3}}>
              <MDTypography variant="h6" sx={{mb: 1}}>Port a phone number</MDTypography>
              <MDInput onChange={(e) => setPortNumber(e.target.value)} />
              <MDBox display="flex" justifyContent="center" alignItems="center" sx={{mt: 1}} >
                <MDButton sx={{mr: 1}} onClick={() => setPortView(false)}>Cancel</MDButton>
                <MDButton color="info" onClick={handlePortConfirm}>Confirm</MDButton>
              </MDBox>
            </Card>
          </MDBox>
        </Modal>
        <Modal
          open={buyView}
          onClose={handleBuyClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <MDBox sx={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
            <Card sx={{p: 3}}>
            <MDTypography variant="h6" sx={{mb: 1}}>Buy a phone number</MDTypography>
              <MDInput onChange={(e) => setAreaCode(e.target.value)} />
              <MDBox display="flex" justifyContent="center" alignItems="center" sx={{mt: 1}} >
                <MDButton sx={{mr: 1}} onClick={() => setBuyView(false)}>Cancel</MDButton>
                <MDButton color="info" onClick={handleBuyConfirm}>Confirm</MDButton>
              </MDBox>
            </Card>
          </MDBox>
        </Modal>
        <Divider />
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <MDBox display="flex" alignItems="center">
            {/* <MDAvatar src={logoFacebook} alt="Messenger logo" variant="rounded" sx={{width: 140, height: 140}}/> */}
        
            <MDAvatar src={LiveChatIcon} variant="rounded" alt="Email logo"  />
            <MDBox ml={2} lineHeight={0}>
              <MDTypography variant="h5" fontWeight="medium">
                LiveChat
              </MDTypography>
              <MDBox>
                {
                  viewLiveChat ? 
                  <MDBox display="flex" alignItems="flex-end" onClick={() => setViewLiveChat(!viewLiveChat)} sx={{cursor: 'pointer'}}>
                    <MDTypography variant="button" color="text">
                      Show less
                    </MDTypography>
                    <MDTypography variant="button" color="text" sx={{ lineHeight: 0 }}>
                      <Icon fontSize="small">expand_less</Icon>
                    </MDTypography>
                  </MDBox> :
                  <MDBox display="flex" alignItems="flex-end" onClick={() => setViewLiveChat(!viewLiveChat)}  sx={{cursor: 'pointer'}}>
                    <MDTypography variant="button" color="text">
                      Show more
                    </MDTypography>
                    <MDTypography variant="button" color="text" sx={{ lineHeight: 0 }}>
                      <KeyboardArrowDownIcon fontSize="small">expand_less</KeyboardArrowDownIcon>
                    </MDTypography>
                  </MDBox>

                }
              </MDBox>
            </MDBox>
          </MDBox>
          <MDBox
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width={{ xs: "100%", sm: "auto" }}
            mt={{ xs: 1, sm: 0 }}
          >
            <MDBox lineHeight={0} mx={2}>
              <MDTypography variant="button" color="text">
                {user.isLivechatEnabled ? "Enabled" : "Disabled"}
              </MDTypography>
            </MDBox>
            <MDBox mr={1}>
              <Switch color="success" checked={user.isLivechatEnabled} onChange={handleSetLiveChat} />
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox>
          {
            user.isLivechatEnabled && viewLiveChat &&
            <MDBox
              bgColor={darkMode ? "grey-900" : "grey-100"}
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }}
              my={3}
              py={1}
              pl={{ xs: 1, sm: 2 }}
              pr={1}
            >
              <MDTypography variant="button" fontWeight="medium" color="text">
                {/* App Password */}
              </MDTypography>
              <MDBox
                display="flex"
                alignItems={{ xs: "flex-start", sm: "center" }}
                flexDirection={{ xs: "column", sm: "row" }}
              >
                <MDBox mb={{ xs: 1, sm: 0 }} lineHeight={0}>
                  <MDInput />
                </MDBox>
              </MDBox>
            </MDBox>
          }
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Accounts;
