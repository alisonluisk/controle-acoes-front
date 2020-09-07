import axios from 'axios';
// import jwtDecode from 'jwt-decode';

// const API_CONFIG = "http://3.131.110.79/v1";
const API_CONFIG = "http://localhost:8080/v1";
const PATH_USUARIOS = "/usuarios"

const USUARIO_LOGADO = "usuario";
const TOKEN_AUTH = 'token_auth';
const customAxios = axios.create({
    baseURL: API_CONFIG
});

class jwtService {

    init() {
        this.setInterceptors();
        // this.handleAuthentication();
    }

    signInWithUsernameAndPassword = (email, password) => {
        this.setSession(null);
        return new Promise((resolve, reject) => {
            axios.post(`${API_CONFIG}/login`, {
                email: email,
                password: password
              }).then(response => {
                if ( response.data && response.data.codigo )
                {
                    this.setSession(response);
                    resolve(response.data);
                }
                else
                {   
                    reject(response);
                }
            }).catch(err => {
                reject(err);
            });
        });
    };

    setSession = response => {
        if (response && response.data) {
            localStorage.setItem(USUARIO_LOGADO, JSON.stringify(response.data));
            localStorage.setItem(TOKEN_AUTH, JSON.stringify(response.headers.authorization));
            customAxios.defaults.headers.common['Authorization'] = response.headers.authorization;
        }
        else {
            localStorage.removeItem(USUARIO_LOGADO);
            localStorage.removeItem(TOKEN_AUTH);
            delete customAxios.defaults.headers.common['Authorization'];
        }
    };

    logout = () => {
        this.setSession(null);
    };

    setEmpresaLogada = (usuario, empresa) => {
        return new Promise((resolve, reject) => {
            customAxios.put(`${PATH_USUARIOS}/${usuario.codigo}/set_empresa_logada`, {
                idEmpresa: empresa.codigo
              }).then(response => {
                localStorage.setItem(USUARIO_LOGADO, JSON.stringify(response.data));
                resolve(response.data);
            }).catch(err => {
                console.log(err)
                reject(err);
            });
        });
    }

    getUsuarioLogado = () => {
        return JSON.parse(localStorage.getItem(USUARIO_LOGADO));
    };

    getTokenAuth = () => {
        return JSON.parse(localStorage.getItem(TOKEN_AUTH));
    };

    isUsuarioLogado = () => {
        let user = this.getUsuarioLogado();
        return (user);
    }

    setInterceptors = () => {
        customAxios.interceptors.request.use(async (config) => {
            const userToken = await this.getTokenAuth();
            config.headers.Authorization = userToken;
            return config;
          }, (error) => {
            return Promise.reject(error);
          });

        //   customAxios.interceptors.response.use(response => {
        //     return response;
        // }, err => {
        //     return new Promise((resolve, reject) => {
        //         console.log(err)
        //         if ( err.response.status === 403 && err.config && !err.config.__isRetryRequest )
        //         {
        //             this.setSession(null);
        //         }
        //         throw err;
        //     });
        // });
    };

    getInterceptor() {
        return customAxios;
    }
}

const instance = new jwtService();

export default instance;
