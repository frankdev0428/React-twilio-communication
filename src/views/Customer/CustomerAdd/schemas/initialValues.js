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

import checkout from "views/Customer/CustomerAdd/schemas/form";

const {
  formField: {
    firstName,
    lastName,
    number,
    email,
    // password,
    // repeatPassword,
    street,
    city,
    zipCode,
  },
} = checkout;

const initialValues = {
  [firstName.name]: "",
  [lastName.name]: "",
  [number.name]: "",
  [email.name]: "",
  // [password.name]: "",
  // [repeatPassword.name]: "",
  [street.name]: "",
  [city.name]: "",
  [zipCode.name]: "",
};

export default initialValues;
