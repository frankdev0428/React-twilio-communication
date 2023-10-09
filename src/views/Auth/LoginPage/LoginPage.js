
 import { useState } from "react";
 import { useNavigate } from "react-router-dom";
 // react-router-dom components
 import { Link } from "react-router-dom";
 
 // @mui material components
 import Card from "@mui/material/Card";
 import Switch from "@mui/material/Switch";
 
 // Material Dashboard 2 PRO React components
 import MDBox from "components/MDBox";
 import MDTypography from "components/MDTypography";
 import MDInput from "components/MDInput";
 import MDButton from "components/MDButton";
 
 // Authentication layout components
 import CoverLayout from "./CoverLayout";
 
 // Images
 import bgImage from "assets/img/bg-sign-in-cover.jpeg";
 import api from "config/api";

function Cover() {
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  let navigate = useNavigate();

  const handleLogin = () => {
    if (email && password) {
      setLoading(true);
      api
        .post("auth/login", { email, password })
        .then((res) => {
          if (res.status === 200) {
            const user = { token: res.data.token };
            localStorage.setItem("communicateUser", JSON.stringify(user));
            setTimeout(() => {
              navigate("/");
              setLoading(false);
            }, 2000);
          }
        })
        .catch((e) => {
          setLoading(false);
        });
    }
  };

 
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            communicate
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to Sign In
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                placeholder="john@example.com"
                InputLabelProps={{ shrink: true }}
                value={email}
                onChange={(e) => setEmail(e?.currentTarget?.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                placeholder="************"
                InputLabelProps={{ shrink: true }}
                value={password}
                onChange={(e) => setPassword(e?.currentTarget?.value)}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} color="info" />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleLogin} >
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up/cover"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}
 
export default Cover;
 