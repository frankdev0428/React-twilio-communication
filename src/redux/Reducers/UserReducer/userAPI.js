import api from "config/api";

// Get Token API
export function getOtherUsersApi() {
  return api.get("chat/users");
}
//Get Chat History API
export function getHistoryApi(payload) {
  return api.get(`chat/${payload}`);
}
//Send Chat API 
export function sendInternalChatApi(payload) {
  return api.post(`/chat`, payload);
}
//Set Chat All Read API 
export function setAllReadApi(payload) {
  return api.put(`/chat/${payload}`);
}
//Get communicate User Info API 
export function getcommunicateUserInfoApi(payload) {
  return api.get(`/auth/profile`);
}
//Set Messenger API 
export function setFacebookApi(payload) {
  return api.put(`/auth/update-facebook-feature`, {enabled: payload});
}
//Set HDPhotoHub API 
export function setHDApi(payload) {
  return api.put(`/auth/update-hd-feature`, {enabled: payload});
}
//Import HDPhotoHub API 
export function importHDPhotoHubApi(payload) {
  return api.post(`/auth/hd-integrate`, payload);
}
//Set Email API 
export function setEmailApi(payload) {
  return api.put(`/auth/update-email-feature`, {enabled: payload});
}
//Set Call API
export function setCallApi(payload) {
  return api.put(`/auth/update-call-feature`, {enabled: payload});
}
//Set LiveChat API
export function setLiveChatApi(payload) {
  return api.put(`/auth/update-livechat-feature`, {enabled: payload});
}
//Save Email API 
export function saveEmailApi(payload) {
  return api.post(`/auth/email-integrate`, payload);
}
//Update Password API 
export function updatePasswordApi(payload) {
  return api.put(`/auth/update-password`, payload);
}
//Update User Avatar API 
export function updateAvatarApi(payload) {
  return api.put('auth/avatar', payload);
}
//Purchase Phone Number API 
export function purchasePhoneNumberApi(payload) {
  return api.post('auth/buy-phone-number', {areaCode: payload});
}
//Port Phone Number API 
export function migratePhoneNumberApi(payload) {
  return api.post('auth/port-phone-number', {phoneNumber: payload});
}