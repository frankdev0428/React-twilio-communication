      import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TabPanel from "components/Tabs/TabPanel.js";
// import Tab from "components/Tabs/Tab.js";
// import Tabs from "components/Tabs/Tabs.js";
import { getInquiries } from "redux/Reducers/InboxReducer/inboxSlice";
import { scrollToBottom } from "utils/helpers/helpers";
import Notification from "components/Notification/Notification";
import InboxMessageCard from "components/Cards/InboxMessageCard/InboxMessageCard.js";
import styles from "./InboxListPage.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MDBox from "components/MDBox";

const InboxListPage = () => {
  const [value, setValue] = useState(0);
  const { inquiries } = useSelector(({ inbox }) => inbox);
  const filteredCustomers = inquiries.filter((a) => a.sms.length || a.emails.length || a.facebook.length || a.webchat)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "",
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleGoToMessage = (customer) => {
    navigate(`/inbox/${customer.id}`);
  };
  const filteredCustomersByStatus = (status) => {
    return filteredCustomers.filter((item) => {
      return item.status == status 
    });
  }
  useEffect(() => {
    dispatch(getInquiries());

    if (window.socket) {
      window.socket.removeListener("new_message");
      window.socket.on("new_message", (sms) => {
        dispatch(getInquiries());
      });
    }
  }, []);

  return (
    <Container maxWidth="xl">
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>My Inbox</h1>
        <div className={styles.tabsWrapper}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label={'New(' + filteredCustomersByStatus('New').length + ') '} index={0} sx={{mr: 1}} />
            <Tab label={'In progress(' + filteredCustomersByStatus('Progress').length + ') '}  index={1} sx={{mr: 1}} />
            <Tab label={'On hold(' + filteredCustomersByStatus('Hold').length + ') '} index={2} sx={{mr: 1}} />
            <Tab label={'Completed(' + filteredCustomersByStatus('Completed').length + ') '} index={2} sx={{mr: 1}} />
          </Tabs>
          {/* <div className={styles.navigationBtnWrapper}>
            <IconButton
              color="secondary"
              aria-label="upload picture"
              component="label"
              className={styles.navigationBtn}
            >
              <KeyboardArrowUpIcon color="secondary" />
            </IconButton>
            <IconButton
              color="secondary"
              aria-label="upload picture"
              component="label"
              className={styles.navigationBtn}
            >
              <KeyboardArrowDownIcon style={{ color: "gray" }} />
            </IconButton>
          </div> */}
        </div>
      </div>
      <div className={styles.tabsPanelWrapper}>
        <TabPanel value={value} index={0}>
          {filteredCustomersByStatus('New').length ? filteredCustomersByStatus('New').map((customer) => (
            <InboxMessageCard
              customer={customer}
              key={customer.id}
              handleCardClick={() => handleGoToMessage(customer)}
            /> 
          )) : 
          <MDBox display="flex" justifyContent="center" alignItems="center" sx={{mt: "200px"}} >
            <p>No Customers</p>
          </MDBox>
          }
        </TabPanel>
        <TabPanel value={value} index={1}>
          {filteredCustomersByStatus('Progress').length ? filteredCustomersByStatus('Progress').map((customer) => (
            <InboxMessageCard
              customer={customer}
              key={customer.id}
              handleCardClick={() => handleGoToMessage(customer)}
            /> 
          )) : 
          <MDBox display="flex" justifyContent="center" alignItems="center" sx={{mt: "200px"}} >
            <p>No Customers</p>
          </MDBox>
          }
        </TabPanel>
        <TabPanel value={value} index={2}>
          {filteredCustomersByStatus('Hold').length ? filteredCustomersByStatus('Hold').map((customer) => (
            <InboxMessageCard
              customer={customer}
              key={customer.id}
              handleCardClick={() => handleGoToMessage(customer)}
            /> 
          )) : 
          <MDBox display="flex" justifyContent="center" alignItems="center" sx={{mt: "200px"}} >
            <p>No Customers</p>
          </MDBox>
          }
        </TabPanel>
        <TabPanel value={value} index={3}>
          {filteredCustomersByStatus('Completed').length ? filteredCustomersByStatus('Completed').map((customer) => (
            <InboxMessageCard
              customer={customer}
              key={customer.id}
              handleCardClick={() => handleGoToMessage(customer)}
            /> 
          )) : 
          <MDBox display="flex" justifyContent="center" alignItems="center" sx={{mt: "200px"}} >
            <p>No Customers</p>
          </MDBox>
          }
        </TabPanel>
      </div>
      {notification.open && (
        <Notification
          open={notification.open}
          message={notification.message}
          alert
          alertType={notification.type}
        />
      )}
    </Container>
  );
};

export           default InboxListPage;
