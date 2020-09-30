import jwtService from './jwtService.js';

export default class BaseResourceService {

    find = async(url) => {
        let response = await jwtService.getInterceptor().get(url);
        return response;
    }

    get = async(url) => {
        let response = await jwtService.getInterceptor().get(url);
        return response;
    }

    delete = async(url) => {
        let response = await jwtService.getInterceptor().delete(url);
        return response;
    }

    saveOrUpdate = async(url, data) => {
        let response;
        if(data.id)
            response = await jwtService.getInterceptor().put(url+`/${data.id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        else
            response = await jwtService.getInterceptor().post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        return response;
    }

    save = async(url, data) => {
        let response = await jwtService.getInterceptor().post(url, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response;
    }

    update = async(url, data) => {
        let response = await jwtService.getInterceptor().put(url, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response;
    }

    getAll = (endpoint, params) => {
        let url = this.addParamsToUrl(`/${endpoint}`, params);
        return new Promise((resolve, reject) => {
            this.get(url).then(response => {
                if ( response && response.data ) {
                    resolve(response.data);
                } else {
                    reject(response);
                }
            }).catch(error =>{
                reject(error.response);
            })
        });
    }

    salvarModelo = (endpoint, modelo) => {
        return new Promise((resolve, reject) => {
            this.saveOrUpdate(`/${endpoint}`, modelo).then(response => {
                if ( response && response.data ) {
                    resolve(response.data);
                } else {
                    reject(response.data.error);
                }
            })
            .catch(error =>{
                reject(error.response);
            })
        });
    }

    findModelo = (endpoint, codigo) => {
        return new Promise((resolve, reject) => {
            this.find(`/${endpoint}/${codigo}`).then(response => {
                if ( response && response.data ) {
                    resolve(response.data);
                } else {
                    reject(response.data.error);
                }
            })
            .catch(error =>{
                reject(error.response);
            })
        });
    }

    addParamsToUrl(url, params) {
        if (params != null) {
            params.forEach((param, index) => {
                if (index === 0)
                    url = url + '?'
                url = url + `${param['chave']}=${param['valor']}`
                if (index + 1 !== params.length)
                    url = url + '&'
            });
        }
        return url;
    }
}