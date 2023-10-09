import React, { useState } from "react";
import cx from "classnames";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import styles from "./Input.module.css";

const Input = ({
  icon,
  type,
  classes: { wrapper, info, input, passwordToggle },
  ...other
}) => {
  const [inputType, setInputType] = useState(type);

  const handleHideShowPass = () => {
    setInputType(inputType === "text" ? "password" : "text");
  };

  const Icon = () => icon;

  return (
    <div className={cx(styles.inputWrapper, { [wrapper]: wrapper })}>
      {icon && (
        <div className={cx(styles.infoIcon, { [info]: info })}>
          <Icon />
        </div>
      )}

      <input
        className={cx(styles.input, { [input]: input })}
        type={inputType}
        {...other}
      />
      {type === "password" && (
        <div
          className={cx(styles.showHidePassIcon, {
            [passwordToggle]: passwordToggle,
          })}
          onClick={handleHideShowPass}
        >
          {inputType === "text" ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </div>
      )}
    </div>
  );
};

Input.defaultProps = {
  classes: { wrapper: null, info: null, input: null, passwordToggle: null },
};

export default Input;
