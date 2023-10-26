import axios from "axios";

export const registerUserApi = async (request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/register",
        request
      );
      resolve(response?.data);
    } catch (error) {
      reject(error);
      console.log("error :: ", error);
    }
  });
};
export const loginUserApi = async (request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:8000/login", request);
      resolve(response?.data);
    } catch (error) {
      resolve(error?.response?.data);
    }
  });
};
export const getUerApi = async (request) => {
  console.log("request", request);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/users?userId=${request}`
      );
      resolve(response?.data);
    } catch (error) {
      resolve(error?.response?.data);
    }
  });
};
