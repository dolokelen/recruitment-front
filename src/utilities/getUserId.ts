import {jwtDecode} from "jwt-decode";

interface jwtPlayLoad {
  user_id: string;
}

const getUserId = () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    const decodeToken = jwtDecode(token) as jwtPlayLoad;

    return parseInt(decodeToken.user_id);
  }
};

export default getUserId;