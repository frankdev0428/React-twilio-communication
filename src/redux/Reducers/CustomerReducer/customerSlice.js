import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addCustomer, importCustomers, editCustomer, removeCustomer, removeCustomers, getCustomerById, setStatusByCustomerId, setPriorityByCustomerId, setDepartmentByCustomerId, setAgentByCustomerId, editEmail, editPhone, editName, editAvatar } from "./actions";

export const deleteCustomers =createAsyncThunk(
  "customer/removeCustomers", 
  async (payload) => removeCustomers(payload)
)
export const deleteCustomer = createAsyncThunk(
  "customer/removeCustomer", 
  async (payload) => removeCustomer(payload)
)
export const updateCustomer = createAsyncThunk(
  "customer/editCustomer", 
  async (payload) => editCustomer(payload)
)
export const createCustomer = createAsyncThunk(
  "customer/addCustomer", 
  async (payload) => addCustomer(payload)
);
export const importMultipleCustomers = createAsyncThunk(
  "customer/importCustomers", 
  async (payload) => importCustomers(payload)
);
export const takeCustomerById = createAsyncThunk(
  "customer/getCustomerById",
  async (payload) => getCustomerById(payload)
);
export const setStatusByCustomer = createAsyncThunk(
  "customer/setStatusByCustomerId",
  async (payload) => setStatusByCustomerId(payload)
);
export const setPriorityByCustomer = createAsyncThunk(
  "customer/setPriorityByCustomerId",
  async (payload) => setPriorityByCustomerId(payload)
);
export const setDepartmentByCustomer = createAsyncThunk(
  "customer/setDepartmentByCustomerId",
  async (payload) => setDepartmentByCustomerId(payload)
);
export const setAgentByCustomer = createAsyncThunk(
  "customer/setAgentByCustomerId",
  async (payload) => setAgentByCustomerId(payload)
);
export const updateEmail = createAsyncThunk(
  "customer/updateEmail",
  async (payload) => editEmail(payload)
);
export const updatePhone = createAsyncThunk(
  "customer/updatePhone",
  async (payload) => editPhone(payload)
)
export const updateName = createAsyncThunk(
  "customer/updateName",
  async (payload) => editName(payload)
)
export const updateAvatar = createAsyncThunk(
  "customer/updateAvatar",
  async (payload) => editAvatar(payload)
)

const initialState = {
  customer : null,
  selectedCustomer: null,
  refresher: 0,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.customer = action.payload;
      })
      .addCase(importMultipleCustomers.fulfilled, (state, action) => {
        state.refresher++;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.refresher++;
      })
      .addCase(deleteCustomers.fulfilled, (state, action) => {
        state.refresher++;
      })
      .addCase(takeCustomerById.fulfilled, (state, action) => {
        state.selectedCustomer = {
            ...action.payload,
            agent: action.payload.agent || 'You' ,
            priority: action.payload.priority || 'Medium' ,
            department: action.payload.department || 'Marketing' ,
            status: action.payload.status || 'New'
        }

      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.refresher++;
      })
      .addCase(updateEmail.fulfilled, (state, action) => {
        state.refresher++;
      })
      .addCase(updatePhone.fulfilled, (state, action) => {
        state.refresher++;
      })
      .addCase(updateName.fulfilled, (state, action) => {
        state.refresher++;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.refresher++;
      })
      .addCase(setStatusByCustomer.fulfilled, (state, action) => {
        state.refresher++;
      })
      .addCase(setPriorityByCustomer.fulfilled, (state, action) => {
        state.refresher++;
      })
      .addCase(setDepartmentByCustomer.fulfilled, (state, action) => {
        state.refresher++;
      })
      .addCase(setAgentByCustomer.fulfilled, (state, action) => {
        state.refresher++;
      });
  
  },
});

// export const {  } = customerSlice.actions;
export default customerSlice.reducer;
