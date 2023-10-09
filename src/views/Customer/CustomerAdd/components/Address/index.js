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
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

// NewUser page components
import FormField from "views/Customer/CustomerAdd/components/FormField";

function Address({ formData }) {
  const { formField, values, errors, touched } = formData;
  const { street, city, zipCode, state } = formField;
  const { street: streetV, city: cityV, zipCode: zipCodeV, state: stateV } = values;

  return (
    <MDBox>
      <MDTypography variant="h5" fontWeight="bold">
        Street
      </MDTypography>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormField
              type={street.type}
              label={street.label}
              name={street.name}
              value={streetV}
              placeholder={street.placeholder}
              error={errors.street && touched.street}
              success={streetV.length > 0 && !errors.street}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              type={state.type}
              label={state.label}
              name={state.name}
              value={stateV}
              placeholder={state.placeholder}
              error={errors.state && touched.state}
              success={stateV && stateV.length > 0 && !errors.state}
            />
          </Grid>
        </Grid>
        <Grid container  display="flex" justifyContent="space-between" alignItems="center" spacing={3}>
          <Grid item xs={6} >
            <FormField
              type={city.type}
              label={city.label}
              name={city.name}
              value={cityV}
              placeholder={city.placeholder}
              error={errors.city && touched.city}
              success={cityV.length > 0 && !errors.city}
            />
          </Grid>
          {/* <Grid item xs={6} sm={3}>
            <Autocomplete
              options={["State 1", "State 2", "State 3"]}
              renderInput={(params) => <MDInput {...params} variant="standard" label="State" />}
            />
          </Grid> */}
          <Grid item xs={6}>
            <FormField
              type={zipCode.type}
              label={zipCode.label}
              name={zipCode.name}
              value={zipCodeV}
              placeholder={zipCode.placeholder}
              error={errors.zipCode && touched.zipCode}
              success={zipCodeV.length > 0 && !errors.zipCode}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for Address
Address.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Address;
