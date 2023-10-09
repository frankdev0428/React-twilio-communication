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
import { useLocation, useNavigate } from "react-router-dom";
// formik components
import { Formik, Form } from "formik";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// NewUser page components
import UserInfo from "views/Customer/CustomerAdd/components/UserInfo";
import Address from "views/Customer/CustomerAdd/components/Address";

// NewUser layout schemas for form and form feilds
import validations from "views/Customer/CustomerAdd/schemas/validations";
import form from "views/Customer/CustomerAdd/schemas/form";
import initialValues from "views/Customer/CustomerAdd/schemas/initialValues";
import { createCustomer } from "redux/Reducers/CustomerReducer/customerSlice";
import { useSelector, useDispatch } from "react-redux";
import { getInquiries } from "redux/Reducers/InboxReducer/inboxSlice";

function getSteps() {
  return ["User Info", "Address"];
}

function getStepContent(stepIndex, formData, setAvatar) {
  switch (stepIndex) {
    case 0:
      return <UserInfo formData={formData} setAvatar={setAvatar} />;
    case 1:
      return <Address formData={formData} />;
    default:
      return null;
  }
}

function NewUser(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { inquiries } = useSelector(({ inbox }) => inbox);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const [avatar, setAvatar] = useState('')
  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  const handleBack = () => setActiveStep(activeStep - 1);

  const submitForm = async (values, actions) => {
    dispatch(createCustomer(values));
    actions.setSubmitting(false);
    actions.resetForm();
    setActiveStep(0);
    await sleep(1000);
    dispatch(getInquiries());
    props.onClose();
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };
  return (
    <MDBox py={3} mb={20} height="65vh">
      <Grid container justifyContent="center" alignItems="center" sx={{ height: "100%", mt: 8 }}>
        <Grid item xs={12} lg={8}>
          <Formik
            initialValues={initialValues}
            validationSchema={currentValidation}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, isSubmitting }) => (
              <Form id={formId} autoComplete="off">
                <Card sx={{ height: "100%" }}>
                  <MDBox mx={2} mt={-3}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </MDBox>
                  <MDBox p={3}>
                    <MDBox>
                      {getStepContent(activeStep, {
                        values,
                        touched,
                        formField,
                        errors,
                      }, setAvatar)}
                      <MDBox mt={2} width="100%" display="flex" justifyContent="space-between">
                        {activeStep === 0 ? (
                          <MDBox />
                        ) : (
                          <MDButton variant="gradient" color="light" onClick={handleBack}>
                            back
                          </MDButton>
                        )}
                        <MDButton
                          disabled={isSubmitting}
                          type="submit"
                          variant="gradient"
                          color="dark"
                        >
                          {isLastStep ? "send" : "next"}
                        </MDButton>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </Card>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default NewUser;
