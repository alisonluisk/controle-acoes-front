import jwtService from '../../../App/services/jwtService.js'

export const USUARIO_AUTENTICADO = '[USUARIO] USUARIO_AUTENTICADO';
export const SET_USER_DATA = '[USUARIO] SET DATA';
export const SET_EMPRESA_LOGADA = '[USUARIO] SET EMPRESA LOGADA';

export function login(email, password) {
    return function(dispatch) {
        return jwtService.signInWithUsernameAndPassword(email, password)
            .then((user) => {
                    dispatch(setUserData(user));
                    return dispatch({
                        type   : USUARIO_AUTENTICADO,
                        payload: true
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type   : USUARIO_AUTENTICADO,
                    payload: false
                });
            });
        }
}

export function logout(){
    jwtService.logout();
    return function(dispatch) {
        dispatch(setUserData(null));
        return dispatch({
            type   : USUARIO_AUTENTICADO,
            payload: false
        });
    }
}

export function setUserData(user)
{
    return (dispatch) => {
        dispatch({
            type   : SET_USER_DATA,
            payload: user
        })
    }
}

export function setEmpresaLogada(usuario, empresa) {
    return function(dispatch) {
        return jwtService.setEmpresaLogada(usuario, empresa)
            .then((user) => {
                    dispatch(setUserData(user));
                    return  dispatch({
                        type: SET_EMPRESA_LOGADA,
                        payload: empresa
                    })
                }
            )
            .catch(error => {
                return dispatch({
                    type   : SET_EMPRESA_LOGADA,
                    payload: null
                });
            });
        }
}