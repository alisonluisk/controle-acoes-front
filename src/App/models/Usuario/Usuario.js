export default class Usuario {
    constructor(obj) {
        this.id = obj['id'];
        this.usuario = obj['usuario'];
        this.acionista = obj['acionista'];
        this.colaborador = obj['colaborador'];
        this.senhaConfigurada = obj['senhaConfigurada'];

        this.perfil = obj['perfilUsuario'];
        this.codigoPerfilUsuario = obj['perfilUsuario'] ? obj['perfilUsuario']['id'] : undefined;
        
        this.ativo = obj['ativo'];

        this.senha;
        this.confirmSenha;
        this.senhaAtual;
    }
}    