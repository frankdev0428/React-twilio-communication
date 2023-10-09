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

const form = {
  formId: "new-user-form",
  formField: {
    firstName: {
      name: "firstName",
      label: "First Name",
      type: "text",
      errorMsg: "First name is required.",
    },
    lastName: {
      name: "lastName",
      label: "Last Name",
      type: "text",
      errorMsg: "Last name is required.",
    },
    number: {
      name: "number",
      label: "Phone Number",
      type: "text",
    },
    email: {
      name: "email",
      label: "Email Address",
      type: "email",
      errorMsg: "Email address is required.",
      invalidMsg: "Your email address is invalid",
    },
    // password: {
    //   name: "password",
    //   label: "Password",
    //   type: "password",
    //   errorMsg: "Password is required.",
    //   invalidMsg: "Your password should be more than 6 characters.",
    // },
    // repeatPassword: {
    //   name: "repeatPassword",
    //   label: "Repeat Password",
    //   type: "password",
    //   errorMsg: "Password is required.",
    //   invalidMsg: "Your password doesn't match.",
    // },
    street: {
      name: "street",
      label: "Street",
      type: "text",
      errorMsg: "Street is required.",
    },
    city: {
      name: "city",
      label: "City",
      type: "text",
      errorMsg: "City is required.",
    },
    state: {
      name: "state",
      label: "State",
      type: "text",
      errorMsg: "State is required.",
    },
    zipCode: {
      name: "zipCode",
      label: "ZipCode",
      type: "text",
      errorMsg: "Zip is required.",
      invalidMsg: "Zipcode is not valie (e.g. 70000).",
    },
  },
};

export default form;
