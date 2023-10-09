import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import Grow from "@mui/material/Grow";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function GrowTransition(props) {
  return <Grow {...props} />;
}

const Notification = ({
  transitionType,
  open,
  message,
  alertType,
  hideDuration,
  alert,
  anchorOrigin,
  ...other
}) => {
  const [view, setView] = useState(open);

  const transition = () => {
    if (transitionType === "grow") {
      return GrowTransition;
    } else if (transitionType === "slide") {
      return SlideTransition;
    } else {
      return Fade;
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setView(false);
  };

  return (
    <div>
      <Snackbar
        open={view}
        TransitionComponent={transition()}
        message={message}
        onClose={handleClose}
        autoHideDuration={hideDuration}
        anchorOrigin={anchorOrigin}
        {...other}
      >
        {alert ? (
          <Alert severity={alertType} sx={{ width: "100%" }}>
            {message}
          </Alert>
        ) : null}
      </Snackbar>
    </div>
  );
};

Notification.defaultProps = {
  transitionType: "grow",
  open: false,
  hideDuration: 5000,
  alert: false,
  anchorOrigin: { vertical: "top", horizontal: "center" },
};

export default Notification;
