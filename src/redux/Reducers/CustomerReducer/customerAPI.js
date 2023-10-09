import api from "config/api";

// Add Customer API
export function addCustomerApi(payload) {
  return api.post("/customer", payload);
}
//Import Customers API
export function importCustomersApi(payload) {
  return api.post("/customer/multiple", payload);
}
//Edit Customer API
export async function editCustomerApi(payload) {
  if(payload.mergeTo) {
    await api.post(`/customer/merge-customer-for-facebook`, {
      customerId1: payload.id, 
      customerId2: payload.mergeTo
    })
  }
  return api.put(`/customer/${payload.id}`, payload);
}
//Delete Customer API
export function deleteCustomerApi(payload) {
  return api.delete(`/customer/${payload}`, payload);
}
//Delete Customers API
export function deleteCustomersApi(payload) {
  return api.post(`/customer/delete-multiple`, {ids: payload});
}
//Get Customer By Id API
export function getCustomerByIdApi(payload) {
  return api.get(`/customer/${payload}`);
}
//Set Customer Status By Id API 
export function setStatusByCustomerIdApi(payload) {
  return api.put(`/customer/status/${payload.id}`, {status: payload.status});
}
//Set Customer Department By Id API
export function setDepartmentByCustomerIdApi(payload) {
  return api.put(`/customer/department/${payload.id}`, {department: payload.department});
}
//Set Customer Priority By Id API
export function setPriorityByCustomerIdApi(payload) {
  return api.put(`/customer/priority/${payload.id}`, {priority: payload.priority});
}
//Set Customer Agent By Id API
export function setAgentByCustomerIdApi(payload) {
  return api.put(`/customer/agent/${payload.id}`, {agent: payload.agent});
}
//Edit Customer Email API 
export function editEmailApi(payload) {
  return api.put(`/customer/email/${payload.id}`, {email: payload.email});
}
//Edit Customer Phone API
export function editPhoneApi(payload) {
  return api.put(`/customer/number/${payload.id}`, {number: payload.phone});
}
//Edit Customer Name API 
export function editNameApi(payload) {
  return api.put(`/customer/name/${payload.id}`, {name: payload.name});
}
//Edit Customer Avatar API 
export function editAvatarApi(payload) {
  return api.put(`/customer/avatar/${payload.id}`, {avatar: payload.avatar});
}