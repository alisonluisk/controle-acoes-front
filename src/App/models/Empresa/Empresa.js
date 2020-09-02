export default class Empresa {
    constructor(obj) {
        this.id = obj['id'];
        this.nomeFantasia = obj['nomeFantasia'];
        this.razaoSocial = obj['razaoSocial'];
        this.cnpj = obj['cnpj'];
        this.cep = obj['cep'];
        this.logradouro = obj['logradouro'];
        this.numero = obj['numero'];
        this.complemento = obj['complemento'];
        this.bairro = obj['bairro'];
        this.municipio = obj['municipio'];
        this.codigoMunicipio = obj['codigoMunicipio'];
        this.telefone = obj['telefone'];
        this.email = obj['email'];
        this.dataAbertura = obj['dataAbertura'];
        this.tipoEmpresa = obj['tipoEmpresa'] || "HOLDING";
        this.cotas_on = obj['cotas_on']
        this.cotas_pn = obj['cotas_pn']
        this.qtd_acoes = obj['qtd_acoes']
    }
}