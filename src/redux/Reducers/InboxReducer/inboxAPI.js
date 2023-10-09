import api from "config/api";

// List Inquiries API
export function listInquiriesApi() {
  return api.get("customer");
}
// List Messages API
export function listMessagesApi(payload) {
  return api.get(`/customer/${payload}`);
}
// Send Message API
export function sendMessageApi(payload) {
  return api.post("sms/send", payload);
}
// Send Email API
export function sendEmailApi(payload) {
  return api.post("email/send", payload);
}
// Send Messenger API 
export function sendFacebookApi(payload) {
  return api.post("facebook/send", payload);
}
//Send LiveChat API 
export function sendLiveChatApi(payload) {
  return api.post("webchat/send", payload);
}