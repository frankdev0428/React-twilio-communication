import { getTokenApi, getIncomingCustomerApi, beginRecordingApi, killRecordingApi, holdRecordingApi, playRecordingApi } from "./callAPI";

// Get Token
export const getToken = async () => {
  const response = await getTokenApi();
  return response.data;
};
//Get Incoming Customer 
export const getIncomingCustomer = async (payload) => {
  const response = await getIncomingCustomerApi(payload)
  return response.data;
}
//Begin Recording
export const beginRecording = async (payload) => {
  const response = await beginRecordingApi(payload)
  return response.data;
}
//Kill Recording
export const killRecording = async (payload) => {
  const response = await killRecordingApi(payload)
  return response.data;
}
//Hold Recording
export const holdRecording = async (payload) => {
  const response = await holdRecordingApi(payload)
  return response.data;
}
//Play Recording
export const playRecording = async (payload) => {
  const response = await playRecordingApi(payload)
  return response.data;
}