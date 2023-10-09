import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHelpCenterContent, NewCategory, NewAnswer, DeleteCategory, UpdateCategory, UpdateQA, RemoveQA } from "./actions";

export const getHelpContent = createAsyncThunk(
  "help/getHelpContent", 
  async () => getHelpCenterContent()
)
export const addCategory = createAsyncThunk(
  "help/addCategory", 
  async (payload) => NewCategory(payload)
)
export const addAnswer = createAsyncThunk (
  "help/addAnswer", 
  async (payload) => NewAnswer(payload)
)
export const deleteSelectedCategory = createAsyncThunk (
  "help/deleteSelectedCategory", 
  async (payload) => DeleteCategory(payload)
)
export const editCategory = createAsyncThunk (
  "help/editCategory", 
  async (payload) => UpdateCategory(payload)
)
export const editQA = createAsyncThunk (
  "help/editQA", 
  async (payload) => UpdateQA(payload)
)
export const deleteQA = createAsyncThunk (
  "help/deleteQA", 
  async (payload) => RemoveQA(payload)
)
const initialState = {
    content: null,
    refresher: 0,
    questions: [],
    selectedCategoryName: "",
    filteredQA: []
};

export const helpSlice = createSlice({
  name: "help",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload
    },
    setSelectedCategoryName: (state, action ) => {
      state.selectedCategoryName = action.payload
    },
    setFilteredQA: (state,action) => {
      state.filteredQA = action.payload
    }
  },
  extraReducers: (builder) => {
     builder
      .addCase(getHelpContent.fulfilled, (state, action) => {
        state.content = action.payload;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.content = [...state.content, { ...action.payload, questions: [] }]

      })
      .addCase(deleteSelectedCategory.fulfilled, (state, action) => {
        state.refresher++;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.refresher++;
        state.selectedCategoryName = action.payload.name
      })
      .addCase(addAnswer.fulfilled, (state, action) => {
        state.questions = [...state.questions, action.payload]
        state.refresher++;
      })
      .addCase(editQA.fulfilled, (state, action) => {
        const questions = [...state.questions]
        const index = questions.findIndex((question) => question.id == action.payload.id)
        if (index != -1) {
          questions[index] = action.payload
        }
        state.questions = questions

        const filteredQuestions = [...state.filteredQA]
        const index1 = filteredQuestions.findIndex((question) => question.id == action.payload.id)
        if (index1 != -1) {
          filteredQuestions[index1] = action.payload
        }
        state.filteredQA = filteredQuestions

        state.refresher++;
      })
      .addCase(deleteQA.fulfilled, (state, action) => {
        const questions = [...state.questions]
        const filteredQuestions = [...state.filteredQA]
        state.questions = questions.filter((question) => question.id != action.payload.id)
        state.filteredQA = filteredQuestions.filter((question) => question.id != action.payload.id)
        state.refresher++;
      })
      


  },
});

export const { setQuestions, setSelectedCategoryName, setFilteredQA } = helpSlice.actions;
export default helpSlice.reducer;
