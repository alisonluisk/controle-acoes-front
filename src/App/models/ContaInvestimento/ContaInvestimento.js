export default class ContaInvestimento {
    constructor(obj) {
        this.id = obj["id"];
        this.conta = obj["conta"];
        this.acionista = obj["acionista"];
        this.codigoAcionista = obj["acionista"] ? obj["acionista"]["id"] : undefined;
        this.empresa = obj["empresa"];
        this.codigoEmpresa = obj["empresa"] ? obj["empresa"]["id"] : undefined;
        this.tipoContrato = obj["tipoContrato"] || "FLEX";
        this.integralizacao = obj["integralizacao"] || "AVISTA"
        this.qtdLotes = obj["qtdLotes"] || 1;
        this.qtdAcoes = obj["qtdAcoes"] || 5000;
        this.participacao = obj["participacao"] || 0.20;
        this.valorAcao = obj["valorAcao"] || 1.00;
        this.aporteTotal = obj["aporteTotal"] || 5000;
        this.parcelas = obj["parcelas"] || 0;
        this.valorAdesao = obj["valorAdesao"] || 0;
        this.aporteMensal = obj["aporteMensal"] || 0;
        this.valorParcelaAdesao = obj["valorParcelaAdesao"] || 0;
        this.parcelaAdesao = obj["parcelaAdesao"] || 0;
        this.acionistaInformado = obj["acionista"] ? true : false;
        this.observacoes = obj["observacoes"];
        this.possuiLinhaCredito = obj["possuiLinhaCredito"] || true;
    }
}    