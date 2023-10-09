import React, { useEffect, useRef, useState } from "react";
import styles from "./CustomerInfoCard.module.css";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import IconButton from "@mui/material/IconButton";
import SendIcon from '@mui/icons-material/Send';
import { editQA, deleteQA } from 'redux/Reducers/HelpReducer/helpSlice'
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import DoneIcon from '@mui/icons-material/Done';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import EditIcon from '@mui/icons-material/Edit';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import MDButton from "components/MDButton";

const FilteredQA = () => {
  const dispatch = useDispatch();
  const [answerEditOpen, setAnswerEditOpen] = useState([])
  const [newQuestion, setNewQuestion] = useState([])
  const [newAnswer, setNewAnswer] = useState([])
  const [open, setOpen] = useState([]);
  const [copyOpen, setCopyOpen] = useState(false)
  const [QADeleteOpen, setQADeleteOpen] = useState(false)
  const { filteredQA } = useSelector(({ help }) => help);
  const handleOnChangeNewQuestion = (value, index) => {
    const question = [...newQuestion]
    question[index] = value
    setNewQuestion(question)
  }
  const handleOnChangeNewAnswer = (value, index) => {
    const answer = [...newAnswer]
    answer[index] = value
    setNewAnswer(answer)
  }
  const handleEditQuestionAnswer = (question, index) => {
    dispatch(editQA({id: question.id, question: newQuestion[index], answer: newAnswer[index]}))
    setAnswerEditOpen([])
  }
  const handleEditQA = (qa, index) => {
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
  const handleCopy = (answer) => {
    setCopyOpen(true)
    navigator.clipboard.writeText(answer)
  }
  const handleDeleteQA = (id) => {
    dispatch(deleteQA(id))
    setQADeleteOpen(false)
  }
  useEffect(() => {
    const arr = new Array(filteredQA.length).fill(false);
    setAnswerEditOpen(arr)
    setOpen(arr)
  }, [filteredQA])
  return (
    <div className={styles.filteredQAWrapper}>
      {
        filteredQA?.map((question, index) => (
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
              <IconButton disabled={(newQuestion[index] && newAnswer[index]) ? false : true} onClick={() => handleEditQuestionAnswer(question,index)} >
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
                  <IconButton onClick={() => handleEditQA(question, index)}>
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
      }
    </div>
  );
};

export default FilteredQA;
