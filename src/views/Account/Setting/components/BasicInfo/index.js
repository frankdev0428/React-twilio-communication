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

// @material-ui core components
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Settings page components
import FormField from "views/Account/components/FormField";

// Data
import selectData from "views/Account/Setting/components/BasicInfo/data/selectData";

function BasicInfo() {
  const { user } = useSelector(({ user }) => user);

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <MDBox p={3}>
        <MDTypography variant="h5">Basic Info</MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField label="First Name" placeholder="Alec" value={user.firstName}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="Last Name" placeholder="Thompson" value={user.lastName} />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormField
              label="Email"
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
              value={user.email}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormField label="Your Location" placeholder="Sydney, A" value={user.address} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Phone Number"
              placeholder="+40 735 631 620"
             
              value={user.phoneNumber}
            />
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <FormField label="Language" placeholder="English" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              multiple
              defaultValue={["react", "angular"]}
              options={selectData.skills}
              renderInput={(params) => <FormField {...params} InputLabelProps={{ shrink: true }} />}
            />
          </Grid> */}
        </Grid>
      </MDBox>
    </Card>
  );
}

export default BasicInfo;
