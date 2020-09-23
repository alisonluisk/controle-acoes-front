export default class Acionista {
    constructor(obj) {
        this.id = obj['id'];
        this.conta = obj['conta'];
        this.cpfCnpj = obj['cpfCnpj'];
        this.nome = obj['nome'];
        this.email = obj['email'];
        this.dataNascimento = obj['dataNascimento'];
        this.rgInscricao = obj['rgInscricao'];
        this.estadoCivil = obj['estadoCivil'];
        this.telefoneFixo = obj['telefoneFixo'];
        this.telefoneCelular = obj['telefoneCelular'];

        this.cep = obj['cep'];
        this.codigoMunicipio = obj['codigoMunicipio'];
        this.numero = obj['numero'];
        this.logradouro = obj['logradouro'];
        this.bairro = obj['bairro'];
        this.municipio = obj['municipio'];
        this.complemento = obj['complemento'];
        this.ativo = obj['ativo'];

        this.representante = obj['representante'];
        this.cpfRepresentante = obj['cpfRepresentante'];
        this.banco = obj['banco'];
        this.agencia = obj['agencia'];
        this.numeroConta = obj['numeroConta'];
        this.cpfContaBanco = obj['cpfContaBanco'];
        this.nomeContaBanco = obj['nomeContaBanco'];
    }
}    