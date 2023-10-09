import { getHelpCenterContentApi, NewCategoryApi, NewAnswerApi, DeleteCategoryApi, UpdateCategoryApi, UpdateQAApi, RemoveQAApi } from "./helpAPI";

// Get Help Center Content
export const getHelpCenterContent = async () => {
  const response = await getHelpCenterContentApi();
  return response.data;
};
//New Category
export const NewCategory = async (payload) => {
  const response = await NewCategoryApi(payload);
  return response.data;
}
//New Answer
export const NewAnswer = async (payload) => {
  const response = await NewAnswerApi(payload);
  return response.data;
}
//Delete Category 
export const DeleteCategory = async (payload) => {
  const response = await DeleteCategoryApi(payload);
  return response.data;
}
//Update Category 
export const UpdateCategory = async (payload) => {
  const response = await UpdateCategoryApi(payload);
  return response.data;
}
//Update QA 
export const UpdateQA = async (payload) => {
  const response = await UpdateQAApi(payload);
  return response.data;
}
//Remove QA 
export const RemoveQA = async (payload) => {
  const response = await RemoveQAApi(payload);
  return response.data;
}