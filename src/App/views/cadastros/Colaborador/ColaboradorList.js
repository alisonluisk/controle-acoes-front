import React from "react";
import CustomTable from "src/App/components/Tables/CustomTable.js";
import { maskCpf, maskTelefone } from "src/App/utils/formatterHelper";

const ColaboradorList = (props) => {
  
  const columns = [
    {
      id: 'cpf',
      label: 'CPF',
      width: '15%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
      mask: maskCpf
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
      width: '12%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
      mask: maskTelefone
    },

    {
      id: 'telefoneCelular',
      label: 'Celular',
      width: '12%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
      mask: maskTelefone
    },
    {
      id: 'acoes',
      label: 'Ações',
      width: '20%',
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

export default ColaboradorList;