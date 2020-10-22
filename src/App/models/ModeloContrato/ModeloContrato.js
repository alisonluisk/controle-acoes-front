export default class ModeloContrato {
    constructor(obj) {
        this.id = obj['id'];
        this.versao = obj['versao'];
        this.nomeModelo = obj['nomeModelo'];
        this.modelo = obj['modelo'];
        this.ativo = obj['ativo'];
        this.tipoContrato = obj['tipoContrato'] || "FLEX";
        this.formaPagamento = obj['formaPagamento'] || "AVISTA";
    }
}