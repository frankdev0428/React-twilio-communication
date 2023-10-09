import React, { useEffect, useRef, useState } from "react";
import { getInquiries } from "redux/Reducers/InboxReducer/inboxSlice";
import { takeCustomerById } from "redux/Reducers/CustomerReducer/customerSlice";
import { getHelpContent, addCategory, addAnswer, setQuestions, deleteSelectedCategory, editCategory, setSelectedCategoryName, editQA, deleteQA, setFilteredQA } from 'redux/Reducers/HelpReducer/helpSlice'
import { getUsers }  from 'redux/Reducers/UserReducer/userSlice'
import { updateEmail, updatePhone, updateName, updateAvatar } from 'redux/Reducers/CustomerReducer/customerSlice'
import { getMessages } from "redux/Reducers/InboxReducer/inboxSlice";
import { useSelector, useDispatch } from "react-redux";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import styles from "./CustomerInfoCard.module.css";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import CustomerEdit from "views/Customer/CustomerEdit/index";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "components/Tabs/TabPanel.js";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';      
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DescriptionIcon from '@mui/icons-material/Description';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import EditIcon from '@mui/icons-material/Edit';
import MDInput from "components/MDInput";
import DoneIcon from '@mui/icons-material/Done';
import UserChatCard from 'components/Cards/CustomerInfoCard/UserChatCard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import SortIcon from '@mui/icons-material/Sort';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Snackbar from '@mui/material/Snackbar';
import FilteredQA from './FilteredQA'
import moment from "moment";
import Badge from '@mui/material/Badge';
import MDBadge from "components/MDBadge";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import { TroubleshootTwoTone } from "@mui/icons-material";
import SimpleFileUpload from 'react-simple-file-upload'
import productImg from 'assets/img/product.jpg'
import MDAvatar from "components/MDAvatar";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


const CustomerInfoCard = ({selectedCustomerId}) => {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const [editOpen, setEditOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [categoryEditOpen, setCategoryEditOpen] = useState(false);
  const [categoryDeleteOpen, setCategoryDeleteOpen] = useState(false);
  const [answerOpen, setAnswerOpen] = useState(false)
  const [answerEditOpen, setAnswerEditOpen] = useState([])
  const [selectedEditQA, setSelectedEditQA] = useState(null)
  const handleEditClose = () => setEditOpen(false);
  const { content } = useSelector(({ help }) => help);
  const { refresher } = useSelector(({ help }) => help);
  const { questions } = useSelector(({ help }) => help);
  const { selectedCategoryName } = useSelector(({ help }) => help);
  const { users } = useSelector(({ user }) => user);
  console.log(users)
  const { totalUnread } = useSelector(({ user }) => user);
  const { inquiries } = useSelector(({ inbox }) => inbox);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [open, setOpen] = useState([]);
  const [newCategory, setNewCategory] = useState('')
  const [newAnswer, setNewAnswer] = useState([])
  const [newQuestion, setNewQuestion] = useState([])
  const [searchKey, setSearchKey] = useState('')
  const [messageSearchKey, setMessageSearchKey] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null);
  const categorySettingOpen = Boolean(anchorEl);
  const [QADeleteOpen, setQADeleteOpen] = useState(false)
  const [emailEdit, setEmailEdit] = useState(false)
  const [phoneEdit, setPhoneEdit] = useState(false)
  const [nameEdit, setNameEdit] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newName, setNewName] = useState('')
  const [newMessage, setNewMessage] = useState(false)
  const [internalUsers, setInternalUsers] = useState([])
  const uploadKey = process.env.REACT_APP_SIMPLE_UPLOAD_API_KEY;
  // const [uploadRef, setRef] = useState(null)
  const handleCategorySettingClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleHelpChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [copyOpen, setCopyOpen] = useState(false)

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
  
  function helpCenterAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      }
    };
  }
  const handleClick = (index) => {
    const newOpen = [...open];
    newOpen[index] = !newOpen[index]
    // setAnswerEditOpen(false)
    for(var i = 0; i < newOpen.length; i++) {
      if(i === index) continue;
      newOpen[i] = false
    }
    setOpen(newOpen);
  };
  const handleOnChangeNewAnswer = (value, index) => {
    const answer = [...newAnswer]
    answer[index] = value
    setNewAnswer(answer)
  }
  const handleOnChangeNewQuestion = (value, index) => {
    const question = [...newQuestion]
    question[index] = value
    setNewQuestion(question)
  }
  const { selectedCustomer } = useSelector(({ customer }) => customer);
  console.log("selectedCustomer---->", selectedCustomer)
  const handleSelectCategory = (category) => {
    setSelectedCategory(category)
    setCategoryOpen(false)
  }
  const handleSelectedQuestion = (question) => {
    setSelectedQuestion(question)
  }
  const handleRemoveCategory = () => {
    setSelectedCategory(null)
    setAnswerOpen(false)
    setOpen([])
    setAnswerEditOpen([])
    dispatch(getUsers())
  }
  const handleDeleteCategory = () => {
    dispatch(deleteSelectedCategory(selectedCategory.id))
    setCategoryDeleteOpen(false)
    setSelectedCategory(null)
    setAnchorEl(null)
  }
  const handleDeleteQA = (id) => {
    dispatch(deleteQA(id))
    setQADeleteOpen(false)
  }
  const handleRemoveQuestion = () => {
    setSelectedQuestion(null)
    
  }
  const handleCategory = (e) => {
    setNewCategory(e.target.value)
  }
  const handleNewCategory = () => {
    dispatch(addCategory(newCategory))
    setCategoryOpen(false)
  }
  const handleEditCategory = () => {
    dispatch(editCategory({id: selectedCategory.id, name: newCategory}))
    setCategoryEditOpen(false)
  }
  const handleEditQuestionAnswer = (index) => {
    dispatch(editQA({id: selectedEditQA.id, question: newQuestion[index], answer: newAnswer[index]}))
    setAnswerEditOpen([])
  }
  const handleNewAnswer = () => {
    setAnswerOpen(false)
    dispatch(addAnswer({categoryId: selectedCategory.id, question: newQuestion, answer: newAnswer}))
  }
  const handleSearch = (e) => {
    setSearchKey(e.target.value)
  }
  const handleMessageSearch = (e) => {
    setMessageSearchKey(e.target.value)
  }
  const handleCategoryEdit = () => {
    setCategoryEditOpen(true)
    setAnswerEditOpen([])
    
  }
  const filteredQAByKey = () => {
    if (!content) {
      return []
    }
    const totalQuestions = []
    for(var i = 0; i < content.length; i++) {
      totalQuestions.push(...content[i].questions)
    }
    const keyword = new RegExp(searchKey, 'i');
    
    const filteredQA = totalQuestions.filter((item) => {
        return (
          item.question.search(keyword) >= 0 ||
          item.answer.search(keyword) >= 0
        )
      })
    return filteredQA;
    
  }
  const handleCopy = (answer) => {
    setCopyOpen(true)
    navigator.clipboard.writeText(answer)
  }
  const handleEditQA = (qa, index) => {
    setSelectedEditQA(qa)
    // setAnswerEditOpen(true)
    setCategoryOpen(false)
    setAnswerOpen(false)
    setCategoryEditOpen(false)
    
    const newOpen = [...answerEditOpen];
    newOpen[index] = !newOpen[index]
    for(var i = 0; i < newOpen.length; i++) {
      if(i === index) continue;
      newOpen[i] = false
    }
    setAnswerEditOpen(newOpen);
    const answer = [...newAnswer]
    answer[index] = qa.answer
    setNewAnswer(answer)
    const question = [...newQuestion]
    question[index] = qa.question
    setNewQuestion(question)
   
  }

  const handleNewAnswerOpen = () => {
    setAnswerEditOpen([])
    setCategoryOpen(false)
    setAnswerOpen(true)
    setCategoryEditOpen(false)
  }
  const handleLoseFocusEmail = () => {
    setEmailEdit(false)
    dispatch(updateEmail({email: newEmail, id: selectedCustomer.id}))
  }
  const handleLoseFocusPhone = () => {
    setPhoneEdit(false)
    dispatch(updatePhone({phone: newPhone, id: selectedCustomer.id}))
  }
  const handleLoseFocusName = () => {
    setNameEdit(false)
    dispatch(updateName({name: newName, id: selectedCustomer.id}))
  }
  const handleSetNewMessage = () => {
    setNewMessage(!newMessage)
    setMessageSearchKey('')
  }
  function handleFile(url){
    dispatch(updateAvatar({avatar: url, id: selectedCustomer.id}))
  }
  useEffect(() => {
    if (!selectedCategory) {
      return;
    }
    dispatch(setQuestions(selectedCategory.questions))
    const arr = new Array(selectedCategory.questions.length).fill(false);
    setOpen(arr)
    setAnswerEditOpen(arr)
  }, [selectedCategory])
  useEffect(() => {
    dispatch(getHelpContent());
    dispatch(getUsers())
    if (window.socket) {
      window.socket.removeListener("new_chat");
      window.socket.on("new_chat", (sms) => {
        dispatch(getUsers())
      });
    }
  }, [])
  useEffect(() => {
    dispatch(getHelpContent());
  }, [refresher])
  useEffect(() => {
    if (selectedCategory) {
      dispatch(setSelectedCategoryName(selectedCategory.name))
    }
  }, [selectedCategory])
 
  useEffect(() => {
    if(categoryEditOpen) {
      setNewCategory(selectedCategory.name)
    }
  }, [categoryEditOpen])

  useEffect(() => {
    const filtered = filteredQAByKey()
    dispatch(setFilteredQA(filtered))
  }, [searchKey])

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
  }, [selectedCustomerId]);

  useEffect(() => {
    if(selectedCustomer) {
      setNewEmail(selectedCustomer.email)
      setNewPhone(selectedCustomer.number)
      setNewName(selectedCustomer.firstName + ' ' + selectedCustomer.lastName)
    }
  }, [selectedCustomer])

  useEffect(() => {
    if(users?.length) {
      setInternalUsers(users.filter(user => user.latest))
    }
  }, [users])
  return (
    <div>
      <Card className={styles.rightCustomerInfo}>
        <MDBox className={styles.rightCustomerInfoWrapper}>
          <TabPanel value={value} index={0}>
            <MDBox display="flex" justifyContent="space-between" alignItems="center" className={styles.customerCardWrapper} sx={{ml: 2}}>
              <h3>Overview</h3>
              <MDButton variant="text" color="success" size="small" onClick={() => setEditOpen(true)} disabled={!selectedCustomer} >Merge</MDButton>
            </MDBox>
            <MDBox display="flex" justifyContent="center" alignItems="center"  className={styles.customerAvatarWrapper}>
              {
                selectedCustomer?.avatar ? 
                <Avatar src={selectedCustomer.avatar} className={styles.customerAvatar} /> : 
                <Avatar {...stringAvatar(selectedCustomer?.firstName + " " + selectedCustomer?.lastName)} className={styles.customerAvatar} />
              }
            </MDBox>
            <MDBox>
              <MDBox display="flex" alignItems="center" sx={{mb: 1}} className={styles.everyDetailWrapper}>
                <PersonIcon sx={{mr: 1, ml: 3}} color="secondary" />
                {
                  nameEdit ? 
                  <MDInput value={newName} onChange={(e) => setNewName(e.target.value)} onBlur={handleLoseFocusName} /> : 
                  <MDTypography variant="p" className={styles.everyDetail} onClick={() => setNameEdit(true)} >{selectedCustomer ? selectedCustomer?.firstName + " " + selectedCustomer?.lastName : ""}</MDTypography>
                }
              </MDBox>
              <MDBox display="flex"  sx={{mb: 1}}>
                <LocationOnIcon  sx={{mr: 1, ml: 3}} color="secondary" />
                <MDBox sx={{ml: 0.5}}> 
                  {
                    (!selectedCustomer?.city || selectedCustomer?.city == 'location')  ?  "Location" : 
                    <>
                      <MDBox variant="p">{selectedCustomer && selectedCustomer.street ? selectedCustomer.street : ""}</MDBox>
                      <MDTypography variant="p">{selectedCustomer ? selectedCustomer.city + ", " + selectedCustomer.state : ""}</MDTypography>
                    </>
                  }
                </MDBox>
              </MDBox>
              <MDBox display="flex" alignItems="center" sx={{mb: 1}} className={styles.everyDetailWrapper}>
                <EmailIcon sx={{mr: 1, ml: 3}} color="secondary" />
                {
                  emailEdit ? 
                  <MDInput value={newEmail} onChange={(e) => setNewEmail(e.target.value)} onBlur={handleLoseFocusEmail} /> : 
                  <MDTypography variant="p" className={styles.everyDetail} onClick={() => setEmailEdit(true)}>{selectedCustomer ? selectedCustomer.email : ""}</MDTypography>
                }
              </MDBox>
              <MDBox display="flex" alignItems="center" sx={{mb: 1}} className={styles.everyDetailWrapper}>
                <PhoneIcon sx={{mr: 1, ml: 3}} color="secondary" />
                {
                  phoneEdit ? 
                  <MDInput value={newPhone} onChange={(e) => setNewPhone(e.target.value)} onBlur={handleLoseFocusPhone} /> : 
                  <MDTypography variant="p" className={styles.everyDetail} onClick={() => setPhoneEdit(TroubleshootTwoTone)} >{selectedCustomer ? "(" + selectedCustomer.number.slice(2, 5) + ") " + selectedCustomer.number.slice(5, 8) + "-" + selectedCustomer.number.slice(8) : ""}</MDTypography>
                }
              </MDBox>
              <MDBox className={styles.upload}>
                {/* <MDBox onClick={() => alert()} ></MDBox> */}
                <SimpleFileUpload
                  apiKey={uploadKey}
                  onSuccess={handleFile}
                  width={100}
                  height={100}
                />
              </MDBox>
            </MDBox>
            {
              selectedCustomer?.hdOrders.map((order) => (
                <Card sx={{m:3}}>
                  <MDBox sx={{p: 2}}>
                    <MDBox display="flex" justifyContent="space-between">
                      <MDBox display="flex" alignItems="center">
                        <MDBox>
                          <MDAvatar variant="rounded" src={order.url} sx={{width: 80, height: 80, mr: 2}} />
                        </MDBox>
                        <MDBox>
                          <MDBox sx={{lineHeight: "1"}} ><MDTypography  variant="p" className={styles.productTitleFont} sx={{color: 'black'}}>{order.address}</MDTypography></MDBox>
                          <MDBox sx={{lineHeight: "1"}}><MDTypography  variant="p" className={styles.productFont}>{order.city + ', ' + order.state + ' ' + order.zip}</MDTypography></MDBox>
                          <MDBox sx={{lineHeight: "1"}}><MDTypography  variant="p" className={styles.productFont}>Appointment: {moment(order.created).format('M/D/YY h:mm A')}</MDTypography></MDBox>
                          <MDBox sx={{lineHeight: "1"}}><MDTypography  variant="p" className={styles.productAssignFont} >Assigned To: {selectedCustomer.firstName + ' ' + selectedCustomer.lastName}</MDTypography></MDBox>
                        </MDBox>
                      </MDBox>
                      <MDBox>
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      </MDBox>
                    </MDBox>
                    <MDBox sx={{mt: 2}}>
                      {
                        <>
                          {
                            JSON.parse(order.tasks).map((item) => (
                              <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                <MDBox><MDTypography variant="p">{item.name}</MDTypography></MDBox>
                                <MDBox><MDTypography variant="p">${item.memberpay}</MDTypography></MDBox>
                              </MDBox>
                            ))  
                          }
                          <MDBox display="flex" justifyContent="space-between" alignItems="center">
                            <MDBox><MDTypography variant="p">Tax</MDTypography></MDBox>
                            <MDBox><MDTypography variant="p">${order.taxamount}</MDTypography></MDBox>
                          </MDBox>
                          <MDBox display="flex" justifyContent="space-between" alignItems="center">
                            <MDBox><MDTypography variant="p">Total + Tax</MDTypography></MDBox>
                            <MDBox><MDTypography variant="p" color={JSON.parse(order.payments)[0].amount == order.total ? 'success' : 'error' }>${order.total}</MDTypography></MDBox>
                          </MDBox>
                        </>
                      }
                    </MDBox>
                    {/* <MDBox sx={{mt: 1}}>
                      <MDBox sx={{lineHeight: "1"}}><MDTypography variant="p" className={styles.productNote}>Notes: Gate Code is #4523. Please be careful of dog in backyard.</MDTypography></MDBox>
                    </MDBox>
                    <MDBox display="flex" justifyContent="space-around" alignItems="center" sx={{mt: 1}}>
                      <MDButton variant="contained" className={styles.productBtn}>Cancel</MDButton>
                      <MDButton variant="contained" className={styles.productBtn}>Reschedule</MDButton>
                    </MDBox> */}
                  </MDBox>
                </Card>
              ))
            }
            
            
          </TabPanel>
      
          <TabPanel value={value} index={1}>
            {
              !selectedCategory ? 
                <MDBox sx={{ml: 2, mt: 2}} display="flex" justifyContent="space-between" alignItems="center" >
                  <h3>Help Center</h3>
                  {/* <IconButton>
                    <SortIcon color="success" sx={{mr:2}} />
                  </IconButton> */}
                </MDBox>  : 
              ""
            }
            <MDBox display="flex" justifyContent="space-between" alignItems="center" className={styles.inputWrapper} >
              {
                selectedCategory ? 
                <MDBox display="flex" alignItems="center" >
                  <IconButton
                    color="secondary"
                    sx={{mt: 1}}
                    onClick={handleRemoveCategory}
                  >
                    <ChevronLeftIcon />
                  </IconButton> 
                </MDBox> :
                  ""
              }
              {
                !selectedCategory ? 
                  <input
                    placeholder="Search..."
                    type="text"
                    className={styles.searchInput}
                    onChange={handleSearch}
                  /> : 
                  <MDBox display="flex" alignItems="center" justifyContent="space-between" sx={{ flexGrow: 1}} >
                    <MDBox display="flex" alignItems="center" sx={{ ml: 2}}>
                      <ListItemIcon>
                        <Avatar {...helpCenterAvatar(selectedCategory.name)} variant="rounded">{selectedCategory.name[0]}</Avatar>
                      </ListItemIcon>
                      {
                        categoryEditOpen ? 
                         
                            <MDBox>
                              <MDBox className={styles.categoryInputWrapper}>
                                <input
                                  placeholder="Type category..."
                                  type="text"
                                  className={styles.categoryInput}
                                  onChange={handleCategory}
                                  value={newCategory}
                                />
                              </MDBox>
                              <MDBox display="flex" justifyContent="center">
                                <IconButton disabled={newCategory ? false : true} onClick={handleEditCategory} sx={{pl: 0, pt: 0, pr: 1, pb: 0}} >
                                  <DoneIcon color={newCategory ? 'success' : ''} />
                                </IconButton>
                                <IconButton  onClick={() => setCategoryEditOpen(false)} sx={{pl: 1, pt: 0, pr: 0, pb: 0}}>
                                  <CloseIcon color="error" />
                                </IconButton>
                              </MDBox>
                            </MDBox>
                           : 
                          <MDBox>
                            <MDTypography variant="p" sx={{fontWeight: 'bold'}}>Category</MDTypography>
                            <MDTypography className={styles.category}>{selectedCategoryName}</MDTypography>
                          </MDBox>
                      }
                    </MDBox>
                    <MDBox>
                      <IconButton 
                        aria-haspopup="true"
                        aria-expanded={categorySettingOpen ? 'true' : undefined}
                        onClick={handleCategorySettingClick}
                      >
                        <MoreHorizIcon color="success"  />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={categorySettingOpen}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleCategoryEdit}>Edit</MenuItem>
                        <MenuItem onClick={() => setCategoryDeleteOpen(true)}>Delete</MenuItem>
                        <Dialog open={categoryDeleteOpen} maxWidth="sm" fullWidth>
                          <DialogTitle>Are you sure?</DialogTitle>
                          <MDBox position="absolute" top={0} right={0}>
                            <IconButton>
                              <CloseIcon onClick={() => setCategoryDeleteOpen(false)} />
                            </IconButton>
                          </MDBox>
                          <DialogContent>
                            <MDTypography variant="p">Do you really want to delete these records? This process cannot be undone.</MDTypography>
                          </DialogContent>
                          <DialogActions>
                            <MDButton color="secondary" variant="contained" onClick={() => setCategoryDeleteOpen(false)}>
                              Cancel
                            </MDButton>
                            <MDButton color="error" variant="contained" onClick={handleDeleteCategory} >
                              Delete
                            </MDButton>
                          </DialogActions>
                        </Dialog>
                      </Menu>
                    </MDBox>
                  </MDBox>
                  
              }
            </MDBox>
            <Divider sx={{m:0}} />
            <MDBox className={styles.accordionDetails}>
              <List>
                {
                  !selectedCategory ? (
                    filteredQAByKey().length > 0 && searchKey ? 
                    
                      <FilteredQA />
                      :
                      searchKey ? 
                        <MDBox display="flex" justifyContent="center" alignItems="center">
                          <MDTypography variant="p" sx={{mt: 2, mb: 2}}>No Answers</MDTypography>
                        </MDBox> : 
                        content?.map((category) => (
                          <ListItem disablePadding>
                            <ListItemButton onClick={() => handleSelectCategory(category)} >
                              <MDBox display="flex" justifyContent="space-between" alignItems="center" sx={{width: '100%'}}>
                                <MDBox display="flex" alignItems="center">
                                  <ListItemIcon>
                                    <Avatar {...helpCenterAvatar(category.name)} variant="rounded">{category.name[0]}</Avatar>
                                  </ListItemIcon>
                                  <MDTypography className={styles.category}>{category.name}</MDTypography>
                                </MDBox>
                                <MDTypography className={styles.category}>{"(" + (category.questions ? category.questions.length : 0) + ")"}</MDTypography>
                              </MDBox>
                            </ListItemButton>
                          </ListItem>
                        ))
                    ) : ""
                }
                </List>
                <MDBox>
                  {
                    selectedCategory ? 
                      <List>
                        {
                          questions.length > 0 ? 
                          (
                            questions.map((question, index) => (
                              answerEditOpen[index] ? 
                              <MDBox sx={{p:2}}>
                                <MDBox className={styles.categoryInputWrapper} sx={{mb: 2}}>
                                  <input
                                    placeholder="Type question..."
                                    type="text"
                                    className={styles.categoryInput}
                                    onChange={(e) => handleOnChangeNewQuestion(e.target.value, index)}
                                    value={newQuestion[index]}
                                  />
                                </MDBox>
                                <MDBox className={styles.categoryInputWrapper}>
                                  <textarea
                                    placeholder="Type answer..."
                                    type="text"
                                    className={styles.categoryInput}
                                    onChange={(e) => handleOnChangeNewAnswer(e.target.value, index)}
                                    value={newAnswer[index]}
                    
                                  />
                                </MDBox>
                                <MDBox display="flex" justifyContent="center" alignItems="center">
                                  <IconButton disabled={(newQuestion[index] && newAnswer[index]) ? false : true} onClick={() => handleEditQuestionAnswer(index)} >
                                    <DoneIcon color={(newQuestion[index] && newAnswer[index]) ? 'success' : ''} />
                                  </IconButton>
                                  <IconButton  onClick={() => handleEditQA(question, index)}>
                                    <CloseIcon color="error" />
                                  </IconButton>
                                </MDBox>
                              </MDBox> :
                              <MDBox>
                                <ListItemButton onClick={() => handleClick(index)}>
                                  <MDBox display="flex" alignItems="center">
                                    {open[index] ? <ExpandLess sx={{mr: 1}} /> : <ExpandMore sx={{mr: 1}} />}
                                    <MDTypography variant="h6" >{question.question}</MDTypography>
                                  </MDBox>
                                </ListItemButton>
                                <Snackbar
                                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                  open={copyOpen}
                                  onClose={() => setCopyOpen(false)}
                                  message="copied"
                                  key={'bottom' + 'center'}
                                  autoHideDuration="1000"
                                />
                                <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                  <List component="div" disablePadding>
                                    <MDBox sx={{ pl: 4 }}>
                                      <MDTypography variant="p">{question.answer}</MDTypography>
                                    </MDBox>
                                  </List>
                                  <MDBox display="flex" justifyContent="space-around" alignItems="center">
                                    <Tooltip title="Edit">
                                      <IconButton onClick={() => handleEditQA(question, index)} >
                                        <EditIcon sx={{fontSize: 15}} />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Copy">
                                      <IconButton 
                                        onClick={() => handleCopy(question.answer)} 
                                      >
                                        <ContentCopyIcon sx={{fontSize: 15}} />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                      <IconButton onClick={() => setQADeleteOpen(true)} >
                                        <DeleteIcon sx={{fontSize: 15}} />
                                      </IconButton>
                                    </Tooltip>
                                  </MDBox>
                                  <Dialog open={QADeleteOpen} maxWidth="sm" fullWidth>
                                    <DialogTitle>Are you sure?</DialogTitle>
                                    <MDBox position="absolute" top={0} right={0}>
                                      <IconButton>
                                        <CloseIcon onClick={() => setQADeleteOpen(false)} />
                                      </IconButton>
                                    </MDBox>
                                    <DialogContent>
                                      <MDTypography variant="p">Do you really want to delete these records? This process cannot be undone.</MDTypography>
                                    </DialogContent>
                                    <DialogActions>
                                      <MDButton color="secondary" variant="contained" onClick={() => setQADeleteOpen(false)}>
                                        Cancel
                                      </MDButton>
                                      <MDButton color="error" variant="contained" onClick={() => handleDeleteQA(question.id)} >
                                        Delete
                                      </MDButton>
                                    </DialogActions>
                                  </Dialog>
                                </Collapse>
                              </MDBox>
                            ))
                          ) : 
                          <MDBox display="flex" justifyContent="center" alignItems="center">
                            <MDTypography variant="p" sx={{mt: 2, mb: 2}}>No Answers</MDTypography>
                          </MDBox>
                        }
                      </List> : ""
                  }
                </MDBox>
                {
                  categoryOpen ? 
                  <Card sx={{p:2}}>
                    <MDBox display="flex" justifyContent="space-between" alignItems="center" >
                      <MDBox className={styles.categoryInputWrapper}>
                        <input
                          placeholder="Type new category..."
                          type="text"
                          className={styles.categoryInput}
                          onChange={handleCategory}
                        />
                      </MDBox>
                      <MDBox display="flex">
                        <IconButton disabled={newCategory ? false : true} onClick={handleNewCategory} >
                          <DoneIcon color={newCategory ? 'success' : ''} />
                        </IconButton>
                        <IconButton  onClick={() => setCategoryOpen(false)}>
                          <CloseIcon color="error" />
                        </IconButton>
                      </MDBox>
                    </MDBox>
                  </Card> : ""
                }
                
                {
                  answerOpen ? 
                  <Card sx={{p:2}}>
                    <MDBox>
                      <MDBox className={styles.categoryInputWrapper} sx={{mb: 2}}>
                        <input
                          placeholder="Type new question..."
                          type="text"
                          className={styles.categoryInput}
                          onChange={(e) => setNewQuestion(e.target.value)}
                        />
                      </MDBox>
                      <MDBox className={styles.categoryInputWrapper}>
                        <textarea
                          placeholder="Type new answer..."
                          type="text"
                          className={styles.categoryInput}
                          onChange={(e) => setNewAnswer(e.target.value)}
                        />
                      </MDBox>
                      <MDBox display="flex" justifyContent="center" alignItems="center">
                        <IconButton disabled={(newQuestion && newAnswer) ? false : true} onClick={handleNewAnswer} >
                          <DoneIcon color={(newQuestion && newAnswer) ? 'success' : ''} />
                        </IconButton>
                        <IconButton  onClick={() => setAnswerOpen(false)}>
                          <CloseIcon color="error" />
                        </IconButton>
                      </MDBox>
                    </MDBox>
                  </Card> : ""
                }
               
                {
                  selectedCategory ? 
                  <MDButton variant="text" color="success" size="small" sx={{mt: 1}} onClick={handleNewAnswerOpen} >+ New Answer</MDButton> : 
                  <MDButton variant="text" color="success" size="small" sx={{mt: 1}} onClick={() => setCategoryOpen(true)} >+ New Category</MDButton> 
                }
            </MDBox>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <MDBox sx={{ml: 2, mt: 2}}> 
            {
              !selectedUser ?  
              <MDBox display="flex" justifyContent="space-between" alignItems="center">
                <h3>{newMessage ? "New message" : "Messages"}</h3> 
                {
                  newMessage ? 
                  <MDButton variant="text" color="dark" size="small" onClick={handleSetNewMessage} >Cancel</MDButton> : 
                  <IconButton sx={{mr: 1}} color="dark" onClick={handleSetNewMessage}>
                    <OpenInNewIcon />
                  </IconButton>
                }
              </MDBox> : ""
            }
            </MDBox>
          
          
            {
              !selectedUser ? 
              <MDBox>
                {
                  newMessage ? 
                  <MDBox className={styles.inputWrapper_New} >
                    <input
                      placeholder="To: "
                      type="text"
                      className={styles.searchInput_New}
                      onChange={handleMessageSearch}
                      value={messageSearchKey}
                    />
                  </MDBox> : 
                  <MDBox display="flex" justifyContent="space-between" alignItems="center" className={styles.inputWrapper} >
                    <input
                      placeholder="Search..."
                      type="text"
                      className={styles.searchInput}
                      onChange={handleMessageSearch}
                      value={messageSearchKey}
                    />
                  </MDBox>

                }
                <Divider />
                {/* {
                  newMessage &&
                  <MDTypography variant="p" sx={{ml: 3}}>Suggested</MDTypography>
                } */}
                <List>
                  {
                    ( newMessage ? users : internalUsers).filter(user => user.firstName?.toLowerCase().includes(messageSearchKey?.toLowerCase()) || user.lastName?.toLowerCase().includes(messageSearchKey?.toLowerCase())).map((user) => (
                      <MDBox>
                        <ListItemButton onClick={() => setSelectedUser(user)}>
                          <MDBox display="flex" alignItems="center" sx={{p:1, width: '100%'}} >
                            <Avatar {...stringAvatar(user.firstName + ' ' + user.lastName)} sx={{mr:2}} className={styles.miniAvatar} />
                            <MDBox className={styles.miniInboxContent}>
                              <MDBox display="flex" justifyContent="space-between" alignItems="center" >
                                <MDTypography variant="h6">{user.firstName + ' ' + user.lastName}</MDTypography>
                                {
                                  !newMessage &&
                                  <MDBox display="flex" alignItems="center"  >
                                    <p className={styles.miniInboxCustomerLatest}>
                                    {moment(user.createdDate).fromNow()}
                                    </p>
                                    <IconButton sx={{p: 0}}>
                                      <ChevronRightIcon />
                                    </IconButton>
                                  </MDBox>
                                }
                                
                              </MDBox>
                              {
                                !newMessage &&
                                <MDBox display="flex" justifyContent="space-between" alignItems="center" >
                                  <p className={styles.miniInboxCustomerLatest}>
                                    {user.latest ? (user.latest.body.length > 20 ? user.latest.body.slice(0,20).concat('...') : user.latest.body) : ""}
                                  </p>
                                  <Badge badgeContent={user.unreadCount} color="info" sx={{mr: 2}}></Badge>
                                </MDBox>
                              }
                            </MDBox>
                          </MDBox>
                        </ListItemButton>
                        <Divider sx={{m:0}} />
                      </MDBox>
                    ))
                  }
                </List> 
              </MDBox> : 
                <UserChatCard user={selectedUser} setSelectedUser={setSelectedUser} />
            }
          </TabPanel>
        </MDBox>
        
        <MDBox className={styles.bottomTabs}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            // sx={{mt:1}}
            className={styles.miniTabs}
          >
            <Tab label="Customer info" className={styles.miniTab} index={0} />
            <Tab label="Help center" className={styles.miniTab} index={1} />
            <Tab label="Internal chat" className={styles.miniTab} index={2} />
          </Tabs>
          {
            totalUnread ? 
            <Badge badgeContent={totalUnread} sx={{position: 'absolute', right: 13, bottom: 27}} color="error" ></Badge> : ""
          }
        </MDBox>
      </Card>
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
        <CustomerEdit onClose={handleEditClose} data={{original: selectedCustomer}} allData={inquiries} editable={false} />
      </Modal>
    </div>
  );
};

export default CustomerInfoCard;
