import * as actionTypes from 'src/store/actions/Auth/auth.actions';
import jwtService  from 'src/App/services/jwtService.js';

const initialState = {
    usuarioAutenticado: false,
    usuario: '',
    empresaLogada: ''
};

const reducer = (state = initialState, action) => {
    if(jwtService.isUsuarioLogado()){
        state.usuario = jwtService.getUsuarioLogado();
        state.empresaLogada = jwtService.getUsuarioLogado().empresaLogada;
        state.usuarioAutenticado = jwtService.isUsuarioLogado() ? true : false;
    }

    switch (action.type) {
        
        case actionTypes.USUARIO_AUTENTICADO:
            return {
                ...state,
                usuarioAutenticado: action.payload
            };
        case actionTypes.SET_USER_DATA:
            {
                return {
                    ...state,
                    usuario: action.payload
                };
            }
        case actionTypes.SET_EMPRESA_LOGADA:
            {
                return {
                    ...state,
                    empresaLogada: action.payload
                };
            }
        default:
            return state;
    }
};

export default reducer;