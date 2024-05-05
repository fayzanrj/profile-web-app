const GetTokenId = () => {
  const accessToken = localStorage.getItem("profile_accessToken");
  const uid = localStorage.getItem("profile_uid");

  if (!accessToken || !uid) {
    return false;
  }

  return { accessToken, uid };
};

export default GetTokenId;
