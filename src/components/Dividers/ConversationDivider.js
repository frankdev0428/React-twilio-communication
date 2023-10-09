import React from "react";
import cx from "classnames";
import Divider from "@mui/material/Divider";
import styles from "./Divider.module.css";

const ConvoDivider = ({ children, className, classes, ...other }) => {
  return (
    <>
      <Divider
        classes={{ ...classes }}
        className={cx(styles.convoDivider, className ? className : "")}
        {...other}
      >
        {children}
      </Divider>
    </>
  );
};

export default ConvoDivider;
