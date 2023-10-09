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

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SimpleFileUpload from 'react-simple-file-upload'
// NewUser page components
import FormField from "views/Customer/CustomerAdd/components/FormField";

function UserInfo({ formData, setAvatar }) {
  const { formField, values, errors, touched } = formData;
  const { firstName, lastName, number, email } = formField;
  const {
    firstName: firstNameV,
    lastName: lastNameV,
    email: emailV,
    number: numberV
  } = values;
  const uploadKey = process.env.REACT_APP_SIMPLE_UPLOAD_API_KEY;
  function handleFile(url){
    setAvatar(url)
  }
  return (
    <MDBox>
      <MDBox lineHeight={0}>
        <MDTypography variant="h5">About Customer</MDTypography>
       
      </MDBox>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={firstName.type}
              label={firstName.label}
              name={firstName.name}
              value={firstNameV}
              placeholder={firstName.placeholder}
              error={errors.firstName && touched.firstName}
              success={firstNameV.length > 0 && !errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={lastName.type}
              label={lastName.label}
              name={lastName.name}
              value={lastNameV}
              placeholder={lastName.placeholder}
              error={errors.lastName && touched.lastName}
              success={lastNameV.length > 0 && !errors.lastName}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={number.type}
              label={number.label}
              name={number.name}
              value={numberV}
              placeholder={number.placeholder}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={email.type}
              label={email.label}
              name={email.name}
              value={emailV}
              placeholder={email.placeholder}
              error={errors.email && touched.email}
              success={emailV.length > 0 && !errors.email}
            />
          </Grid>
        </Grid>
        <Grid item xs={6} sm={3}>
             <SimpleFileUpload
              apiKey={uploadKey}
              onSuccess={handleFile}
            />
          </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for UserInfo
UserInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default UserInfo;
