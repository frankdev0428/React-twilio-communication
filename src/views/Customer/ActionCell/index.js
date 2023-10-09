import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// @mui material components
import CustomerEdit from "../CustomerEdit/index";
// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { deleteCustomer } from "redux/Reducers/CustomerReducer/customerSlice";
import { getInquiries } from "redux/Reducers/InboxReducer/inboxSlice";


function ActionCell({data}) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleClose = () => setOpen(false);
  const { refresher } = useSelector(({ customer }) => customer);

  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  const handleEdit = () => {
    handleOpen()
  }
  const handleDelete = () => {
    handleDeleteOpen()
  }
  
  const handleDeleteConfirm = async () => {
    dispatch(deleteCustomer(data.row.original.id));
    await sleep(1000);
    dispatch(getInquiries());
    setDeleteOpen(false)
  }

  return (
    <>
      <MDBox display="flex" alignItems="center">
        <IconButton
          onClick={handleEdit}
          sx={{ ml: 2 }}
        >
          <EditIcon sx={{fontSize: 18}} />
        </IconButton>
        <IconButton
          onClick={handleDelete}
        >
          <DeleteIcon sx={{fontSize: 18}} />
        </IconButton>
      </MDBox>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <CustomerEdit onClose={handleClose} data={data}/>
      </Modal>
      <Dialog open={deleteOpen} maxWidth="sm" fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <MDBox position="absolute" top={0} right={0}>
          <IconButton>
            <CloseIcon onClick={() => setDeleteOpen(false)} />
          </IconButton>
        </MDBox>
        <DialogContent>
          <MDTypography variant="p">Do you really want to delete these records? This process cannot be undone.</MDTypography>
        </DialogContent>
        <DialogActions>
          <MDButton color="secondary" variant="contained" onClick={() => setDeleteOpen(false)}>
            Cancel
          </MDButton>
          <MDButton color="error" variant="contained" onClick={handleDeleteConfirm} >
            Delete
          </MDButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

// Setting default value for the props of IdCell
ActionCell.defaultProps = {

};

// Typechecking props for the IdCell
ActionCell.propTypes = {

};

export default ActionCell;
