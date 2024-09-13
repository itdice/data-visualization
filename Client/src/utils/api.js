import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:3880",
});
const dataLab = {
    get: () => {
        return api.get("/data");
    },
    post: (data) => {
        return api.post("/data", data);
    },
    delete: () => {
        return api.delete("/data");
    },
};
export default dataLab;
