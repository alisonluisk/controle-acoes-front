import React from "react";
import CustomTable from "src/App/components/Tables/CustomTable.js";
import { maskCpfCnpj } from "src/App/utils/formatterHelper";

const AcionistaList = (props) => {
  
  const columns = [
    {
      id: 'cpfCnpj',
      label: 'CPF/CNPJ',
      width: '15%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
      mask: maskCpfCnpj
    },
    {
      id: 'conta',
      label: 'Conta',
      width: '10%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
    },
    {
      id: 'nome',
      label: 'Nome',
      width: '45%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
    },
    {
      id: 'telefoneFixo',
      label: 'Telefone',
      width: '10%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
    },

    {
      id: 'telefoneCelular',
      label: 'Celular',
      width: '10%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
    },
    {
      id: 'acoes',
      label: 'Ações',
      width: '10%',
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

export default AcionistaList;