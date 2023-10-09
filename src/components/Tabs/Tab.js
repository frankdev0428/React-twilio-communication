import React from "react";
import { Tab as MUITab } from "@mui/material";
import styles from "./Tabs.module.css";

const Tab = ({ children, index, classes = {}, ...other }) => {
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <>
      <MUITab
        {...other}
        {...a11yProps(index)}
        classes={{ root: styles.tabRoot, ...classes }}
      >
        {children}
      </MUITab>
    </>
  );
};

export default Tab;
