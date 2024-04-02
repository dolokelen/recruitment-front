const logoutUser = () => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (accessToken && refreshToken) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
};

export default logoutUser;
