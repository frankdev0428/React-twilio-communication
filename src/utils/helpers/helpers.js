export const scrollToBottom = (scrollElement) => {
  const scrollHeight = scrollElement.current.scrollHeight;
  const height = scrollElement.current.clientHeight;
  const maxScrollTop = scrollHeight - height;
  // scrollElement.current.scrollIntoView({ behavior: "smooth" })
  scrollElement.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
};

export const getToken = () => {
  try {
    let user = JSON.parse(localStorage.getItem("communicateUser"));
    return user.token;
  } catch (e) {
    return null;
  }
}