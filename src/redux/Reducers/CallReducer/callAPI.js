import api from "config/api";

// Get Token API
export function getTokenApi() {
  return api.get("voice/token");
}
//Get Incoming Customer API
export function getIncomingCustomerApi(payload) {
  return api.get(`/voice/customer?phoneNumber=${encodeURIComponent(payload)}`);
}
//Begin Recording API 
export function beginRecordingApi(payload) {
  return api.get(`/voice/record/start/${payload}`);
}
//Kill Recording API
export function killRecordingApi(payload) {
  return api.get(`/voice/record/stop/${payload}`);
}
//Pause Recording API
export function holdRecordingApi(payload) {
  return api.get(`/voice/record/pause/${payload}`);
}
//Resume Recording API
export function playRecordingApi(payload) {
  return api.get(`/voice/record/resume/${payload}`);
}