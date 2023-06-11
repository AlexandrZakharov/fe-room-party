import axios from "axios";
import { getAccessToken } from "./auth/auth.helper";

export default abstract class ApiService {
  protected readonly instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  constructor(extendedUrl: string) {
    this.instance.interceptors.request.use((config) => {
      const accessToken = getAccessToken();
      
      config.baseURL += extendedUrl;

      if (config?.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });

    // this.instance.interceptors.response.use(config => config, async error => {
    //   const originalRequest = error.config;
    //   const caughtError = this._handleError(error);
    
    //   if ((
    //     error.response.status === 401 || caughtError === 'jwt expired' || caughtError === 'jwt must be provided'
    //   ) && error.config && !error.config._isRetry) {
    //     originalRequest._isRetry = true;
    //     try {
    //       await AuthService.getNewTokens()
    //       return this.instance.request(originalRequest)
    //     } catch (error) {
    //       if (this._handleError(error) === 'jwt expired') removeFromStorage();
    //     }
    //   }
    
    //   throw error;
    // });
  }

  protected _get = async <ReturnType = unknown>(
    url: string,
    params?: object,
    token?: string
  ): Promise<ReturnType> => {
    try {
      if (token) {
        this._setAuthToken(token);
      }
      const res = await this.instance.get(url, { params });
      return res.data;
    } catch (error) {
      return Promise.reject(this._handleError(error));
    }
  };

  protected _put = async <ReturnType, BodyType>(
    url: string,
    body: BodyType
  ): Promise<ReturnType> => {
    try {
      const res = await this.instance.put(url, body);
      return res.data;
    } catch (error) {
      return Promise.reject(this._handleError(error));
    }
  };

  protected _post = async <
    ReturnType = unknown,
    BodyType = unknown,
    ParamsType = unknown
  >(
    url: string,
    body: BodyType,
    params?: ParamsType,
    token?: string
  ): Promise<ReturnType> => {
    try {
      if (token) {
        this._setAuthToken(token);
      }
      const res = await this.instance.post(url, body, { params });
      return res.data;
    } catch (error) {
      return Promise.reject(this._handleError(error));
    }
  };

  protected _delete = async <ReturnType>(url: string): Promise<ReturnType> => {
    try {
      const res = await this.instance.delete(url);
      return res.data;
    } catch (error) {
      return Promise.reject(this._handleError(error));
    }
  };

  protected _setAuthToken = (token: string) => {
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  protected _handleError = (error: any) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      throw error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      // 'error.request' is an instance of XMLHttpRequest in the
      // browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
      throw error.request;
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
      throw error;
    }
  };
}
