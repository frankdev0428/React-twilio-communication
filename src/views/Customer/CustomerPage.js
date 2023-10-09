
import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import { useLocation, useNavigate } from "react-router-dom";


// Material Dashboard 2 PRO React components
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "../../components/MDTypography";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
// Material Dashboard 2 PRO React examples
import DataTable from "../../examples/Tables/DataTable";
import CustomerAdd from "./CustomerAdd/index";
import CustomerEdit from "./CustomerEdit/index";
// Data
import { getInquiries } from "redux/Reducers/InboxReducer/inboxSlice";
import { importMultipleCustomers } from "redux/Reducers/CustomerReducer/customerSlice";
import { deleteCustomers } from "redux/Reducers/CustomerReducer/customerSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CustomerPage.module.css";
import excel from "../../config/excel"
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import IdCell from "./IdCell";

function CustomerPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { inquiries } = useSelector(({ inbox }) => inbox);
  const { refresher } = useSelector(({ customer }) => customer);
  const importButton = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([])
  const handleDeleteOpen = () => setDeleteOpen(true);
  const [rowData, setRowData] = React.useState(null)

  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);

  useEffect(() => {
    dispatch(getInquiries());
    
  }, []);
  useEffect(() => {
    dispatch(getInquiries());
  },[refresher]);
  const customerTableData = {
    columns: [
      { Header: "name", accessor: "firstName", Cell: ( value ) => <IdCell data={value} selected={selected} setSelected={setSelected} />, selection: true},
      { Header: "phone number", accessor: "number" },
      { Header: "email", accessor: "email" },
      { Header: "city", accessor: "city" },
      { Header: "state", accessor: "state" },
      { Header: "street", accessor: "street" },
      // { Header: "action",  Cell: ( value ) => <ActionCell data={value} /> },
    ],
    rows: inquiries
  }
  const handleChange = (e) => {
    if(e.target.files) {
      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop().toLocaleLowerCase()
      readFile(file)
      return false
    }
  }
  const readFile = (file) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadstart = e => {
        
    }
    reader.onprogress = e => {
        
    }
    reader.onload = e => {
        const data = e.target.result
        const { header, results } = excel.read(data, 'array')
        const baseColumn = header.map(item => { return { column: item, key: item } })    
        dispatch(importMultipleCustomers(results)) 

    }
  }
  const handleImport = () => {
    importButton.current.click();
  }
  const handleDelete = () => {
    handleDeleteOpen()
  }
  
  const handleDeleteConfirm = async () => {
    // console.log("selected--->", selected)
    dispatch(deleteCustomers(selected));
    await sleep(1000);
    setSelected([])
    setDeleteOpen(false)
  }
  const handleRowClick = (e, row) => {
    setRowData(row)
    setEditOpen(true)
  }

  return (
    <div>
      <MDBox p={5}>
        <input ref={importButton} accept=".csv,.xlsx,.xls" type="file" style={{ display: "none" }} onChange={handleChange} />
        <Card>
          <MDBox p={3} lineHeight={1}  display="flex" justifyContent="space-between" alignItems="center">
            <MDTypography variant="h4" fontWeight="medium">
              Customer Table
            </MDTypography>
            <div>
            {selected.length > 0 && (
              <MDButton variant="gradient" color="error" sx={{ mr: 1 }} onClick={handleDelete}>
                <Icon sx={{ fontWeight: "bold" }}>delete</Icon>
                &nbsp;Delete {"(" + selected.length + ")"}
              </MDButton>
            )}
              <MDButton variant="gradient" color="success" sx={{ mr: 1 }} onClick={handleOpen}>
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;Add Customer
              </MDButton>
              <MDButton variant="gradient" color="info" onClick={handleImport}>
              <Icon sx={{ fontWeight: "bold" }}>upload</Icon>
                &nbsp;Import Customer
              </MDButton>
            </div>
          </MDBox>
          <DataTable table={customerTableData} canSearch hover rowClick={handleRowClick} selected={selected} setSelected={setSelected} />
        </Card>
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
        <CustomerAdd onClose={handleClose} />
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={editOpen}
        onClose={handleEditClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <CustomerEdit onClose={handleEditClose} data={rowData} allData={customerTableData.rows} editable={true}/>
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
    </div>
  );
}

export default CustomerPage;
