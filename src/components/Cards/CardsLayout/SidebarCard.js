import React from "react";
import cx from "classnames";
import styles from "./CardsLayout.module.css";

const SidebarCard = ({ children, className, ...other }) => {
  return (
    <>
      <div
        className={cx(styles.sidebarCard, className ? className : "")}
        {...other}
      >
        {children}
      </div>
    </>
  );
};

export default SidebarCard;
