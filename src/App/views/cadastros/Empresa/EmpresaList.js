import React from "react";
import CustomTable from "src/App/components/Tables/CustomTable.js";
import { maskCnpj } from "src/App/utils/formatterHelper";

const EmpresaList = (props) => {
  
  const columns = [
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
      id: 'razaoSocial',
      label: 'Razão Social',
      width: '45%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
    },
    {
      id: 'tipoEmpresa',
      label: 'Tipo',
      width: '15%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
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