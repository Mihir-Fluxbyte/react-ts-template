import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import AuthContext from "../contextApi/AuthContext";
import { useContext } from "react";
import environment from "../environment";
import LoadingContext from "../contextApi/LoadingContext";

function useApiClientService() {
  const auth = useContext(AuthContext);
  const loading = useContext(LoadingContext);
  const getAxios = () =>
    axios.create({
      baseURL: environment.REACT_APP_BASE_URL,
    });

  const loadingAction = (action:'+'| '-') => {
    loading?.dispatch({
      type: action,
      payload: {}
    });
  };

  const getApiRequest = () => {
    const ApiRequest = getAxios();
    requestInterceptor(ApiRequest);
    responseInterceptor(ApiRequest);
    return ApiRequest;
  };

  const requestInterceptor = (api: AxiosInstance) => {
    api.interceptors.request.use(
      (config: AxiosRequestConfig) => {
            if (auth?.state.token){
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${auth.state.token}`
                }   
            }
        loadingAction("+");
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };

  const responseInterceptor = (api: AxiosInstance) => {
    api.interceptors.response.use(
      (config: AxiosRequestConfig) => {
        loadingAction("-");
        return config;
      },
      (error) => {
        loadingAction("-");
        console.error("Api Error: ",error.config.baseURL + error.config.url, error)
        return Promise.reject(error);
      }
    );
  };

  const ApiGet = (url: string) => {
    const ApiRequest = getApiRequest();
    return ApiRequest.get(url);
  };

  const ApiPost = (url: string, payload: Record<string, any>) => {
    const ApiRequest = getApiRequest();
    return ApiRequest.post(url, payload);
  };

  const ApiPut = (url: string, payload: Record<string, any>) => {
    const ApiRequest = getApiRequest();
    return ApiRequest.put(url, payload);
  };

  const ApiDelete = (url: string) => {
    const ApiRequest = getApiRequest();
    return ApiRequest.delete(url);
  };

  return { ApiGet, ApiPost, ApiPut, ApiDelete };
}

export default useApiClientService;
