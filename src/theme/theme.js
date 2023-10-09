import { createTheme } from "@mui/material/styles";
import boxShadow from "./functions/boxShadow";
import hexToRgb from "./functions/hexToRgb";
import pxToRem from "./functions/pxToRem";
import rgba from "./functions/rgba";
import linearGradient from "./functions/linearGradient";
import borders from "./base/borders";
import boxShadows from "./base/boxShadows";
import colors from "./base/colors"
import typography from "./base/typography";
import autocomplete from "./components/form/autocomplete";
import input from "./components/form/input";
import inputLabel from "theme/components/form/inputLabel";
import inputOutlined from "theme/components/form/inputOutlined";
import textField from "theme/components/form/textField";
import card from "theme/components/form/card";
import stepper from "theme/components/form/stepper";
import step from "theme/components/form/stepper/step";
import stepConnector from "theme/components/form/stepper/stepConnector";
import stepLabel from "theme/components/form/stepper/stepLabel";
import stepIcon from "theme/components/form/stepper/stepIcon";
import button from "theme/components/form/button";
import buttonBase from "theme/components/form/buttonBase";
import divider from "theme/components/form/divider";
import tooltip from "theme/components/form/tooltip";
import icon from "theme/components/form/icon";
import iconButton from "theme/components/form/iconButton";
import appBar from "theme/components/form/appBar";
import tabs from "theme/components/form/tabs";
import tab from "theme/components/form/tabs/tab";
import checkbox from "theme/components/form/checkbox";
import dialog from "theme/components/form/dialog";
import dialogTitle from "theme/components/form/dialog/dialogTitle";
import dialogContent from "theme/components/form/dialog/dialogContent";
import dialogContentText from "theme/components/form/dialog/dialogContentText";
import dialogActions from "theme/components/form/dialog/dialogActions";

export const theme = createTheme({
  palette: {
    secondary: {
      main: "#3DBD3A",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },
  borders: { ...borders },
  boxShadows: { ...boxShadows },
  palette: { ...colors },
  typography: { ...typography },
  components: {
    MuiAutocomplete: { ...autocomplete },
    MuiInput: { ...input },
    MuiInputLabel: { ...inputLabel },
    MuiOutlinedInput: { ...inputOutlined },
    MuiTextField: { ...textField },
    MuiCard: { ...card },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiButton: { ...button },
    MuiButtonBase: { ...buttonBase },
    MuiDivider: { ...divider },
    MuiTooltip: { ...tooltip },
    MuiIcon: { ...icon },
    MuiIconButton: { ...iconButton },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiCheckbox: { ...checkbox },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogActions: { ...dialogActions },
  },
});
