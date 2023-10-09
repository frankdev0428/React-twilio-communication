
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import styles from "./index.module.css"
import { updateUserAvatar }  from 'redux/Reducers/UserReducer/userSlice'
import burceMars from "assets/img/user-male-1.jpg";
import SimpleFileUpload from 'react-simple-file-upload'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import defaultUser from 'assets/img/small-logos/people.png'
function Header() {
  const dispatch = useDispatch();
  const uploadKey = process.env.REACT_APP_SIMPLE_UPLOAD_API_KEY;
  const [visible, setVisible] = useState(true);
  const { user } = useSelector(({ user }) => user);
  const handleSetVisible = () => setVisible(!visible);
  function handleFile(url){
    dispatch(updateUserAvatar({avatar: url}))
  }
  return (
    <Card id="profile">
      <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item sx={{position: 'relative'}}>
            <MDBox className={styles.upload}>
              <SimpleFileUpload
                apiKey={uploadKey}
                onSuccess={handleFile}
                width={70}
                height={70}
              />
            </MDBox>
            {
              user?.avatar ? 
              <MDAvatar src={user.avatar} alt="profile-image" size="xl" shadow="sm" /> : 
              <MDAvatar src={defaultUser} alt="profile-image" size="xl" shadow="sm" />
            }
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {user.firstName + ' ' + user.lastName}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="medium">
                communicate User
              </MDTypography>
            </MDBox>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
            <MDBox
              display="flex"
              justifyContent={{ md: "flex-end" }}
              alignItems="center"
              lineHeight={1}
            >
              <MDTypography variant="caption" fontWeight="regular">
                Switch to {visible ? "invisible" : "visible"}
              </MDTypography>
              <MDBox ml={1}>
                <Switch color="success" checked={visible} onChange={handleSetVisible} />
              </MDBox>
            </MDBox>
          </Grid> */}
        </Grid>
      </MDBox>
    </Card>
  );
}

export default Header;
