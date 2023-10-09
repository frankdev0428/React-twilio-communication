import React from "react";
import cx from "classnames";
import styles from "./CardsLayout.module.css";

const Card = ({ className, children, ...other }) => {
  return (
    <>
      <div className={cx(styles.card, className ? className : "")} {...other}>
        {children}
      </div>
    </>
  );
};

export default Card;
