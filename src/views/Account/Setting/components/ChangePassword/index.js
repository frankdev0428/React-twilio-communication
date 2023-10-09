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

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updatecommunicatePassword } from 'redux/Reducers/UserReducer/userSlice'
import validator from 'validator'

function ChangePassword() {
  const dispatch = useDispatch();
  const passwordRequirements = [
    "One special characters",
    "Min 6 characters",
    "One number (2 are recommended)",
    "Change it often",
  ];
 
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setErrorMessage] = useState(true)

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <MDBox key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1}>
        <MDTypography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </MDTypography>
      </MDBox>
    );
  });
  const handleUpdatePassword = () => {
    dispatch(updatecommunicatePassword({password: password, newPassword: newPassword, confirmPassword: confirmPassword}))
  }
  useEffect(() => {
    if(newPassword) {
      if (validator.isStrongPassword(newPassword, {
        minLength: 6, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
      })) {
        setErrorMessage(false)
      } else {
        setErrorMessage(true)
      }
    } 
  }, [newPassword])
  return (
    <Card id="change-password">
      <MDBox p={3}>
        <MDTypography variant="h5">Change Password</MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MDInput
              fullWidth
              label="Current Password"
              inputProps={{ type: "password", autoComplete: "" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <MDInput
              fullWidth
              label="New Password"
              inputProps={{ type: "password", autoComplete: "" }}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <MDInput
              fullWidth
              label="Confirm New Password"
              inputProps={{ type: "password", autoComplete: "" }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <MDBox>
          {
            newPassword && 
            <>
              {
                error ? 
                <MDTypography variant="p" sx={{m: 1}} color="error" >Is Not Strong Password</MDTypography> : 
                <MDTypography variant="p" sx={{m: 1}} color="success" >Is Strong Password</MDTypography>
              }
            </>
          }
        </MDBox>
        <MDBox mt={6} mb={1}>
          <MDTypography variant="h5">Password requirements</MDTypography>
        </MDBox>
        <MDBox mb={1}>
          <MDTypography variant="body2" color="text">
            Please follow this guide for a strong password
          </MDTypography>
        </MDBox>
        <MDBox display="flex" justifyContent="space-between" alignItems="flex-end" flexWrap="wrap">
          <MDBox component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
            {renderPasswordRequirements}
          </MDBox>
          <MDBox ml="auto">
            <MDButton variant="gradient" color="dark" size="small" disabled={(newPassword !== confirmPassword) || !newPassword || !confirmPassword } onClick={handleUpdatePassword} >
              update password
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default ChangePassword;
