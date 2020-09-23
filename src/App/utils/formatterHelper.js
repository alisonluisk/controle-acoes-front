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
    return text.replace(/\D/g,"");
}

export function statusAcoesToDesc(status){
    if(status === "EM_ANDAMENTO") return "Em andamento";
    if(status === "AGUARDANDO") return "Aguardando";
    if(status === "CONCLUIDO") return "Concluído";
}
