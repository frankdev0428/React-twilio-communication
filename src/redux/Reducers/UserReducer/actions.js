import { getOtherUsersApi, getHistoryApi, sendInternalChatApi, setAllReadApi, getcommunicateUserInfoApi, setFacebookApi, setCallApi, setLiveChatApi, setHDApi, importHDPhotoHubApi, setEmailApi, saveEmailApi, updatePasswordApi, updateAvatarApi, purchasePhoneNumberApi, migratePhoneNumberApi } from "./userAPI";

// Get Users
export const getOtherUsers = async () => {
  const response = await getOtherUsersApi();
  return response.data;
};
//Get Chat History 
export const getHistory = async (payload) => {
  const response = await getHistoryApi(payload);
  return response.data;
};
//Send Internal Chat 
export const sendInternalChat = async (payload) => {
  const response = await sendInternalChatApi(payload);
  return response.data;
};
//Set Chat All Read 
export const setAllRead = async (payload) => {
  const response = await setAllReadApi(payload);
  return response.data;
};
//Get communicate Uer Info 
export const getcommunicateUserInfo = async (payload) => {
  const response = await getcommunicateUserInfoApi(payload);
  return response.data;
};
//Set Messenger  
export const setFacebook = async (payload) => {
  const response = await setFacebookApi(payload);
  return response.data;
};
//Set HDPhotoHub 
export const setHD = async (payload) => {
  const response = await setHDApi(payload);
  return response.data;
};
// Import HDPhotoHub 
export const importHDPhotoHub = async (payload) => {
  const response = await importHDPhotoHubApi(payload);
  return response.data;
};
//Set Email 
export const setEmail = async (payload) => {
  const response = await setEmailApi(payload);
  return response.data;
};
//Set Call
export const setCall = async (payload) => {
  const response = await setCallApi(payload);
  return response.data;
};

//Set LiveChat
export const setLiveChat = async (payload) => {
  const response = await setLiveChatApi(payload);
  return response.data;
};
//Save Email 
export const saveEmail = async (payload) => {
  const response = await saveEmailApi(payload);
  return response.data;
};
//Update communicate Password 
export const updatePassword = async (payload) => {
  const response = await updatePasswordApi(payload);
  return response.data;
};
//Udate communicate User Avatar 
export const updateAvatar = async (payload) => {
  const response = await updateAvatarApi(payload);
  return response.data;
};
//Purchase Phone Number 
export const purchasePhoneNumber = async (payload) => {
  const response = await purchasePhoneNumberApi(payload);
  return response.data;
};
//Port Phone Number 
export const migratePhoneNumber = async (payload) => {
  const response = await migratePhoneNumberApi(payload);
  return response.data;
};