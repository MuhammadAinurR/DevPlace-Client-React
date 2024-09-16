import axios from "axios";

const request = axios.create({
    baseURL: "https://devplace-server-express-production.up.railway.app/",
});

export default request;
