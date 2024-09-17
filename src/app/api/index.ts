import axios from "axios";
import { setupResponseInterceptor } from "@/app/api/interceptor/response";
// import { setupRequestInterceptor } from "@/app/api/interceptor/request";
import { InstanceConfig } from "@/app/api/interceptor/model";

export const responseInterceptorHandler = {
  onError(error: any) {
    console.log(error, "origin");
  },
};

const createInstance = ({ header }: InstanceConfig) => {
  const instance = axios.create({
    baseURL: process.env.NEXT_API_HOST,
  });

  // setupRequestInterceptor(instance, { header });
  setupResponseInterceptor(instance, responseInterceptorHandler);

  return instance;
};

const axiosInstance = createInstance({});

export default axiosInstance;
