import { AxiosInstance } from "axios";

export const setupResponseInterceptor = (
  instance: AxiosInstance,
  handler: any
) => {
  instance.interceptors.response.use(
    (response: any) => {
      // if (response.data.code === "01030004") {
      //   console.error({
      //     open: true,
      //     type: "error",
      //     content: "인증에 실패했습니다.",
      //   });
      //   handler.onError({ errorStatus: 403, errorData: null });
      //   throw new Error("error");
      // } else if (response.data.code === "01030001") {
      //   console.error({
      //     open: true,
      //     type: "error",
      //     content: "인증에 실패했습니다.",
      //   });
      //   handler.onError({ errorStatus: 401, errorData: null });
      //   throw new Error("error");
      // }

      return response;
    },
    async (error: any) => {
      //response가 없을 때
      error.response = error.response ? error.response : {};
      error.response.status = error.response.status
        ? error.response.status
        : 999;

      const errorStatus = error.response.status;
      const errorData = error.response.data;

      // Todo: context 로 수정
      switch (errorStatus) {
        case 400:
          console.error({
            open: true,
            type: "error",
            content: "사용자 에러가 발생했습니다.",
          });
          break;
        case 401:
          console.error({
            open: true,
            type: "error",
            content: "인증에 실패했습니다.",
          });
          break;
        case 403:
          console.error({
            open: true,
            type: "error",
            content: "권한이 없습니다.",
          });
          break;
        case 500:
          console.error({
            open: true,
            type: "error",
            content: "알 수 없는 에러가 발생했습니다.",
          });
          break;
      }

      handler.onError({ errorStatus, errorData });

      //400 에러는 store 에서 처리
      return Promise.reject(error);
    }
  );
};
