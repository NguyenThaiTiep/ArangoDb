import axios from "axios";


const API_MYSQL = axios.create({
    baseURL: "http://localhost:3001",
    responseType: "json",
});

const requestHandler = (request: any) => {
    let token = localStorage.getItem("token");
    if (token) {
        // Thêm token vào header nếu user vẫn tồn tại
        request.headers["x-access-token"] = token;
    }
    return request;
};
const successHandler = (response: any) => {
    return response;
};

const errorHandler = (error: any) => {
    return Promise.reject({...error});
};

API_MYSQL.interceptors.request.use((request) => requestHandler(request));

API_MYSQL.interceptors.response.use(
    (response) => successHandler(response),
    (error) => errorHandler(error)
);

export default API_MYSQL;
