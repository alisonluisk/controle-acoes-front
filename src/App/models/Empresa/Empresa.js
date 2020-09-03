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
        this.cotasOn = obj['cotasOn']
        this.cotasPn = obj['cotasPn']
        this.qtdAcoes = obj['qtdAcoes']
        this.matriz = obj['matriz']
        this.codigoMatriz = obj['codigoMatriz']
        this.ativo = obj['ativo']
    }
}