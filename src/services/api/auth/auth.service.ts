import axios from "axios";
import ApiService from "../api.service";
import { RegisterData, LoginData, AuthResponse } from "./auth.interface";
import { User } from "@/types/user.interface";

class AuthApiService extends ApiService {
  constructor() {
    super("/auth");
  }

  public register = (data: RegisterData): Promise<AuthResponse> => this._post("register", data);

  public login = async (data: LoginData): Promise<User> => {
    const res: AuthResponse = await this._post("login", data);

    localStorage.setItem('token', res.accessToken);

    return res.user;
  };

  public refreshToken = (): Promise<AuthResponse> => this._post("login/access-token", null);

  // public login = (data: LoginData): Promise<LoginResponse> =>
  //   axios.post("http://193.42.110.148:3000/api/auth/login", data, {
  //     withCredentials: true,
  //   });
}

export default new AuthApiService();
