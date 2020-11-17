export default class ContaInvestimento {
    constructor(obj) {
        this.acionista = obj["acionista"];
        this.codigoAcionista = obj["acionista"] ? obj["acionista"]["id"] : undefined;
        this.empresa = obj["empresa"];
        this.codigoEmpresa = obj["empresa"] ? obj["empresa"]["id"] : undefined;
        this.tipoContrato = obj["tipoContrato"] || "FLEX";
        this.formaPagamento = obj["formaPagamento"] || "AVISTA"
        this.qtdLotes = obj["qtdLotes"] || 1;
        this.qtdAcoes = obj["qtdAcoes"] || 5000;
        this.participacao = obj["participacao"] || 0.20;
        this.valorAcao = obj["valorAcao"] || 1.00;
        this.valorTotalAplicacao = obj["valorTotalAplicacao"] || 5000;
        this.qtdParcelas = obj["qtdParcelas"] || 0;
        this.valorAdesao = obj["valorAdesao"] || 0;
        this.acionistaInformado = obj ? false : false;
    }
}    