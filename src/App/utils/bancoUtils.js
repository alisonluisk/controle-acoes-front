
import listaBancos from 'src/App/utils/lista_bancos.json'

export default function findBancoByCodigo(codigo){
    var index = listaBancos.findIndex(function (value) {
        return value.codigo === formatCodigoBanco(codigo);
    });
    return listaBancos[index];
}

function formatCodigoBanco(codigo){
    return codigo.toString().padStart(3, '0');
}