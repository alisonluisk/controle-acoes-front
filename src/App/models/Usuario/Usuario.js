export default class Usuario {
    constructor(obj) {
        this.id = obj['id'];
        this.usuario = obj['usuario'];

        this.acionista = obj['acionista'];
        this.codigoAcionista = obj['codigoAcionista'];

        this.colaborador = obj['colaborador'];
        this.codigoColaborador = obj['codigoColaborador'];

        this.perfil = obj['perfil'];
        this.codigoPerfil = obj['codigoPerfil'];
        
        this.ativo = obj['ativo'];
    }
}    