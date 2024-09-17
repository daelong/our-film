// import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
// import { AppConfig, InstanceConfig } from '@/models/common/config/Config.model'
// import { authService } from '@/service/common/authService'

// export const setupRequestInterceptor = (instance: AxiosInstance, instanceConfig: InstanceConfig) => {
//   instance.interceptors.request.use(
//     async (config: InternalAxiosRequestConfig<any>) => {
//       let accessToken = getAccessTokenByAppType(instanceConfig.appType)
//       if (instanceConfig.appType === 'msa' || instanceConfig.appType === 'scph') {
//         const expired = authService.isTokenExpired(accessToken)
//         if (expired) {
//           accessToken = await authService.scphRefreshLogin()
//         }
//       }

//       const contentType = config.data instanceof FormData ? 'multipart/form-data' : 'application/json'

//       const defaultHeaders = {
//         ...(accessToken && { Authorization: accessToken }),
//         'Content-Type': contentType,
//       } as any

//       if (!!instanceConfig.header) {
//         defaultHeaders[instanceConfig.header['key']] = instanceConfig.header['value']
//       }

//       config.headers = {
//         ...defaultHeaders,
//         ...config.headers,
//       }

//       return config
//     },
//     (error: AxiosError) => {
//       return Promise.reject(error)
//     }
//   )
// }

// const getAccessTokenByAppType = (appType: keyof AppConfig) => {
//   switch (appType) {
//     case 'scph':
//     case 'msa':
//       return localStorage.getItem('scph-token')
//     case 'kcall':
//       return localStorage.getItem('kcall-token')
//     default:
//       return null
//   }
// }
