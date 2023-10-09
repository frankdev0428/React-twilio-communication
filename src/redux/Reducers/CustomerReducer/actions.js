import { addCustomerApi, importCustomersApi, editCustomerApi, deleteCustomerApi, deleteCustomersApi, getCustomerByIdApi, setStatusByCustomerIdApi, setPriorityByCustomerIdApi, setDepartmentByCustomerIdApi, setAgentByCustomerIdApi, editEmailApi, editPhoneApi, editNameApi, editAvatarApi } from "./customerAPI";

// Add Customer
export const addCustomer = async (payload) => {
  const response = await addCustomerApi(payload);
  return response.data;
};
//Import Customers
export const importCustomers = async (payload) => {
  const response = await importCustomersApi(payload);
  return response.data;
};
//Edit Customer
export const editCustomer = async (payload) => {
  const response = await editCustomerApi(payload);
  return response.data;
};
//Delete Customer
export const removeCustomer = async (payload) => {
  const response = await deleteCustomerApi(payload);
  return response.data;
}
//Delete Customers
export const removeCustomers = async (payload) => {
  const response = await deleteCustomersApi(payload);
  return response.data;
}
//Get Customer By Id
export const getCustomerById = async (payload) => {
  const response = await getCustomerByIdApi(payload);
  return response.data;
}
//Set Customer Status By Id 
export const setStatusByCustomerId = async (payload) => {
  const response = await setStatusByCustomerIdApi(payload);
  return response.data;
}
//Set Customer Priority By Id
export const setPriorityByCustomerId = async (payload) => {
  const response = await setPriorityByCustomerIdApi(payload);
  return response.data;
}
//Set Customer Department By Id
export const setDepartmentByCustomerId = async (payload) => {
  const response = await setDepartmentByCustomerIdApi(payload);
  return response.data;
}
//Set Customer Agent By Id
export const setAgentByCustomerId = async (payload) => {
  const response = await setAgentByCustomerIdApi(payload);
  return response.data;
}
//Edit Customer Email
export const editEmail = async (payload) => {
  const response = await editEmailApi(payload);
  return response.data;
}
//Edit Customer Phone 
export const editPhone = async (payload) => {
  const response = await editPhoneApi(payload);
  return response.data;
}
//Edit Customer Name
export const editName = async (payload) => {
  const response = await editNameApi(payload);
  return response.data;
}
//Edit Customer Avatar 
export const editAvatar = async (payload) => {
  const response = await editAvatarApi(payload);
  return response.data;
}