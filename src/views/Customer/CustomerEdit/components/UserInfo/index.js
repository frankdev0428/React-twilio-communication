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
import IconButton from "@mui/material/IconButton";
// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
// NewUser page components
import FormField from "views/Customer/CustomerAdd/components/FormField";
import SimpleFileUpload from 'react-simple-file-upload'
import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "components/Tabs/TabPanel.js";
import styles from './index.module.css'
import Autocomplete from "@mui/material/Autocomplete";
import MDInput from "components/MDInput";
import Checkbox from "@mui/material/Checkbox";
import DataTable from "../../../../../examples/Tables/DataTable";
import IdCell from "../../../IdCell";
function UserInfo({ formData, setAvatar, mergeOption, setMergedCustomer, editable }) {
  const { formField, values, errors, touched } = formData;
  const { firstName, lastName, number, email, street, city, zipCode, state } = formField;
  const [selected, setSelected] = useState([])
  const {
    firstName: firstNameV,
    lastName: lastNameV,
    email: emailV,
    number: numberV,
    street: streetV, 
    city: cityV, 
    zipCode: zipCodeV,
    state: stateV,
  } = values;
  

  // console.log(allData)
  const uploadKey = process.env.REACT_APP_SIMPLE_UPLOAD_API_KEY;
  const [value, setValue] = useState(editable ? 0 : 1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function handleFile(url){
    setAvatar(url)
  }
  const customerTableData = {
    columns: [
      { Header: "name", accessor: "firstName", Cell: ( value ) => <IdCell data={value} selected={selected} setSelected={setSelected} uniqueSelection={true}/>, selection: true},
      { Header: "phone number", accessor: "number" },
      { Header: "email", accessor: "email" },
      { Header: "city", accessor: "city" },
      { Header: "state", accessor: "state" },
      { Header: "street", accessor: "street" },
      // { Header: "action",  Cell: ( value ) => <ActionCell data={value} /> },
    ],
    rows: mergeOption
  }
  // const handleChange = (e) => {
  //   if(e.target.files) {
  //     const file = e.target.files[0]
  //     console.log("file---->", file)
  //   }
  // }
  useEffect(() => {
    if (selected && selected.length == 1) {
      setMergedCustomer({id: selected[0]})
    }
  }, [selected])
  return (
    <MDBox >
      <MDBox>
        <MDBox>
          <MDTypography variant="h5">{editable ? "Edit Customer" : "Merge Customer"}</MDTypography>
          
        </MDBox>
        <MDBox className={styles.mergeTab}>
          {
            editable && 
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab label="Edit" index={0} />
                <Tab label="Merge" index={1} />
              </Tabs>
          }
        </MDBox>
      </MDBox>
      <TabPanel value={value} index={0}>

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
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={6} sm={6}>
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
            <Grid item xs={6} sm={3}>
              {/* <IconButton color="success" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={handleChange} />
                <PhotoCamera />
              </IconButton> */}
              <SimpleFileUpload
                apiKey={uploadKey}
                onSuccess={handleFile}
              />
            </Grid>
            
          </Grid>
        </MDBox>
      </TabPanel>
      <TabPanel  value={value} index={1}>
        <MDBox sx={{mt: 2, mb: 2}}>
          <MDTypography variant="button" color="text">
            Select customer to merge
          </MDTypography>
        </MDBox>
        <MDBox className={styles.editWrapper}>
          {/* <Autocomplete
            disableClearable
            options={mergeOption}
            onChange={(event, newValue) => {
              setMergedCustomer(newValue);
            }}
            size="small"
            sx={{ width: "20rem" }}
            renderInput={(params) => <MDInput {...params} />}
          /> */}
          <DataTable table={customerTableData} canSearch hover selected={selected} setSelected={setSelected} uniqueSelection />
        </MDBox>
      </TabPanel>
    </MDBox>
  );
}

// typechecking props for UserInfo
UserInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default UserInfo;
