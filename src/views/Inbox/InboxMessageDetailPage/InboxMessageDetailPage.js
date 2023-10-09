import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getMessages } from "redux/Reducers/InboxReducer/inboxSlice";
import { setHistory, setLoading, setCollapse } from "redux/Reducers/InboxReducer/inboxSlice";
import { scrollToBottom } from "utils/helpers/helpers";
import CustomerInfoCard from "components/Cards/CustomerInfoCard/CustomerInfoCard";
import DetailCard from "components/Cards/DetailCard/DetailCard";
import MessageItemCard from "components/Cards/CardsLayout/MessageItemCard";
import EmailItemCard from "components/Cards/CardsLayout/EmailItemCard";
import VoiceItemCard from "components/Cards/CardsLayout/VoiceItemCard"
import MiniInboxCard from "components/Cards/MiniInboxCard/MiniInboxCard";
import FacebookCard from "components/Cards/CardsLayout/FacebookCard";
import LiveChatCard from "components/Cards/CardsLayout/LiveChatCard";
import InboxFooter from "components/InboxFooter/InboxFooter";
import Notification from "components/Notification/Notification";
import styles from "./InboxMessageDetailPage.module.css";
import { useParams } from "react-router-dom";
import MDBox from "components/MDBox";
import CircularProgress from '@mui/material/CircularProgress';
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Autocomplete from "@mui/material/Autocomplete";
import MDInput from "../../../components/MDInput";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { takeCustomerById } from "redux/Reducers/CustomerReducer/customerSlice";
import { setStatusByCustomer } from "redux/Reducers/CustomerReducer/customerSlice";
import { setDepartmentByCustomer } from "redux/Reducers/CustomerReducer/customerSlice";
import { setAgentByCustomer } from "redux/Reducers/CustomerReducer/customerSlice";
import { setPriorityByCustomer } from "redux/Reducers/CustomerReducer/customerSlice";
import MDBadgeDot from "components/MDBadgeDot";
import cx from "classnames";
import FilterListIcon from '@mui/icons-material/FilterList';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { getInquiries } from "redux/Reducers/InboxReducer/inboxSlice";
import moment from 'moment'

const InboxMessageDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { history } = useSelector(({ inbox }) => inbox);
  // console.log("history---->", history)
  const { isLoading } = useSelector(({ inbox }) => inbox);
  const { customer } = useSelector(({ inbox }) => inbox);
  const { collapse } = useSelector(({ inbox }) => inbox);
  const { commType } = useSelector(({ inbox }) => inbox);
  const { selectedCustomer } = useSelector(({ customer }) => customer);
  const location = useLocation();
  const scrollContainer = useRef(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "",
  });

  // const statusOptions = [{label: 'New', id: 0}, {label : 'Progress', id: 1},{label: 'Hold', id: 2} , {label: 'Completed', id: 3}]
  const statusOptions = ['New', 'Progress', 'Hold', 'Completed'];
  const [status, setStatus] = useState('');
  const departmentOptions = ['Marketing', 'Sales', 'Support']
  const [department, setDepartment] = useState('')
  const priorityOptions = ['Low', 'Medium', 'High']
  const [priority, setPriority] = useState('')
  const agentOptions = ['You']
  const [agent, setAgent] = useState('')

  useEffect(() => {
    setStatus(selectedCustomer?.status)
    setDepartment(selectedCustomer?.department)
    setPriority(selectedCustomer?.priority)
    setAgent(selectedCustomer?.agent)
  }, [selectedCustomer])
  const handleAccept = () => {
    setStatus('Progress')
    dispatch(setStatusByCustomer({id: id, status: 'Progress'}))
  }
  const handleComplete = () => {
    setStatus('Completed')
    dispatch(setStatusByCustomer({id: id, status: 'Completed'}))
  }
  // const handleStatusChange = (e) => {
  //   setStatus(e.target.value)
  //   dispatch(setStatusByCustomer({id: id, status: e.target.value}))
  // };
  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value)
    dispatch(setDepartmentByCustomer({id: id, department: e.target.value}))
  };
  const handlePriorityChange = (e) => {
    setPriority(e.target.value)
    dispatch(setPriorityByCustomer({id: id, priority: e.target.value}))
  };
  const handleAgentChange = (e) => {
    setAgent(e.target.value)
    dispatch(setAgentByCustomer({id: id, agent: e.target.value}))
  };
  const handleCollapse = () => {
    dispatch(setCollapse())
  }
  useEffect(() => {
    return ( ) => {
      dispatch(setHistory())
      dispatch(setLoading(true))
    }
  }, [])

  useEffect(() => {
    dispatch(getMessages(id));
    dispatch(takeCustomerById(id))
    scrollToBottom(scrollContainer);
    if (window.socket) {
      window.socket.removeListener("new_message");
      window.socket.on("new_message", (sms) => {
        dispatch(getInquiries());
        dispatch(getMessages(id));
      });
    }
  }, [id]);

  useEffect(() => {
    scrollToBottom(scrollContainer)
    if(history.length) {
      dispatch(setLoading(false))
      console.log("history---->", history)
    }
      // setTimeout(() => {
      //   scrollToBottom(scrollContainer)
      // }, 1000);
    
    // dispatch(getMessages(userId));
  }, [history]);

  // useEffect(() => {

  // }, [])
 
  return (
    <div>
      <div className={styles.container}>
        <div className={cx(styles.collapseBtn, collapse == true ? styles.collapseBtnActive : "")}>
          <IconButton
            color="secondary"
            onClick={handleCollapse}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
        <div className={cx(styles.miniInboxSidebar, collapse == true ? styles.miniInboxSidebarCollapse : "")}>
          <MiniInboxCard  selectedCustomerId={id}  />
        </div>
        <div className={cx(styles.interactionCenterbar, collapse == true ? styles.interactionCenterbarCollapse : "")}>
          <MDBox className={styles.secondHeader}>
            {/* <MDTypography variant="h5">{customer ? customer.firstName + ' ' + customer.lastName : ""}</MDTypography>  */}
            <MDBox className={styles.subHeaderButtons}>
              {/* <Select
                value={status}
                onChange={handleStatusChange}
                size="small"
                sx={{mr: 1}}
                className={styles.subHeaderButton}
              >
                <MenuItem value={'New'}>New</MenuItem>
                <MenuItem value={'Progress'}>Progress</MenuItem>
                <MenuItem value={'Hold'}>Hold</MenuItem>
                <MenuItem value={'Completed'}>Completed</MenuItem>
              </Select> */}
              <Select
                value={priority}
                onChange={handlePriorityChange}
                size="small"
                sx={{mr: 1}}
                className={styles.subHeaderButton}
              >
                <MenuItem value={'Low'}>Low</MenuItem>
                <MenuItem value={'Medium'}>Medium</MenuItem>
                <MenuItem value={'High'}>High</MenuItem>
              </Select>
              <Select
                value={department}
                onChange={handleDepartmentChange}
                size="small"
                sx={{mr: 1}}
                className={styles.subHeaderButton}
              >
                <MenuItem value={'Marketing'}>Marketing</MenuItem>
                <MenuItem value={'Sales'}>Sales</MenuItem>
                <MenuItem value={'Support'}>Support</MenuItem>
              </Select>
              <Select
                value={agent}
                onChange={handleAgentChange}
                size="small"
                sx={{mr: 1}}
                className={styles.subHeaderButton}
              >
                <MenuItem value={'You'}>You</MenuItem>
              </Select> 
              {/* <IconButton
                color="success"
                >
                <MoreHorizIcon />
              </IconButton> */}
            </MDBox>
            <MDBox>
              <MDButton color="success" onClick={handleComplete} disabled={selectedCustomer?.status == 'Completed'} >Completed</MDButton>
            </MDBox>
          </MDBox>
          <div className={cx(styles.conversationContainer, commType == 'Email' ? styles.conversationContainerEmail : "")} ref={scrollContainer}>
            {
              isLoading ? 
                <div className={styles.loading} >
                  <CircularProgress color="success" /> 
                </div> : (
                history?.map((item) => (
                  item.history_type === 'SMS' ?
                  <MessageItemCard
                    key={item.sid || item.id}
                    message={item}
                    type={item.type ? "received" : "sent"}
                  /> : 
                  item.history_type === 'Voice' && item.records.length ?
                    item.records.map((record) => (
                      record.mediaUrl ? 
                        <VoiceItemCard
                          voice={record.mediaUrl}
                          missed={record.dialCallStatus}
                          createdDate={item.createdDate}
                          type={item.type ? "received" : "sent"}
                        /> : ""
                    )) : 
                  item.history_type === 'Voice' && item.dialCallStatus === 'no-answer' ? 
                  <MDBox className={styles.missedCall} sx={{mt: 3}}>
                    <MDBox className={styles.missedCallContent}>
                      <MDBox className={styles.missedCallSubContent}>
                        <p>{"Missed call from " + customer.firstName + ' ' + customer.lastName}</p> 
                        <p>{moment(item.updatedDate).format('MM/DD/YYYY h:mm A')}</p>
                        {/* <p>{moment(item.updatedDate).fromNow()}</p> */}
                      </MDBox>
                    </MDBox>
                    <p className={styles.missedCallBorder}></p>
                  </MDBox> :
                  item.history_type === 'Email' ? 
                  <EmailItemCard
                    email={item}
                    type={item.type ? "received" : "sent"}
                  /> :
                  item.history_type === 'Messenger' ? 
                  <FacebookCard
                      facebook={item}
                      type={item.type ? "received" : "sent"}
                  /> : 
                  item.history_type === 'LiveChat' ? 
                  <LiveChatCard
                      webchat={item}
                      type={item.type ? "received" : "sent"}
                  /> : ""

                ))
              )
            }
          </div>
          <div className={styles.footerWrapper}>
            {
              status == 'New' ? 
              <MDBox display="flex" justifyContent="center" alignItems="center" sx={{mt:2}}>
                <MDButton color="success" sx={{width: 200}} onClick={handleAccept} >Accept Conversation</MDButton> 
              </MDBox> 
              : 
              <InboxFooter />
            }
          </div>
        </div>
        <div className={styles.customerInfoSidebar}>
          <CustomerInfoCard selectedCustomerId={id} />
        </div>
      </div>
    
      {notification.open && (
        <Notification
          open={notification.open}
          message={notification.message}
          alert
          alertType={notification.type}
        />
      )}
    </div>
  );
};

export default InboxMessageDetailPage;
