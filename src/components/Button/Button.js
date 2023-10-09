import React from "react";
import { Button as MUIButton } from "@mui/material";
import styles from "./Button.module.css";

const Button = ({ children, classes, ...other }) => {
  return (
    <>
      <MUIButton
        classes={{
          root: styles.button,
          ...classes,
        }}
        {...other}
      >
        {children}
      </MUIButton>
    </>
  );
};

export default Button;
