import React from "react";
import cx from "classnames";
import styles from "./Typography.module.css";

const Typography = (props) => {
  const { children, className, ...other } = props;
  return (
    <div
      {...other}
      className={cx(styles.typography, className ? className : "")}
    >
      {children}
    </div>
  );
};

export default Typography;
