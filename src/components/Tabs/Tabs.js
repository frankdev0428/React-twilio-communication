import React from "react";
import { Tabs as MUITabs } from "@mui/material";
import styles from "./Tabs.module.css";

const Tabs = ({ children, classes = {}, ...other }) => {
  return (
    <>
      <MUITabs
        aria-label="basic tabs example"
        {...other}
        classes={{ indicator: styles.activeTabIndicator, ...classes }}
      >
        {children}
      </MUITabs>
    </>
  );
};

export default Tabs;
