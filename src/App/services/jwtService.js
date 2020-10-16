import axios from 'axios';

// const API_CONFIG = "http://54.174.116.204/v1";
const BASE_URL = "http://localhost:8080";
const API_CONFIG = `${BASE_URL}/v1`;
const PATH_TOKEN = "/oauth/token";

const USUARIO_LOGADO = "usuario";
const ACCESS_TOKEN = "access_auth";
const REFRESH_TOKEN = "refresh_auth";
const customAxios = axios.create({
  baseURL: API_CONFIG,
});

class jwtService {
    authTokenRequest = null;
  
    init() {
      this.setInterceptors();
    }

    signInWithUsernameAndPassword = (email, password) => {
        this.setSession(null);
        return new Promise((resolve, reject) => {
          this.login(email, password)
            .then((response) => {
              if (response.data) {
                this.setTokens(response);
                this.getUserData().then((response) => {
                  this.setSession(response);
                  resolve(response.data);
                });
              } else {
                reject(response);
              }
            })
            .catch((err) => {
              reject(err);
            });
        });
      };
    
      getUserData = async () => {
        return customAxios.get("/user-auth");
      };
    
      login = async (email, password) => {
        var reqData = `grant_type=password&username=${email}&password=${password}`;
        return axios.request({
          url: PATH_TOKEN,
          method: "post",
          baseURL: BASE_URL,
          auth: {
            username: "iBolsaSAWeb", // This is the client_id
            password: "iBolSaSA2020", // This is the client_secret
          },
          data: reqData,
        });
      };

      refreshToken = async (error) => {
        var reqData = `grant_type=refresh_token&refresh_token=${this.getRefreshToken()}`;
        return axios.request({
          url: PATH_TOKEN,
          method: "post",
          baseURL: BASE_URL,
          auth: {
            username: "iBolsaSAWeb", // This is the client_id
            password: "iBolSaSA2020", // This is the client_secret
          },
          data: reqData,
        });
      };
    
      setTokens = (response) => {
        if (response && response.data) {
          localStorage.setItem(
            ACCESS_TOKEN,
            JSON.stringify(response.data.access_token)
          );
          localStorage.setItem(
            REFRESH_TOKEN,
            JSON.stringify(response.data.refresh_token)
          );
        } else {
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
        }
      };
    
      setSession = (response) => {
        if (response && response.data) {
          localStorage.setItem(USUARIO_LOGADO, JSON.stringify(response.data));
        } else {
          localStorage.removeItem(USUARIO_LOGADO);
        }
      };

    logout = () => {
        this.setSession(null);
    };

    getUsuarioLogado = () => {
        return JSON.parse(localStorage.getItem(USUARIO_LOGADO));
      };
    
      getAccessToken = () => {
        return JSON.parse(localStorage.getItem(ACCESS_TOKEN));
      };
    
      getRefreshToken = () => {
        return JSON.parse(localStorage.getItem(REFRESH_TOKEN));
      };
    
      isUsuarioLogado = () => {
        let user = this.getUsuarioLogado();
        return user;
      };

      getAuthToken = () => {
        if (!this.authTokenRequest) {
          this.authTokenRequest = this.refreshToken();
          this.authTokenRequest.then(
            this.resetAuthTokenRequest,
            this.resetAuthTokenRequest
          );
        }
    
        return this.authTokenRequest;
      };
    
      resetAuthTokenRequest = () => {
        this.authTokenRequest = null;
      };
    
      setInterceptors = () => {
        customAxios.interceptors.request.use(
          async (config) => {
            const userToken = await this.getAccessToken();
            config.headers.Authorization = `Bearer ${userToken}`;
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );
    
        customAxios.interceptors.response.use(
          (response) => {
            return response;
          },
          async (error) => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
              return this.getAuthToken()
                .then((response) => {
                  this.setTokens(response);
                  error.config.__isRetryRequest = true;
                  return customAxios(originalRequest);
                })
                .catch((err) => {
                  this.setSession(null);
                  this.setTokens(null);
                  window.location.reload();
                });
            }
            throw error;
          }
        );
      };
    
      getInterceptor() {
        return customAxios;
      }
}

const instance = new jwtService();

export default instance;
