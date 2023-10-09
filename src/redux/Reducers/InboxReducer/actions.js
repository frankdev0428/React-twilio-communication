import { listInquiriesApi, listMessagesApi, sendMessageApi, sendEmailApi, sendFacebookApi, sendLiveChatApi } from "./inboxAPI";

// List Inquiries
export const listInquiries = async () => {
  const response = await listInquiriesApi();
  return response.data;
};
// List Messages
export const listMessages = async (userId) => {
  const response = await listMessagesApi(userId);
  return response.data;
};
// Send Message
export const sendMessage = async (payload) => {
  const response = await sendMessageApi(payload);
  return response.data;
};
// Send Email
export const sendEmail = async (payload) => {
  const response = await sendEmailApi(payload);
  return response.data;
}
//Send Messenger chat
export const sendFacebook = async (payload) => {
  const response = await sendFacebookApi(payload);
  return response.data;
}
//Send Web chat 
export const sendLiveChat = async (payload) => {
  const response = await sendLiveChatApi(payload);
  return response.data;
}