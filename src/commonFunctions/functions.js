import axios from "axios";

export const saveCurrentUser = user => {
  localStorage.setItem("user", JSON.stringify(user));
};
