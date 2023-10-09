
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Settings page components
import Header from "views/Account/Setting/components/Header";
import BasicInfo from "views/Account/Setting/components/BasicInfo";
import ChangePassword from "./components/ChangePassword";
import Authentication from "./components/Authentication";
import DeleteAccount from "views/Account/Setting/components/DeleteAccount";
import Accounts from "./components/Accounts";

function Settings() {
  return (
    <MDBox m={4}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <MDBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Header />
              </Grid>
              <Grid item xs={12}>
                <BasicInfo />
              </Grid>
              <Grid item xs={12}>
                <ChangePassword />
              </Grid>
              <Grid item xs={12}>
                <Authentication />
              </Grid>
              <Grid item xs={12}>
                <Accounts />
              </Grid>
              <Grid item xs={12}>
                <DeleteAccount />
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Settings;
