import moment from "moment";

export default function dateToString(date) {
    let format = date.split('-');
    format = `${format[2]}/${format[1]}/${format[0]}`

    return format;
}

export function stringToDate(date) {
    let format = date.split('/');
    format = `${format[2]}-${format[1]}-${format[0]}`

    return format;
}

export function maskCep(text){
    if(!text)
        return "";
    text=text.replace(/\D/g,"");                      //Remove tudo o que não é dígito
    text=text.replace(/^(\d{5})(\d)/,"$1-$2");       //Esse é tão fácil que não merece explicações
    return text;
}

export function stringToDateDataVenda(value){
    let data = moment(value);
    return data.isValid() ? data.format("DD/MM/YYYY HH:mm") : value;
}

export function maskCpf(text){
    if(!text)
        return "";
    text=text.replace(/\D/g,"");                      //Remove tudo o que não é dígito
    text=text.replace(/(\d{3})(\d)/,"$1.$2");         //Coloca um ponto entre o terceiro e o quarto dígitos
    text=text.replace(/(\d{3})(\d)/,"$1.$2");         //Coloca um ponto entre o terceiro e o quarto dígitos
                                                      //de novo (para o segundo bloco de números)
    text=text.replace(/(\d{3})(\d{1,2})$/,"$1-$2");   //Coloca um hífen entre o terceiro e o quarto dígitos
    return text;
}

export function maskCnpj(text){
    if(!text)
        return "";
    text=text.replace(/\D/g,"");                      //Remove tudo o que não é dígito
    text=text.replace(/(\d{2})(\d)/,"$1.$2");         //Coloca um ponto entre o terceiro e o quarto dígitos
    text=text.replace(/(\d{3})(\d)/,"$1.$2");         //Coloca um ponto entre o terceiro e o quarto dígitos
                                                      //de novo (para o segundo bloco de números)
    text=text.replace(/(\d{3})(\d)/,"$1/$2");         //Coloca um ponto entre o terceiro e o quarto dígitos
                                                      //de novo (para o segundo bloco de números)
    text=text.replace(/(\d{4})(\d{1,2})$/,"$1-$2");   //Coloca um hífen entre o terceiro e o quarto dígitos
    return text;
}

export function maskCpfCnpj(text){
    if(!text)
        return "";
    if(text.length <= 11)
        return maskCpf(text);
    return maskCnpj(text);
}

export function maskTelefone(text){
    if(!text)
        return "";

    if(text.length > 10)
        return maskCelular(text);

    text=text.replace(/\D/g,"");                      //Remove tudo o que não é dígito
    text=text.replace(/^(\d\d)(\d)/g,"($1) $2");      //Coloca parênteses em volta dos dois primeiros dígitos
    text=text.replace(/(\d{4})(\d)/,"$1-$2");         //Coloca hífen entre o quarto e o quinto dígitos
    return text;
}

export function maskCelular(text){
    if(!text)
        return "";
    text=text.replace(/\D/g,"");                      //Remove tudo o que não é dígito
    text=text.replace(/^(\d\d)(\d)/g,"($1) $2");      //Coloca parênteses em volta dos dois primeiros dígitos
    text=text.replace(/(\d{5})(\d)/,"$1-$2");         //Coloca hífen entre o quint e o sexto dígitos
    return text;
}

export function maskData(text){
    if(!text)
        return "";
    text=text.replace(/\D/g,"");
    text=text.replace(/(\d{2})(\d)/,"$1/$2");
    text=text.replace(/(\d{2})(\d)/,"$1/$2");

    text=text.replace(/(\d{2})(\d{2})$/,"$1$2");
    return text;
}

export function numberToCurrency(text) {
    let valor = text.replace(/\D/g,"");
    let decimals = valor.substr(-2);
    valor = valor.substr(0, valor.length-2);
    valor = valor.replace(/(\d{1,2}?)((\d{3})+)$/, "$1.$2");
    valor = valor.replace(/(\d{3})(?=\d)/g, "$1.");
    valor = valor.concat(valor ? "," : "0,", decimals);
    valor = valor.replace(/\./g,"").replace(",",".");
    return valor;
}

export function maskCurrency(text) {
    let valor = text.replace(/\D/g,"");
    let decimals = valor.substr(-2);
    valor = valor.substr(0, valor.length-2);
    valor = valor.replace(/(\d{1,2}?)((\d{3})+)$/, "$1.$2");
    valor = valor.replace(/(\d{3})(?=\d)/g, "$1.");
    valor = valor.concat(valor ? "," : "0,", decimals);
    return `R$ ${valor}`;
}

export function maskIntegerValue(text) {
    if(!text)
        return undefined;
    let valor = text.toString().replace(/\D/g,"");
    valor = valor.replace(/(\d{1,2}?)((\d{3})+)$/, "$1.$2");
    valor = valor.replace(/(\d{3})(?=\d)/g, "$1.");
    return valor;
}

export function onlyNumbers(text){
    if(!text)
        return undefined;
    return text.replace(/\D/g,"");
}

export function statusAcoesToDesc(status){
    if(status === "EM_ANDAMENTO") return "Em andamento";
    if(status === "AGUARDANDO") return "Aguardando";
    if(status === "CONCLUIDO") return "Concluído";
}

export function maskContaBanco(text) {
    if(!text)
        return undefined;
    if(text.length < 3)
        return text.replace(/\D/g,"");
    let valor = text.replace(/\D/g,"");
    let digito = valor.substr(-1);
    valor = valor.substr(0, valor.length-1);
    valor = valor.concat("-", digito);
    return valor;
}

export function maskContaIBolsa(text){
    if(!text)
        return undefined;
    return text.toString().padStart(7, '0');
}

export function maskVersao(text){
    if(!text)
        return undefined;
    return text.toFixed(1);
}

export function maskTipoContrato(tipo){
    if(tipo === "FLEX") return "Flex";
    if(tipo === "PRIME") return "Prime";
    if(tipo === "LYS_MONEY") return "Lys Money";
}

export function maskFormaPagamento(forma){
    if(forma === "AVISTA") return "À Vista";
    if(forma === "AINTEGRALIZAR") return "À Integralizar";
}


export function maskNumericValue(text, withSymbol){
    if(text === undefined || text === null)
        return;
    var value = (new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
    }).format((+text.toString()).toFixed(2)));
    return withSymbol || true ? value : value.replace('R$', '').trim();
}

export function round(num, places) {
	if (!("" + num).includes("e")) {
		return +(Math.round(num + "e+" + places)  + "e-" + places);
	} else {
		let arr = ("" + num).split("e");
		let sig = ""
		if (+arr[1] + places > 0) {
			sig = "+";
		}

		return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + places)) + "e-" + places);
	}
}