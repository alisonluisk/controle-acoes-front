import React from "react";
import CustomTable from "src/App/components/Tables/CustomTable.js";
import { maskCnpj } from "src/App/utils/formatterHelper";

const EmpresaList = (props) => {
  
  const columns = [
    {
      id: 'id',
      label: 'Código',
      width: '10%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
    },
    {
      id: 'razaoSocial',
      label: 'Razão Social',
      width: '25%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
    },
    {
      id: 'nomeFantasia',
      label: 'Nome Fantasia',
      width: '20%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
    },
    {
      id: 'cnpj',
      label: 'CNPJ',
      width: '15%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
      mask: maskCnpj
    },
    {
      id: 'municipio.descricao',
      label: 'Municipio',
      width: '15%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
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

export default EmpresaList;