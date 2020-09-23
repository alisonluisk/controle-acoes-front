export default class Colaborador {
    constructor(obj) {
        this.id = obj['id'];
        this.cpf = obj['cpf'];
        this.nome = obj['nome'];
        this.email = obj['email'];
        this.rg = obj['rg'];
        this.dataNascimento = obj['dataNascimento'];
        this.telefoneFixo = obj['telefoneFixo'];
        this.telefoneCelular = obj['telefoneCelular'];
        this.estadoCivil = obj['estadoCivil'];
        this.cep = obj['cep'];
        this.codigoMunicipio = obj['codigoMunicipio'];
        this.numero = obj['numero'];
        this.logradouro = obj['logradouro'];
        this.bairro = obj['bairro'];
        this.municipio = obj['municipio'];
        this.complemento = obj['complemento'];
        this.ativo = obj['ativo'];
    }
}    