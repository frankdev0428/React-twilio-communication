

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
import UserInfo from "views/Customer/CustomerEdit/components/UserInfo";

// NewUser layout schemas for form and form feilds
import validations from "views/Customer/CustomerEdit/schemas/validations";
import form from "views/Customer/CustomerEdit/schemas/form";
import initialValues from "views/Customer/CustomerEdit/schemas/initialValues";
import { updateCustomer } from "redux/Reducers/CustomerReducer/customerSlice";
import { useSelector, useDispatch } from "react-redux";
import { getInquiries } from "redux/Reducers/InboxReducer/inboxSlice";

function getSteps() {
  return ["User Info"];
}

function getStepContent(stepIndex, formData, setAvatar, allData, editable, setMergedCustomer) {
  const mergeOption = allData.filter((item) => item.label != (formData.values.firstName + ' ' + formData.values.lastName))
  switch (stepIndex) {
    case 0:
      return <UserInfo formData={formData} setAvatar={setAvatar} mergeOption={mergeOption} setMergedCustomer={setMergedCustomer} editable={editable} />;
    default:
      return null;
  }
}

function NewUser(props) {
  // console.log("props--->", props)
  const data = props.data.original
  const allData = props.allData
  const editable = props.editable

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { inquiries } = useSelector(({ inbox }) => inbox);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const [avatar, setAvatar] = useState('')
  const [mergedCustomer, setMergedCustomer] = useState(null)
  // console.log("mergedCustomer--->", mergedCustomer)
  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  const handleBack = () => setActiveStep(activeStep - 1);

  const submitForm = async (values, actions) => {
    dispatch(updateCustomer(values));
    actions.setSubmitting(false);
    actions.resetForm();
    setActiveStep(0);
 
    await sleep(1000);
    dispatch(getInquiries());
    props.onClose();
  };

  const handleSubmit = (values, actions) => {
    console.log("edit start--------------")
    if (isLastStep) {
      console.log("===========================")
      const payload = {
        ...values,
        avatar: avatar,
        mergeTo: mergedCustomer?.id
      }
      console.log("edit_value--->", payload)
      submitForm(payload, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };
  return (
    <MDBox py={3} mb={20} >
      <Grid container justifyContent="center" alignItems="center" sx={{ height: "100%", mt: 8 }} >
        <Grid item xs={12} lg={8} >
          <Formik
            initialValues={data}
            validationSchema={currentValidation}
            onSubmit={handleSubmit}
           
          >
            {({ values, errors, touched, isSubmitting }) => (
              <Form id={formId} autoComplete="off">
                <Card sx={{ height: "100%" }}>
                  <MDBox p={3}>
                    <MDBox>
                      {getStepContent(activeStep, {
                        values,
                        touched,
                        formField,
                        errors,
                      }, setAvatar, allData, editable, setMergedCustomer )}
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
                          {isLastStep ? "Save" : "next"}
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
