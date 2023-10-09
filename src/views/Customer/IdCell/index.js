/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import Avatar from "@mui/material/Avatar";
import MDTypography from "components/MDTypography";

function IdCell({ data, selected, setSelected, uniqueSelection }) {
  // console.log("avatar--->", data.row.original.avatar)
  const checked = selected ? selected.includes(data.row.original.id) : false
  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  function toggleCheck() {
    const id = data.row.original.id;
    if (checked) {
      // remove element from array
      const index = selected.indexOf(id);
      const newSelected = [...selected]
      if (index != -1) {
        newSelected.splice(index, 1);
        setSelected(newSelected);
      }
    } else if (uniqueSelection) {
      setSelected([id])
    } else {
      // console.log(selected)
      setSelected([...selected, id]);
    }
  }
  return (
    <MDBox display="flex" alignItems="center">
      <Checkbox checked={checked} onChange={toggleCheck} onClick={(e) => {e.stopPropagation()}}/>
      {
        data.row.original.avatar ? 
        <Avatar src={data.row.original.avatar} /> : 
        <Avatar {...stringAvatar(data.row.original.firstName + " " + data.row.original.lastName)} />
      }
      <MDBox 
        ml={1} 
        display="inline-block"
        width="max-content"
        color="text"
        sx={{ verticalAlign: "middle", ml: 2 }}
        >
          {data.row.original.firstName + " " + data.row.original.lastName}
        
      </MDBox>
    </MDBox>
  );
}

// Setting default value for the props of IdCell
IdCell.defaultProps = {
  checked: false,
};

// Typechecking props for the IdCell
IdCell.propTypes = {
  data: PropTypes.object.isRequired,
  checked: PropTypes.bool,
};

export default IdCell;
