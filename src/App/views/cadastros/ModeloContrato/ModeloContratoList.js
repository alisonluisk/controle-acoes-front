import React from "react";
import CustomTable from "src/App/components/Tables/CustomTable.js";
import { maskVersao, maskTipoContrato, maskFormaPagamento } from "src/App/utils/formatterHelper";

const ModeloContratoList = (props) => {
  
  const columns = [
    {
      id: 'versao',
      label: 'Versão',
      width: '10%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
      mask: maskVersao
    },
    {
      id: 'nomeModelo',
      label: 'Nome',
      width: '35%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
    },
    {
      id: 'tipoContrato',
      label: 'Tipo Contrato',
      width: '20%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
      mask: maskTipoContrato
    },

    {
      id: 'formaPagamento',
      label: 'Forma Pagamento',
      width: '20%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
      mask: maskFormaPagamento
    },
    {
      id: 'acoes',
      label: 'Ações',
      width: '15%',
      sort: false,
      filter: false,
      disablePadding: false,
      align: 'left',
      isAction: true
    }
  ]

  return (
    <React.Fragment>
      <CustomTable
        columns={columns}
        {...props}
      />
    </React.Fragment>
  );
};

export default ModeloContratoList;