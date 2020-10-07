import * as actionTypes from 'src/store/actions/Auth/auth.actions';
import jwtService  from 'src/App/services/jwtService.js';

const initialState = {
    usuarioAutenticado: false,
    usuario: '',
    payload: undefined
};

const reducer = (state = initialState, action) => {
    if(jwtService.isUsuarioLogado()){
        state.usuario = jwtService.getUsuarioLogado();
        state.usuarioAutenticado = jwtService.isUsuarioLogado() ? true : false;
    }

    switch (action.type) {
        
        case actionTypes.USUARIO_AUTENTICADO:
            return {
                ...state,
                usuarioAutenticado: action.usuarioAutenticado,
                payload: action.payload
            };
        case actionTypes.SET_USER_DATA:
            {
                return {
                    ...state,
                    usuario: action.payload
                };
            }
        default:
            return state;
    }
};

export default reducer;