import React, { useEffect, useRef, useState } from "react";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Typography from "components/Typography/Typography";
import styles from "./MiniInboxCard.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MDBox from "components/MDBox";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { getInquiries, setCollapse } from "redux/Reducers/InboxReducer/inboxSlice";
import { takeCustomerById } from "redux/Reducers/CustomerReducer/customerSlice";
import { getMessages } from "redux/Reducers/InboxReducer/inboxSlice";
import { useSelector, useDispatch } from "react-redux";
import MDTypography from "components/MDTypography";
import Avatar from "@mui/material/Avatar";
import { style } from "@mui/system";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import FilterListIcon from '@mui/icons-material/FilterList';
import TabPanel from "components/Tabs/TabPanel.js";
import MDBadge from "components/MDBadge";
import MDBadgeDot from "components/MDBadgeDot";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const MiniInboxCard = ({selectedCustomerId}) => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { inquiries } = useSelector(({ inbox }) => inbox);
  const { c_refresh } = useSelector(({ inbox }) => inbox);
  const { selectedCustomer } = useSelector(({ customer }) => customer);
  const { refresher } = useSelector(({ customer }) => customer);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [searchKey, setSearchKey] = useState('');
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
  const handleSelectCustomer = (customer) => {
    navigate(`/inbox/${customer.id}`);
  }
  const handleSearch = (e) => {
    setSearchKey(e.target.value)
  }
  const handleCollapse = () => {
    dispatch(setCollapse())
  }

  useEffect(() => {
    dispatch(getInquiries());
    dispatch(takeCustomerById(selectedCustomerId))
    if (window.socket) {
      window.socket.removeListener("new_message");
      window.socket.on("new_message", (sms) => {
        dispatch(getInquiries());
        if (selectedCustomerId) {
          dispatch(getMessages(selectedCustomerId));
        }
      });
    }
  }, [selectedCustomerId, refresher, c_refresh]);
  useEffect(() => {
    if(selectedCustomer && selectedCustomer.status == 'New') {
      setValue(0)
    } else if (selectedCustomer && selectedCustomer.status == 'Progress') {
      setValue(1)
    } else if (selectedCustomer && selectedCustomer.status == 'Hold') {
      setValue(2)
    } else if (selectedCustomer && selectedCustomer.status == 'Completed') {
      setValue(3)
    } 
  }, [selectedCustomer])
  const filteredCustomers = (status) => {
    const new_inquiries = inquiries.filter((a) => a.sms.length || a.emails.length || a.facebook.length || a.webchat.length)
    return new_inquiries.filter((item) => {
      return item.status == status 
        
          // item.firstName.search(keyword) >= 0 ||
          // item.lastName.search(keyword) >= 0 ||
          // item.sms.find((sms) => (sms.body || '').search(keyword)) >= 0 ||
          // item.emails.find((email) => (email.content || '').search(keyword) >= 0)
        
    });
  }

  
  const filteredCustomersByKey = () => {
    const keyword = new RegExp(searchKey, 'i');
    return inquiries.filter((item) => {
      return (
        item.firstName.search(keyword) >= 0 ||
        item.lastName.search(keyword) >= 0 ||
        item.sms.find((sms) => (sms.body || '').search(keyword)) >= 0 ||
        item.emails.find((email) => (email.content || '').search(keyword) >= 0)
      )
    })
  }
  return (
    <Card sx={{pl: 1, pr: 1 , pt: 3, pb: 3}} className={styles.miniInbox}>
      <MDBox  mb="3">
        <MDBox className={styles.inputWrapper}>
          <input
            placeholder="Search..."
            type="text"
            className={styles.searchInput}
            onChange={handleSearch}
          />
          <IconButton
            color="secondary"
            onClick={handleCollapse}
          >
            <ChevronLeftIcon />
          </IconButton>
        </MDBox>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" className={styles.secondHeader} >
          {
            !searchKey ? 
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              sx={{mt:1}}
              className={styles.miniTabs}
            >
              <Tab label={'New(' + filteredCustomers('New').length + ')'} className={styles.miniTab} index={0} />
              <Tab label={'In progress(' + filteredCustomers('Progress').length + ')'} className={styles.miniTab} index={1} />
              <Tab label={'On hold(' + filteredCustomers('Hold').length + ')'} className={styles.miniTab} index={2} />
              <Tab label={'Completed(' + filteredCustomers('Completed').length + ')'} className={styles.miniTab} index={2} />
            </Tabs> : ""
          }
          {/* <IconButton
            color="success"
            >
            <MoreHorizIcon />
          </IconButton> */}
        </MDBox>
        {
          searchKey ? 
            <MDBox>
              {
                filteredCustomersByKey().length > 0 ?  filteredCustomersByKey().map((customer) => (
                  <MDBox className={selectedCustomer?.id == customer.id ? styles.miniInboxCustomer + ' ' + styles.miniInboxCustomerActive : styles.miniInboxCustomer} onClick={() => handleSelectCustomer(customer)} >
                    {
                      customer.avatar ? 
                      <Avatar src={customer.avatar} className={styles.miniAvatar} /> :
                      <Avatar {...stringAvatar(customer.firstName + " " + customer.lastName)} className={styles.miniAvatar} />
                    }
                    <MDBox className={styles.miniInboxContent}>
                      <MDBox display="flex" justifyContent="space-between" alignItems="center" >
                        <MDTypography variant="h6">{(customer.firstName + " " + customer.lastName).length > 15 ? (customer.firstName + " " + customer.lastName).slice(0, 15).concat("...") : (customer.firstName + " " + customer.lastName)}</MDTypography>
                        <p className={styles.miniInboxCustomerLatest}>
                          {
                            customer.latest.obj !== null ? 
                            moment(customer.latest.obj.createdDate).fromNow() : 
                            ""
                          }
                        </p>
                        
                      </MDBox>
                      <MDBox display="flex" justifyContent="space-between" >
                        <p className={styles.miniInboxCustomerLatest}>
                          {
                            customer.latest.obj !== null ? 
                            (
                              customer.latest.history_type == 'SMS'
                                ? (
                                customer.latest.obj.body.length > 30 ? customer.latest.obj.body.slice(0, 30).concat("...") : customer.latest.obj.body
                                )
                                : (
                                customer.latest.history_type == 'Email'
                                ? (
                                  customer.latest.obj.content && customer.latest.obj.content.replace(/<[^>]+>/g, '').length > 30 ? customer.latest.obj.content.replace(/<[^>]+>/g, '').slice(0, 30).concat("...") : customer.latest.obj.content.replace(/<[^>]+>/g, '')
                                ) 
                                : (
                                  customer.latest.history_type == 'Voice' && customer.latest.obj.dialCallStatus == 'no-answer'
                                  ? (
                                    ('Missed call from ' + customer.firstName + ' ' + customer.lastName).length > 30 ? ('Missed call from ' + customer.firstName + ' ' + customer.lastName).slice(0, 30).concat("...") : ('Missed call from ' + customer.firstName + ' ' + customer.lastName)
                                  )
                                  : (
                                    customer.latest.history_type == 'Messenger' 
                                    ? (
                                      customer.latest.obj.body.length > 30 ? customer.latest.obj.body.slice(0, 30).concat("...") : customer.latest.obj.body
                                    ) : 
                                      customer.latest.history_type == 'LiveChat' 
                                      ? (
                                        customer.latest.obj.body.length > 30 ? customer.latest.obj.body.slice(0, 30).concat("...") : customer.latest.obj.body
                                      ) : ""
                                  )
                                )
                                            
                                )
                                          
                            ) : ""
                          }
                        </p>
                        <MDBox>
                          <MDBadgeDot color={customer?.priority == "Low" ? "warning" : customer?.priority == "Medium" ? "success" : customer?.priority == "High" ? "error" : "secondary"} size="sm" className={styles.priorityBadge} />
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                )) : 
                <MDBox display="flex" justifyContent="center" alignItems="center" sx={{mt: "100px"}} >
                  <p>No Conversations</p>
                </MDBox>
              }
            </MDBox> : 
            <MDBox>
              <TabPanel value={value} index={0}>
                <MDBox>
                  {filteredCustomers('New').length ? filteredCustomers('New').map((customer) => (
                    <MDBox className={selectedCustomer?.id == customer.id ? styles.miniInboxCustomer + ' ' + styles.miniInboxCustomerActive : styles.miniInboxCustomer} onClick={() => handleSelectCustomer(customer)} >
                      {
                        customer.avatar ? 
                        <Avatar src={customer.avatar} className={styles.miniAvatar} /> :
                        <Avatar {...stringAvatar(customer.firstName + " " + customer.lastName)} className={styles.miniAvatar} />
                      }
                      <MDBox className={styles.miniInboxContent}>
                        <MDBox display="flex" justifyContent="space-between" alignItems="center" >
                          <MDTypography variant="h6">{(customer.firstName + " " + customer.lastName).length > 15 ? (customer.firstName + " " + customer.lastName).slice(0, 15).concat("...") : (customer.firstName + " " + customer.lastName)}</MDTypography>
                          <p className={styles.miniInboxCustomerLatest}>
                            {
                              customer.latest.obj !== null ? 
                              moment(customer.latest.obj.createdDate).fromNow() : 
                              ""
                            }
                          </p>
                          
                        </MDBox>
                        <MDBox display="flex" justifyContent="space-between" >
                          <p className={styles.miniInboxCustomerLatest}>
                          {
                            customer.latest.obj !== null ? 
                            (
                              customer.latest.history_type == 'SMS'
                                ? (
                                customer.latest.obj.body.length > 30 ? customer.latest.obj.body.slice(0, 30).concat("...") : customer.latest.obj.body
                                )
                                : (
                                customer.latest.history_type == 'Email'
                                ? (
                                  customer.latest.obj.content && customer.latest.obj.content.replace(/<[^>]+>/g, '').length > 30 ? customer.latest.obj.content.replace(/<[^>]+>/g, '').slice(0, 30).concat("...") : customer.latest.obj.content.replace(/<[^>]+>/g, '')
                                ) 
                                : (
                                  customer.latest.history_type == 'Voice' && customer.latest.obj.dialCallStatus == 'no-answer'
                                  ? (
                                    ('Missed call from ' + customer.firstName + ' ' + customer.lastName).length > 30 ? ('Missed call from ' + customer.firstName + ' ' + customer.lastName).slice(0, 30).concat("...") : ('Missed call from ' + customer.firstName + ' ' + customer.lastName)
                                  )
                                  : (
                                    customer.latest.history_type == 'Messenger' 
                                    ? (
                                      customer.latest.obj.body.length > 30 ? customer.latest.obj.body.slice(0, 30).concat("...") : customer.latest.obj.body
                                    ) : 
                                      customer.latest.history_type == 'LiveChat' 
                                      ? (
                                        customer.latest.obj.body.length > 30 ? customer.latest.obj.body.slice(0, 30).concat("...") : customer.latest.obj.body
                                      ) : ""
                                  )
                                )
                                            
                                )
                                          
                            ) : ""
                          }
                          </p>
                          <MDBox>
                            <MDBadgeDot color={customer?.priority == "Low" ? "warning" : customer?.priority == "Medium" ? "success" : customer?.priority == "High" ? "error" : "secondary"} size="sm" className={styles.priorityBadge} />
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  )) : 
                  <MDBox display="flex" justifyContent="center" alignItems="center" sx={{mt: "100px"}} >
                    <p>No Conversations</p>
                  </MDBox>
                  }
                </MDBox>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <MDBox>
                  {filteredCustomers('Progress').length > 0 ? filteredCustomers('Progress').map((customer) => (
                    <MDBox className={selectedCustomer?.id == customer.id ? styles.miniInboxCustomer + ' ' + styles.miniInboxCustomerActive : styles.miniInboxCustomer} onClick={() => handleSelectCustomer(customer)} >
                      {
                        customer.avatar ? 
                        <Avatar src={customer.avatar} className={styles.miniAvatar} /> :
                        <Avatar {...stringAvatar(customer.firstName + " " + customer.lastName)} className={styles.miniAvatar} />
                      }
                      <MDBox className={styles.miniInboxCustomerHistory}>
                        <MDTypography variant="h6">{(customer.firstName + " " + customer.lastName).length > 15 ? (customer.firstName + " " + customer.lastName).slice(0, 15).concat("...") : (customer.firstName + " " + customer.lastName)}</MDTypography>
                        <p className={styles.miniInboxCustomerLatest}>
                        {
                            customer.latest.obj !== null ? 
                            (
                              customer.latest.history_type == 'SMS'
                                ? (
                                customer.latest.obj.body.length > 30 ? customer.latest.obj.body.slice(0, 30).concat("...") : customer.latest.obj.body
                                )
                                : (
                                customer.latest.history_type == 'Email'
                                ? (
                                  customer.latest.obj.content && customer.latest.obj.content.replace(/<[^>]+>/g, '').length > 30 ? customer.latest.obj.content.replace(/<[^>]+>/g, '').slice(0, 30).concat("...") : customer.latest.obj.content.replace(/<[^>]+>/g, '')
                                ) 
                                : (
                                  customer.latest.history_type == 'Voice' && customer.latest.obj.dialCallStatus == 'no-answer'
                                  ? (
                                    ('Missed call from ' + customer.firstName + ' ' + customer.lastName).length > 30 ? ('Missed call from ' + customer.firstName + ' ' + customer.lastName).slice(0, 30).concat("...") : ('Missed call from ' + customer.firstName + ' ' + customer.lastName)
                                  )
                                  : (
                                    customer.latest.history_type == 'Messenger' 
                                    ? (
                                      customer.latest.obj.body.length > 30 ? customer.latest.obj.body.slice(0, 30).concat("...") : customer.latest.obj.body
                                    ) : 
                                      customer.latest.history_type == 'LiveChat' 
                                      ? (
                                        customer.latest.obj.body.length > 30 ? customer.latest.obj.body.slice(0, 30).concat("...") : customer.latest.obj.body
                                      ) : ""
                                  )
                                )
                                            
                                )
                                          
                            ) : ""
                          }
                        </p>
                      </MDBox>
                      <div>
                        <p className={styles.miniInboxCustomerLatest}>
                          {
                            customer.latest.obj !== null ? 
                            moment(customer.latest.obj.createdDate).fromNow() : 
                            ""
                          }
                        </p>
                        <MDBox>
                          <MDBadgeDot color={customer?.priority == "Low" ? "warning" : customer?.priority == "Medium" ? "success" : customer?.priority == "High" ? "error" : "secondary"} size="sm" className={styles.priorityBadge} />
                        </MDBox>
                      </div>
                    </MDBox>
                  )) : 
                  <MDBox display="flex" justifyContent="center" alignItems="center" sx={{mt: "100px"}} >
                    <p>No Conversations</p>
                  </MDBox>
                  }
                </MDBox>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <MDBox>
                  {filteredCustomers('Hold').length > 0 ? filteredCustomers('Hold').map((customer) => (
                    <MDBox className={selectedCustomer?.id == customer.id ? styles.miniInboxCustomer + ' ' + styles.miniInboxCustomerActive : styles.miniInboxCustomer} onClick={() => handleSelectCustomer(customer)} >
                      {
                        customer.avatar ? 
                        <Avatar src={customer.avatar} className={styles.miniAvatar} /> :
                        <Avatar {...stringAvatar(customer.firstName + " " + customer.lastName)} className={styles.miniAvatar} />
                      }
                      <MDBox className={styles.miniInboxCustomerHistory}>
                        <MDTypography variant="h6">{(customer.firstName + " " + customer.lastName).length > 15 ? (customer.firstName + " " + customer.lastName).slice(0, 15).concat("...") : (customer.firstName + " " + customer.lastName)}</MDTypography>
                        <p className={styles.miniInboxCustomerLatest}>
                        {
                            customer.latest.obj !== null ? 
                            (
                              customer.latest.history_type == 'SMS'
                                ? (
                                customer.latest.obj.body.length > 30 ? customer.latest.obj.body.slice(0, 30).concat("...") : customer.latest.obj.body
                                )
                                : (
                                customer.latest.history_type == 'Email'
                                ? (
                                  customer.latest.obj.content && customer.latest.obj.content.replace(/<[^>]+>/g, '').length > 30 ? customer.latest.obj.content.replace(/<[^>]+>/g, '').slice(0, 30).concat("...") : customer.latest.obj.content.replace(/<[^>]+>/g, '')
                                ) 
                                : (
                                  customer.latest.history_type == 'Voice' && customer.latest.obj.dialCallStatus == 'no-answer'
                                  ? (
                                    ('Missed call from ' + customer.firstName + ' ' + customer.lastName).length > 30 ? ('Missed call from ' + customer.firstName + ' ' + customer.lastName).slice(0, 30).concat("...") : ('Missed call from ' + customer.firstName + ' ' + customer.lastName)
                                  )
                                  : (
                                    customer.latest.history_type == 'Messenger' 
                                    ? (
                                      customer.latest.obj.body.length > 30 ? customer.latest.obj.body.slice(0, 30).concat("...") : customer.latest.obj.body
                                    ) : 
                                      customer.latest.history_type == 'LiveChat' 
                                      ? (
                                        customer.latest.obj.body.length > 30 ? customer.latest.obj.body.slice(0, 30).concat("...") : customer.latest.obj.body
                                      ) : ""
                                  )
                                )
                                            
                                )
                                          
                            ) : ""
                          }
                        </p>
                      </MDBox>
                      <div>
                        <p className={styles.miniInboxCustomerLatest}>
                          {
                            customer.latest.obj !== null ? 
                            moment(customer.latest.obj.createdDate).fromNow() : 
                            ""
                          }
                        </p>
                        <MDBox>
                          <MDBadgeDot color={customer?.priority == "Low" ? "warning" : customer?.priority == "Medium" ? "success" : customer?.priority == "High" ? "error" : "secondary"} size="sm" className={styles.priorityBadge} />
                        </MDBox>
                      </div>
                    </MDBox>
                  )) : 
                  <MDBox display="flex" justifyContent="center" alignItems="center" sx={{mt: "100px"}} >
                    <p>No Conversations</p>
                  </MDBox>
                  }
                </MDBox>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <MDBox>
                  {filteredCustomers('Completed').length > 0 ? filteredCustomers('Completed').map((customer) => (
                    <MDBox className={selectedCustomer?.id == customer.id ? styles.miniInboxCustomer + ' ' + styles.miniInboxCustomerActive : styles.miniInboxCustomer} onClick={() => handleSelectCustomer(customer)} >
                      {
                        customer.avatar ? 
                        <Avatar src={customer.avatar} className={styles.miniAvatar} /> :
                        <Avatar {...stringAvatar(customer.firstName + " " + customer.lastName)} className={styles.miniAvatar} />
                      }
                      <MDBox className={styles.miniInboxCustomerHistory}>
                        <MDTypography variant="h6">{(customer.firstName + " " + customer.lastName).length > 15 ? (customer.firstName + " " + customer.lastName).slice(0, 15).concat("...") : (customer.firstName + " " + customer.lastName)}</MDTypography>
                        <p className={styles.miniInboxCustomerLatest}>
                        {
                            customer.latest.obj !== null ? 
                            (
                              customer.latest.history_type == 'SMS'
                                ? (
                                customer.latest.obj.body.length > 30 ? customer.latest.obj.body.slice(0, 30).concat("...") : customer.latest.obj.body
                                )
                                : (
                                customer.latest.history_type == 'Email'
                                ? (
                                  customer.latest.obj.content && customer.latest.obj.content.replace(/<[^>]+>/g, '').length > 30 ? customer.latest.obj.content.replace(/<[^>]+>/g, '').slice(0, 30).concat("...") : customer.latest.obj.content.replace(/<[^>]+>/g, '')
                                ) 
                                : (
                                  customer.latest.history_type == 'Voice' && customer.latest.obj.dialCallStatus == 'no-answer'
                                  ? (
                                    ('Missed call from ' + customer.firstName + ' ' + customer.lastName).length > 30 ? ('Missed call from ' + customer.firstName + ' ' + customer.lastName).slice(0, 30).concat("...") : ('Missed call from ' + customer.firstName + ' ' + customer.lastName)
                                  )
                                  : (
                                    customer.latest.history_type == 'Messenger' 
                                    ? (
                                      customer.latest.obj.body.length > 30 ? customer.latest.obj.body.slice(0, 30).concat("...") : customer.latest.obj.body
                                    ) : 
                                      customer.latest.history_type == 'LiveChat' 
                                      ? (
                                        customer.latest.obj.body.length > 30 ? customer.latest.obj.body.slice(0, 30).concat("...") : customer.latest.obj.body
                                      ) : ""
                                  )
                                )
                                            
                                )
                                          
                            ) : ""
                          }
                        </p>
                      </MDBox>
                      <div>
                        <p className={styles.miniInboxCustomerLatest}>
                          {
                            customer.latest.obj !== null ? 
                            moment(customer.latest.obj.createdDate).fromNow() : 
                            ""
                          }
                        </p>
                        <MDBox>
                          <MDBadgeDot color={customer?.priority == "Low" ? "warning" : customer?.priority == "Medium" ? "success" : customer?.priority == "High" ? "error" : "secondary"} size="sm" className={styles.priorityBadge} />
                        </MDBox>
                      </div>
                    </MDBox>
                  )) : 
                  <MDBox display="flex" justifyContent="center" alignItems="center" sx={{mt: "100px"}} >
                    <p>No Conversations</p>
                  </MDBox>
                  }
                </MDBox>
              </TabPanel>
            </MDBox>
        }
        
      </MDBox>
      
    </Card>
  );
};

export default MiniInboxCard;
