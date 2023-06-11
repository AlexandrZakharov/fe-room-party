import Cookies from 'js-cookie';
import { AxiosInstance } from 'axios';
import { CookiesField } from '@/types/cookies.interface';

export const getAccessToken = () => {
  const accessToken = Cookies.get(CookiesField.accessToken);

  return accessToken || null;
};

export const getUserFromStorage = () => JSON.parse(localStorage.getItem('user') || '{}');

export const removeFromStorage = () => {
  Cookies.remove(CookiesField.accessToken);
  Cookies.remove(CookiesField.refreshToken);
  localStorage.removeItem("user");
};



export const extendUrl = (instance: AxiosInstance, url: string) => {
  instance.interceptors.request.use((config) => {
    config.baseURL += url;

    return config;
  })
};