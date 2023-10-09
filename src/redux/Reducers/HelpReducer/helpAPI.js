import api from "config/api";

// Get Token API
export function getHelpCenterContentApi() {
  return api.get("help/category");
}
//New Category API
export function NewCategoryApi(payload) {
  return api.post("help/category", { name: payload });
}
//New Answer API 
export function NewAnswerApi(payload) {
  return api.post("help/question", payload);
}
//Delete Category API 
export function DeleteCategoryApi(payload) {
  return api.delete(`help/category/${payload}`);
}
//Update Category API 
export function UpdateCategoryApi(payload) {
  return api.put(`help/category/${payload.id}`, payload);
}
//Update QA API 
export function UpdateQAApi(payload) {
  return api.put(`help/question/${payload.id}`, payload);
}
//Remove QA API 
export function RemoveQAApi(payload) {
  return api.delete(`help/question/${payload}`);
}