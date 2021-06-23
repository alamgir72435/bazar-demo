import axios from "./axios";

let tokenData = localStorage.getItem("token");
let token = tokenData === undefined || tokenData === null ? null : tokenData;

axios.defaults.headers.common["auth-token"] = token;
export default axios;
